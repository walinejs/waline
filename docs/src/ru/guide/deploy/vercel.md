---
title: Развёртывание на Vercel
icon: vercel
order: 1
---

Мы выпустили пакет `@waline/vercel` в качестве серверного пакета; развёртывание на Vercel — наш наиболее рекомендуемый способ.

<!-- more -->

## Как развернуть

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fwalinejs%2Fwaline%2Ftree%2Fmain%2Fexample)

1. Нажмите синюю кнопку выше — произойдёт переход на Vercel для развёртывания по шаблону Waline.

   ::: note

   Если вы ещё не вошли в систему, рекомендуем войти через GitHub.

   :::

1. Введите название проекта Vercel и нажмите `Create`.

   ![Create Project](../../../assets/vercel-1.png)

1. Vercel автоматически создаст и инициализирует репозиторий с введённым вами именем на основе шаблона Waline.

   ![new project](../../../assets/vercel-2.png)

   Через минуту-две Vercel завершит развёртывание. Нажмите кнопку `Go to Dashboard`, чтобы перейти в панель управления приложением.

   ![dashboard](../../../assets/vercel-3.png)

## Создание базы данных

1. Нажмите `Storage` в верхней части, чтобы перейти на страницу сервисов хранилища, и выберите `Create Database`. В разделе `Marketplace Database Providers` выберите `Neon` и нажмите `Continue`.

   ![storage](../../../assets/vercel-5.png)

1. Вам будет предложено создать учётную запись Neon. Выберите `Accept and Create`. Затем выберите конфигурацию тарифа базы данных, включая регион и квоту. Можно оставить значения по умолчанию и нажать `Continue`.

   ![neon](../../../assets/vercel-6.png)

1. Задайте имя базы данных. Можно оставить значение по умолчанию и нажать `Continue`.

   ![neon](../../../assets/vercel-7.png)

1. Теперь база данных отображается в разделе `Storage`. Нажмите на неё и выберите `Open in Neon`, чтобы перейти в Neon. В Neon выберите `SQL Editor` слева, вставьте SQL из [waline.pgsql](https://github.com/walinejs/waline/blob/main/assets/waline.pgsql) в редактор и нажмите `Run`, чтобы создать таблицы.

   ![neon](../../../assets/vercel-10.png)

   ![neon](../../../assets/vercel-11.png)

1. Через некоторое время появится сообщение об успехе. Вернитесь в Vercel, нажмите `Deployments`, а затем нажмите `Redeploy` у последнего развёртывания, чтобы новая конфигурация базы данных вступила в силу.

   ![redeploy success](../../../assets/vercel-12.png)

1. Vercel перейдёт на страницу `Overview` и начнёт развёртывание. Когда `STATUS` станет `Ready`, нажмите `Visit`, чтобы открыть развёрнутый сайт. Этот URL — адрес вашего сервера.

   ![visit](../../../assets/vercel-14.png)

## Привязка домена

1. Нажмите <kbd>Settings</kbd> - <kbd>Domains</kbd>, чтобы перейти на страницу настроек домена.

1. Введите домен, который хотите привязать, и нажмите кнопку <kbd>Add</kbd>.

   ![Add domain](../../../assets/vercel-16.png)

1. Добавьте новую запись `CNAME` на сервере доменных имён.

   | Тип   | Имя     | Значение             |
   | ----- | ------- | -------------------- |
   | CNAME | example | cname.vercel-dns.com |

1. После вступления изменений в силу вы сможете открывать Waline по собственному домену. :tada:
   - Система комментариев: example.your-domain.com
   - Панель администратора: example.your-domain.com/ui

   ![success](../../../assets/vercel-17.png)

## Импорт через HTML

Настройте страницу следующим образом:

1. Импортируйте стили Waline из `https://unpkg.com/@waline/client@v3/dist/waline.css`.
2. Создайте тег `<script>`, который использует `init()` из `https://unpkg.com/@waline/client@v3/dist/waline.js`, и передайте обязательные параметры `el` и `serverURL`.
   - `el` — элемент, в котором отображается Waline. Это может быть строка CSS-селектора или HTMLElement.
   - `serverURL` — адрес вашего сервера, полученный на предыдущем шаге.

```html {3-7,12-18}:line-numbers
<head>
  <!-- ... -->
  <link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline.css" />
  <!-- ... -->
</head>
<body>
  <!-- ... -->
  <div id="waline"></div>
  <script type="module">
    import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

    init({
      el: '#waline',
      serverURL: 'https://your-domain.vercel.app',
    });
  </script>
</body>
```

## Управление комментариями

1. После развёртывания перейдите по адресу `<serverURL>/ui/register` и зарегистрируйтесь. Первый зарегистрированный пользователь становится администратором.
2. После входа администратор может управлять комментариями: редактировать, помечать или удалять их.
3. Пользователи также могут зарегистрироваться через форму комментариев. После входа они будут перенаправлены на страницу своего профиля.
