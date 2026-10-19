import React, { useEffect, useState } from 'react';

import Header from '../../components/Header.jsx';
import request from '../../utils/request.js';

export default function Upgrade() {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState('');
  const [running, setRunning] = useState(false);
  useEffect(() => {
    request('upgrade')
      .then(setStatus)
      .catch((err) => setError(err.message));
  }, []);
  const run = async () => {
    setRunning(true);
    setError('');
    try {
      const result = await request({ url: 'upgrade', method: 'POST', body: {} });
      localStorage.setItem('WALINE_SITE_ID', result.siteId);
      location.href = './';
    } catch (err) {
      setError(err.message);
      setRunning(false);
    }
  };
  return (
    <>
      <Header />
      <main className="container">
        <h1>Database upgrade</h1>
        <p>
          This upgrade creates the default site, assigns all existing comments and counters to it,
          and promotes existing administrators to super administrators. It is safe to retry after a
          failure.
        </p>
        {status ? <pre>{JSON.stringify(status, null, 2)}</pre> : null}
        {error ? <p className="error">{error}</p> : null}
        <button type="button" disabled={running || status?.required === false} onClick={run}>
          {running ? 'Upgrading…' : status?.required === false ? 'Upgrade complete' : 'Run upgrade'}
        </button>
      </main>
    </>
  );
}
