# GalaxyArts

## Описание
Мой проект - это веб-приложение для работы с данными о галактиках. Позволяет добавлять, просматривать, обновлять и удалять информацию о галактиках.

## Установка
1. Убедитесь, что у вас установлены Node.js и MongoDB.
2. Склонируйте репозиторий: `git clone https://github.com/username/project.git`
3. Перейдите в директорию проекта: `cd project`
4. Установите зависимости: `npm install`
5. Запустите сервер: `yarn start`

## Использование
- GET `/galaxies` - Получить список всех галактик
- POST `/galaxies/add` - Добавить новую галактику (Требуется JSON с полями: `name`, `description`, `distance`, `photo`)
- PUT `/galaxies/update/:id` - Обновить галактику по ID (Требуется JSON с полями для обновления)
- DELETE `/galaxies/delete/:id` - Удалить галактику по ID

## Технологии
- Node.js
- Express.js
- MongoDB
- Mongoose

## Автор
Имя Автора - tkyskii2004@gmail.com
#Имя Автора - tulegenov.berik@narxoz.kz

## Лицензия
Этот проект лицензируется под MIT License - смотрите [LICENSE.md](LICENSE.md) для подробностей.
## Получение списка галактик
### Request
- Method: GET
- URL: /galaxies
### Response
- Type: JSON Array
- Fields: name (String), description (String), distance (Number), photo (String)

## Добавление новой галактики
### Request
- Method: POST
- URL: /galaxies/add
- Body: JSON { name (String, required), description (String), distance (Number, required), photo (String) }
### Response
- Type: JSON Object
- Fields: message (String)

## Обновление информации о галактике
### Request
- Method: PUT
- URL: /galaxies/update/:id
- Params: id (String, required)
- Body: JSON { name (String), description (String), distance (Number), photo (String) }
### Response
- Type: JSON Object
- Fields: message (String)

## Удаление галактики
### Request
- Method: DELETE
- URL: /galaxies/delete/:id
- Params: id (String, required)
### Response
- Type: JSON Object
- Fields: message (String)
