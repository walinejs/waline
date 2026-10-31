import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Header from '../../components/Header.jsx';
import {
  createSite,
  deleteSite,
  getSites,
  grantSiteAdmin,
  revokeSiteAdmin,
  setDefaultSite,
  updateSite,
} from '../../services/site.js';
import { getUserList } from '../../services/user.js';

export default function Sites() {
  const user = useSelector((state) => state.user);
  const [sites, setSites] = useState([]);
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const load = () =>
    getSites()
      .then(setSites)
      .catch((err) => setError(err.message));
  useEffect(load, []);
  useEffect(() => {
    if (user.type === 'administrator')
      getUserList({ page: 1 }).then((result) => setUsers(result.data ?? []));
  }, [user.type]);
  const create = async (event) => {
    event.preventDefault();
    await createSite({ name: event.target.name.value, url: event.target.url.value, config: {} });
    event.target.reset();
    load();
  };
  const save = async (site, event) => {
    event.preventDefault();
    await updateSite(site.objectId, {
      name: event.target.name.value,
      url: event.target.url.value,
      status: event.target.status.value,
      config: event.target.config.value,
    });
    load();
  };
  return (
    <>
      <Header />
      <main className="container">
        <h1>Sites</h1>
        {error ? <p className="error">{error}</p> : null}
        {user.type === 'administrator' ? (
          <form onSubmit={create}>
            <h2>Create site</h2>
            <input name="name" required placeholder="Site name" />
            <input name="url" type="url" required placeholder="https://example.com" />
            <button type="submit">Create</button>
          </form>
        ) : null}
        {sites.map((site) => (
          <section key={site.objectId}>
            <form onSubmit={(event) => save(site, event)}>
              <h2>
                {site.name}
                {site.default ? ' (default)' : ''}
              </h2>
              <p>
                <code>{site.objectId}</code>
              </p>
              <input name="name" defaultValue={site.name} required />
              <input name="url" defaultValue={site.url} required />
              <select name="status" defaultValue={site.status}>
                <option value="active">Active</option>
                <option value="disabled">Disabled</option>
              </select>
              <textarea
                name="config"
                defaultValue={
                  typeof site.config === 'string'
                    ? site.config
                    : JSON.stringify(site.config ?? {}, null, 2)
                }
                rows="10"
              />
              <button type="submit">Save</button>
              {user.type === 'administrator' && !site.default ? (
                <button
                  type="button"
                  onClick={async () => {
                    await setDefaultSite(site.objectId);
                    load();
                  }}
                >
                  Make default
                </button>
              ) : null}
              {user.type === 'administrator' && !site.default ? (
                <button
                  type="button"
                  onClick={async () => {
                    if (!confirm('Delete this empty site? Sites with data can only be disabled.')) {
                      return;
                    }
                    await deleteSite(site.objectId);
                    load();
                  }}
                >
                  Delete empty site
                </button>
              ) : null}
            </form>
            {user.type === 'administrator' ? (
              <div>
                <h3>Administrators</h3>
                {users
                  .filter((item) => item.type !== 'administrator')
                  .map((item) => {
                    const granted = site.adminIds?.includes(item.objectId);
                    return (
                      <label key={item.objectId}>
                        <input
                          type="checkbox"
                          checked={granted}
                          onChange={async () => {
                            if (granted) await revokeSiteAdmin(site.objectId, item.objectId);
                            else await grantSiteAdmin(site.objectId, item.objectId);
                            load();
                          }}
                        />
                        {item.display_name || item.email}
                      </label>
                    );
                  })}
              </div>
            ) : null}
          </section>
        ))}
      </main>
    </>
  );
}
