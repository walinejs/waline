const CSV = {};
!(function (p) {
  'use strict';
  p.__type__ = 'csv';
  const o =
    ('undefined' != typeof jQuery && jQuery.Deferred) ||
    ('undefined' != typeof _ && _.Deferred) ||
    function () {
      var t,
        n,
        e = new Promise(function (e, r) {
          ((t = e), (n = r));
        });
      return {
        resolve: t,
        reject: n,
        promise: function () {
          return e;
        },
      };
    };
  ((p.fetch = function fetch(t) {
    const n = new o();
    if (t.file) {
      const e = new FileReader(),
        r = t.encoding || 'UTF-8';
      ((e.onload = function onload(e) {
        const r = p.extractFields(p.parse(e.target.result, t), t);
        ((r.useMemoryStore = !0), (r.metadata = { filename: t.file.name }), n.resolve(r));
      }),
        (e.onerror = function onerror(e) {
          n.reject({
            error: {
              message: 'Failed to load file. Code: ' + e.target.error.code,
            },
          });
        }),
        e.readAsText(t.file, r));
    } else if (t.data) {
      const i = p.extractFields(p.parse(t.data, t), t);
      ((i.useMemoryStore = !0), n.resolve(i));
    } else if (t.url) {
      (
        window.fetch ||
        function fetch(e) {
          const r = jQuery.get(e),
            t = {
              then: function (e) {
                return (r.done(e), t);
              },
              catch: function (e) {
                return (r.fail(e), t);
              },
            };
          return t;
        }
      )(t.url)
        .then(function fetch(e) {
          return e.text ? e.text() : e;
        })
        .then(function fetch(e) {
          const r = p.extractFields(p.parse(e, t), t);
          ((r.useMemoryStore = !0), n.resolve(r));
        })
        .catch(function fetch(err, r) {
          n.reject({
            error: {
              message: 'Failed to load file. ' + err.statusText + '. Code: ' + err.status,
              request: err,
            },
          });
        });
    }
    return n.promise();
  }),
    (p.extractFields = function extractFields(e, r) {
      return !0 !== r.noHeaderRow && e.length > 0
        ? { fields: e[0], records: e.slice(1) }
        : { records: e };
    }),
    (p.normalizeDialectOptions = function normalizeDialectOptions(e) {
      const r = {
        delimiter: ',',
        doublequote: !0,
        lineterminator: '\n',
        quotechar: '"',
        skipinitialspace: !0,
        skipinitialrows: 0,
      };
      for (let t in e) t === 'trim' ? (r.skipinitialspace = e.trim) : (r[t.toLowerCase()] = e[t]);
      return r;
    }),
    (p.parse = function parse(e, r) {
      (r && (!r || r.lineterminator)) || (e = p.normalizeLineTerminator(e, r));
      let t,
        n,
        i = p.normalizeDialectOptions(r);
      ((t = e),
        (n = i.lineterminator),
        (e = t.charAt(t.length - n.length) !== n ? t : t.substring(0, t.length - n.length)));
      let o,
        a,
        l = '',
        s = !1,
        u = !1,
        c = '',
        f = [],
        d = [];
      for (
        a = function (e) {
          return (
            !0 !== u &&
              (e === '' ? (e = null) : !0 === i.skipinitialspace && (e = v(e)),
              h.test(e) ? (e = Number.parseInt(e, 10)) : m.test(e) && (e = Number.parseFloat(e))),
            e
          );
        },
          o = 0;
        o < e.length;
        o += 1
      ) {
        ((l = e.charAt(o)),
          !1 !== s || (l !== i.delimiter && l !== i.lineterminator)
            ? l !== i.quotechar
              ? (c += l)
              : s
                ? e.charAt(o + 1) === i.quotechar
                  ? ((c += i.quotechar), (o += 1))
                  : (s = !1)
                : (u = s = !0)
            : ((c = a(c)),
              f.push(c),
              l === i.lineterminator && (d.push(f), (f = [])),
              (c = ''),
              (u = !1)));
      }
      return (
        (c = a(c)), f.push(c), d.push(f), i.skipinitialrows && (d = d.slice(i.skipinitialrows)), d
      );
    }),
    (p.normalizeLineTerminator = function normalizeLineTerminator(e, r) {
      return (r = r || {}).lineterminator ? e : e.replaceAll(/(\r\n|\n|\r)/gm, '\n');
    }),
    (p.objectToArray = function objectToArray(e) {
      for (var r = [], t = [], n = [], i = 0; i < e.fields.length; i++) {
        const o = e.fields[i].id;
        n.push(o);
        const a = e.fields[i].label ? e.fields[i].label : o;
        t.push(a);
      }
      r.push(t);
      for (i = 0; i < e.records.length; i++) {
        for (var l = [], s = e.records[i], u = 0; u < n.length; u++) l.push(s[n[u]]);
        r.push(l);
      }
      return r;
    }),
    (p.serialize = function serialize(e, r) {
      let t = null;
      t = Array.isArray(e) ? e : p.objectToArray(e);
      let n,
        i,
        o,
        a = p.normalizeDialectOptions(r),
        l = '',
        s = '',
        u = '',
        c = '';
      for (
        o = function (e) {
          return (
            e === null
              ? (e = '')
              : typeof e == 'string' && f.test(e)
                ? (a.doublequote && (e = e.replaceAll(/"/g, '""')),
                  (e = a.quotechar + e + a.quotechar))
                : typeof e == 'number' && (e = e.toString(10)),
            e
          );
        },
          n = 0;
        n < t.length;
        n += 1
      ) {
        for (l = t[n], i = 0; i < l.length; i += 1)
          ((s = o(l[i])),
            i === l.length - 1
              ? ((c += (u += s) + a.lineterminator), (u = ''))
              : (u += s + a.delimiter),
            (s = ''));
      }
      return c;
    }));
  const h = /^\d+$/,
    m = /^\d*\.\d+$|^\d+\.\d*$/,
    f = /^\s|\s$|,|"|\n/,
    v = String.prototype.trim
      ? function (e) {
          return e.trim();
        }
      : function (e) {
          return e.replace(/^\s*/, '').replace(/\s*$/, '');
        };
})(CSV);

export default CSV;
