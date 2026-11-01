---
title: Создание базы данных на TiDB
icon: tidb
---

[TiDB](https://github.com/pingcap/tidb) — база данных NewSQL с открытым исходным кодом. [TiDB Cloud](https://tidbcloud.com/) — её официальная онлайн-версия, предоставляющая всем 5 ГБ бесплатного хранилища. Ниже описано, как создать базу данных Waline в TiDB Cloud.

## Создание базы данных

1. После входа в [TiDB Cloud](https://tidbcloud.com) экземпляр TiDB создаётся автоматически: просто нажмите <kbd>cluster0</kbd>, чтобы войти в экземпляр

   ![Enter instance](../../../assets/tidb-1.png)

2. Выберите <kbd>SQL Editor</kbd> в списке слева и разбейте содержимое [waline.tidb](https://github.com/walinejs/waline/blob/main/assets/waline.tidb) на отдельные инструкции по `;` — они выполняются в интерфейсе по очереди. Для каждой инструкции нажимайте синюю кнопку <kbd>Run</kbd> в правом верхнем углу или используйте сочетание клавиш <kbd>Ctrl\/Command</kbd> + <kbd>Enter</kbd>
   ![Step1](../../../assets/tidb-2.png)
   ![Step2](../../../assets/tidb-3.png)
   ![Step3](../../../assets/tidb-4.png)
   ![Step4](../../../assets/tidb-5.png)
   ![Step5](../../../assets/tidb-6.png)

На этом база данных Waline создана!

## Получение параметров подключения

Нажмите кнопку <kbd>Overview</kbd> слева, чтобы перейти на главную страницу, и выберите <kbd>Connect</kbd> в правом верхнем углу, чтобы получить информацию о подключении.

Установите для «Connect with» значение `General`. Также нажмите <kbd>Reset password</kbd> в строке ниже, чтобы сгенерировать новый пароль.

Так вы получите все параметры, связанные с подключением.

![Connection](../../../assets/tidb-7.png)

## Развёртывание на Vercel

Создайте учётную запись Vercel, добавьте проект и разверните сервис Waline. Затем откройте <kbd>Settings</kbd> проекта и перейдите в `Environment Variables`. Нажмите <kbd>Add Environment Variable</kbd> и добавьте следующие переменные: `TIDB_HOST`, `TIDB_PORT`, `TIDB_DB`, `TIDB_USER` и `TIDB_PASSWORD`. После добавления этих переменных разверните проект заново.

![Configure TiDB connection](../../../assets/tidb-8.png)
