# @waline/client

![npm](https://img.shields.io/npm/v/@waline/vercel?color=blue&logo=npm&style=flat-square)

This is the frontend module for Waline comment system.

## How to Use

```html
<head>
  ..
  <script src="//cdn.jsdelivr.net/npm/@waline/client/dist/Waline.min.js"></script>
  ...
</head>
<body>
  ...
  <div id="waline"></div>
  <script>
    new Waline({
      el: '#waline',
      path: location.pathname,
      serverURL: 'https://your-domain.vercel.app',
    });
  </script>
</body>
```

## Configuration

<https://waline.js.org/configuration.html>
