import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Header from '../../components/Header.jsx';
import download from '../../utils/download.js';
import readFileAsync from '../../utils/readFileAsync.js';
import request from '../../utils/request.js';

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
    try {
      const text = await readFileAsync(e.target.files[0]);
      const data = JSON.parse(text);

      if (!data || data.type !== 'waline') {
        return alert('import data format not support!');
      }

      const maxLength = data.tables.reduce(
        (count, tableName) => count + (data.data[tableName]?.length || 0),
        0,
      );
      let importedLength = 0;

      setImportLoading([
        'importing {{importedLength}}/{{maxLength}}',
        { importedLength, maxLength },
      ]);

      const idMaps = {};

      for (const tableName of data.tables) {
        const tableData = data.data[tableName];

        // clean table data if not user table
        if (tableName !== 'Users') {
          await request({
            url: 'db?table=' + tableName,
            method: 'DELETE',
          });
        }

        if (!idMaps[tableName]) {
          idMaps[tableName] = {};
        }
        if (!Array.isArray(tableData)) {
          continue;
        }

        for (const data of tableData) {
          let existUserObjectId = false;

          if (tableName === 'Users') {
            const user = await request('user?email=' + data.email);

            if (user.objectId) {
              existUserObjectId = user.objectId;
            }
          }

          const shouldEditorUser = tableName == 'Users' && existUserObjectId;
          const method = shouldEditorUser ? 'PUT' : 'POST';
          const body =
            tableName === 'Comment'
              ? Object.assign({}, data, {
                  rid: undefined,
                  pid: undefined,
                  user_id: undefined,
                })
              : data;

          for (const key in body) {
            if (body[key] === null || body[key] === undefined) {
              // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
              delete body[key];
            }
          }

          const resp = await request({
            url: `db?table=${tableName}${
              method === 'PUT' ? `&objectId=${existUserObjectId}` : ''
            }`,
            method,
            body,
          });

          idMaps[tableName][data.objectId] = resp.objectId;
          importedLength += 1;
          setImportLoading([
            'importing {{importedLength}}/{{maxLength}}',
            { importedLength, maxLength },
          ]);
        }
      }

      setImportLoading(['comment data index relationship reconstruction']);
      const commentData = data.data.Comment;
      const willUpdateData = [];

      for (const cmt of commentData) {
        const willUpdateItem = {};

        [
          { tableName: 'Comment', field: 'pid' },
          { tableName: 'Comment', field: 'rid' },
          { tableName: 'Users', field: 'user_id' },
        ].forEach(({ tableName, field }) => {
          if (!cmt[field]) {
            return;
          }
          const oldId = cmt[field];
          const newId = idMaps[tableName][cmt[field]];

          if (oldId && newId && oldId !== newId) {
            willUpdateItem[field] = newId;
          }
        });
        if (!Object.keys(willUpdateItem).length) {
          continue;
        }

        willUpdateData.push([
          willUpdateItem,
          { objectId: idMaps.Comment[cmt.objectId] },
        ]);
      }

      importedLength = 0;
      for (const [willUpdateItem, where] of willUpdateData) {
        await request({
          url: `db?table=Comment&objectId=${where.objectId}`,
          method: 'PUT',
          body: willUpdateItem,
        });

        importedLength += 1;
        setImportLoading([
          'index updating {{importedLength}}/{{maxLength}}',
          { importedLength, maxLength: willUpdateData.length },
        ]);
      }

      alert(t('import success'));
      location.reload();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      alert(err.message);
      throw err;
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
        'application/javascript',
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
                {Array.isArray(importLoading)
                  ? t(...importLoading)
                  : t('import')}
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
