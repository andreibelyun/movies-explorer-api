# movies-explorer-api 🎬

## Описание

Репозиторий для бэкенда дипломной работы - API для аутентификации пользователей и сохранения фильмов

## Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки 

Остальные директории вспомогательные

## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload

## Функциональность
 
`GET /users/me` - возвращает информацию о пользователе (email и имя)

`PATCH /users/me` - обновляет информацию о пользователе (email и имя)
 
`GET /movies` - возвращает все сохранённые текущим  пользователем фильмы

`POST /movies` - создаёт фильм с переданными в теле: country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId

`DELETE /movies/_id` - удаляет сохранённый фильм по id

`POST /signup` - создаёт пользователя с переданными в теле: email, password и name

`POST /signin` - проверяет переданные в теле почту и пароль и возвращает JWT

## Адрес сервера

Доменное имя: api.saveme.nomoredomains.xyz

* http://api.saveme.nomoredomains.xyz
* https://api.saveme.nomoredomains.xyz

Публичный IP-адрес сервера: 51.250.72.182
