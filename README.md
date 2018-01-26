# icorating-client
Запуск скрипта на сервере Ubuntu

## Необходимые программы
- Перейдите в корневую папку на сервере и установите выполните следующие команды:
```
apt-get update
apt-get install nodejs-legacy npm git
npm install -g pm2 npm n
n stable
```

## Подготовка к запуску скрипта
- Перейдите в папку с файлами
- Задайте свою настройку скрипта: 
  - перейдите в папку `config`, создайте дубликат файла `environment.ts.sample`, переименуйте его в `environment.ts`, зайдите в него и пропишите настройки. ICO_API_PORT - порт, на котором располагается API. Пример файла `environment.ts`:
    ```
    export const environment = {
        ICO_API_URL: 'http://your-site.com',
        ICO_API_PORT: 3000
    };
    ```
  - перейдите в папку `server`, создайте дубликат файла `.env.sample`, переименуйте его в `.env`, зайдите в него и пропишите настройки. PORT - порт, по которому будет доступна админ панель. Пример файла `.env`:
    ```
    #NODE_ENV=development
    NODE_ENV=production

    SITE=http://your-site.com
    PORT=3001
    ```
- Перейдите в папку `server` и создайте папку `public`.

## Запуск скрипта
- Перейдите в папку корневую папку с файлами скрипта и выполните следующие команды:
```
npm install
npm run build
```
- Перейдите в папку `server` выполните следующие команды:
```
npm install
npm run build
```
