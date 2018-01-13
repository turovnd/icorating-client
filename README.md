# icorating-client
Запуск скрипта на сервере Ubuntu

## Необходимо установить следующие программы
- Node.js и NPM
```
sudo apt-get update
sudo apt-get install nodejs npm
```
- PM2 - для создания демон-процесса выполнения скрипта
```
npm install -g pm2
```

## Подготовка к запуску скрипта
- Перейдите в папку с файлами
- Задайте свою настройку скрипта: 
  - перейдите в папку `config`, создайте дубликат файла `environment.ts.sample`, переименуйте его в `environment.ts`, зайдите в него и пропишите настройки. ICO_API_URL - url сайта, по которому размещен скрипт API, ICO_API_PORT - порт, на котором располагается API. Пример файла `environment.ts`:
    ```
    export const environment = {
        ICO_API_URL: 'http://your-site.com',
        ICO_API_PORT: 80
    };
    ```
  - перейдите в папку `server`, создайте дубликат файла `.env.sample`, переименуйте его в `.env`, зайдите в него и пропишите настройки. SITE - url сайта, по которому размещен скрипт API, PORT - порт, на котором располагается API. Пример файла `.env`:
    ```
    #NODE_ENV=development
    NODE_ENV=production

    SITE=http://your-site.com
    PORT=80
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
