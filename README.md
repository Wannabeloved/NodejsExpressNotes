# Notes App

Simple notes web application who was founded on [my nodejs cli notes app](https://github.com/Wannabeloved/NodejsCLINotes).
Nodejs HTTP (Express) server & ejs + bootstrap front
Простое веб-приложение для создания и управления заметками с аутентификацией пользователей.

## Требования

- Docker
- Docker Compose

## Установка и запуск

1. Клонируйте репозиторий:

```bash
git clone <your-repo-url>
cd <repo-folder>
```

2. Запустите приложение с помощью Docker Compose:

```bash
docker compose up -d
```

После запуска:

- Веб-приложение будет доступно по адресу: http://localhost:3000
- MongoDB будет доступна по адресу: mongodb://localhost:27017

## Подключение к MongoDB через Compass

Если вы хотите подключиться к базе данных через MongoDB Compass, используйте следующую строку подключения:

```
mongodb://root:example@localhost:27017/notes?authSource=admin
```

Учетные данные по умолчанию:

- Пользователь: root
- Пароль: example
- База данных: notes
- Auth Database: admin

## Функциональность

- Регистрация и авторизация пользователей
- Создание, просмотр, редактирование и удаление заметок
- Каждый пользователь видит только свои заметки
- Защищенные маршруты с помощью JWT-токенов

## Разработка

Если вы хотите внести изменения в код:

1. Остановите контейнеры:

```bash
docker compose down
```

2. Внесите необходимые изменения

3. Пересоберите и запустите контейнеры:

```bash
docker compose up -d --build
```

## Важные замечания

1. В продакшене рекомендуется изменить:

   - Пароль для MongoDB (в compose.yaml)
   - JWT_SECRET в constants.js
   - Использовать безопасное хранение секретов

2. Данные MongoDB сохраняются в Docker volume, поэтому они сохранятся даже после перезапуска контейнеров
