---
title: Развёртывание на Railway
icon: railway
---

[Railway](https://railway.app/) — бесплатная бессерверная платформа, на которой Waline можно развернуть без особых усилий.

<!-- more -->

## Как развернуть

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/UZB84v?referralCode=lizheming)

Нажмите эту кнопку — произойдёт переход на платформу railway.app для быстрого развёртывания. После входа можно ввести имя нового репозитория GitHub или оставить значение по умолчанию, затем нажмите кнопку <kbd>Deploy</kbd> внизу, чтобы начать развёртывание. Обратите внимание, что часть с переменными окружения изменять не следует.

![railway1](../../../assets/railway-1.jpg)

Через некоторое время вы попадёте на страницу панели управления. Нажмите <kbd>PostgreSQL</kbd> - <kbd>Query</kbd>, вставьте содержимое файла [waline.pgsql](https://github.com/walinejs/waline/blob/main/assets/waline.pgsql) в текстовое поле и нажмите кнопку <kbd>Run Query</kbd> внизу, чтобы инициализировать базу данных.

![railway2](../../../assets/railway-2.jpg)

Наконец, нажмите <kbd>Deployments</kbd> - <kbd>Domains</kbd>, чтобы получить URL сервера. Скопируйте адрес сайта и укажите его в конфигурации `serverURL` клиента. После этого можно пользоваться Waline!

![railway3](../../../assets/railway-3.jpg)

## Как обновить

Перейдите в соответствующий репозиторий GitHub и измените номер версии `@waline/vercel` в файле package.json на последнюю версию.

## Как изменить переменные окружения

Нажмите вкладку <kbd>Variables</kbd>, чтобы перейти на страницу управления переменными окружения. После изменения переменной развёртывание произойдёт автоматически.

![railway4](../../../assets/railway-4.jpg)
