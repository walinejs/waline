import React, { useState } from 'react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../../components/Header';
import download from '../../utils/download';
import request from '../../utils/request';

export default function () {
  const [importLoading, setImportLoading] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);

  const { t } = useTranslation();
  const uploadRef = useRef(null);

  const importDB = () => {
    if (!confirm(t('import clear data confirm'))) {
      return;
    }
    uploadRef.current.click();
  };

  const importData = async (e) => {
    setImportLoading(true);
    try {
      const body = new FormData();
      body.append('file', e.target.files[0]);

      await request({
        url: 'db',
        method: 'POST',
        body,
      });

      alert(t('import success'));
      location.reload();
    } catch (e) {
      alert(e.message);
      throw e;
    } finally {
      setImportLoading(false);
      e.target.value = null;
    }
  };

  const exportDB = async () => {
    setExportLoading(true);
    try {
      const data = await request('db');
      download(
        JSON.stringify(data, null, '\t'),
        'waline.json',
        'application/javascript'
      );
    } finally {
      setExportLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="main">
        <div className="body container">
          <div className="typecho-page-title">
            <h2>{t('migration')}</h2>
          </div>
          <div className="row typecho-page-main">
            <div className="col-mb-12 col-tb-6" style={{ textAlign: 'center' }}>
              <button
                className="btn"
                style={{ height: 80, fontSize: 30, padding: '0 40px' }}
                onClick={exportDB}
                disabled={exportLoading}
              >
                {exportLoading ? t('exporting') : t('export')}
              </button>
            </div>
            <div className="col-mb-12 col-tb-6" style={{ textAlign: 'center' }}>
              <button
                className="btn error"
                style={{ height: 80, fontSize: 30, padding: '0 40px' }}
                onClick={importDB}
                disabled={importLoading}
              >
                {importLoading ? t('importing') : t('import')}
              </button>
              <input
                ref={uploadRef}
                onChange={importData}
                type="file"
                style={{ display: 'none' }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
