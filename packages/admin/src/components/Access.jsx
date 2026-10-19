import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function Access(props) {
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const meta = props.meta ?? {};
    const basename = props.basename ?? '';
    const emptyUser = !user?.objectId;
    const currentPath = location.pathname.replace(basename, '') || '/';
    const redirectPath = currentPath.startsWith('/') ? currentPath : `/${currentPath}`;

    if (emptyUser) {
      location.href = `${basename}/ui/login?redirect=${redirectPath}`;
      return;
    }

    const noPermission = meta.auth
      ? meta.auth === 'administrator'
        ? !['administrator', 'super_admin'].includes(user.type)
        : meta.auth !== user.type
      : false;

    if (noPermission) {
      location.href = `${basename}/ui/profile`;
    }

    if (!currentPath.startsWith('/ui/upgrade')) {
      const token =
        window.TOKEN ?? sessionStorage.getItem('TOKEN') ?? localStorage.getItem('TOKEN');
      fetch(`${window.serverURL}upgrade?lang=en`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
        .then((resp) => resp.json())
        .then(({ data }) => {
          if (data?.required) location.href = `${basename}/ui/upgrade`;
        })
        .catch(() => {});
    }
  }, [user, props.meta, props.basename]);

  return user ? props.children : null;
}
