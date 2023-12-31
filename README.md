[![Docker Deployment](https://github.com/openthisworld/micro_service_deploy/actions/workflows/deploy.yml/badge.svg)](https://github.com/openthisworld/micro_service_deploy/actions/workflows/deploy.yml)


Файловая иерархия и пояснения:


my-todo-manager/
├── backend/
│   ├── package.json
│   ├── package-lock.json
│   ├── index.js
│   ├── db.js
│   └── Dockerfile
├── frontend/
│   ├── package.json
│   ├── package-lock.json
│   ├── public/
│   │   ├── index.html
│   │   └── ...
│   └── src/
│       ├── App.js
│       ├── index.js
│       └── ...
├── kubernetes/
│   ├── backend-deployment.yaml
│   ├── backend-service.yaml
│   ├── frontend-deployment.yaml
│   ├── frontend-service.yaml
│   ├── postgres-deployment.yaml
│   └── postgres-service.yaml
└── postgres/
    ├── Dockerfile
    └── init.sql


backend/package.json:
    В этом файле мы определяем зависимости, необходимые для Backend. Мы будем использовать Express.js для создания REST API, cors для обработки запросов из разных источников и pg для работы с PostgreSQL.

backend/package-lock.json:
    Это файл, который создается автоматически после установки зависимостей с помощью npm. Он содержит информацию о точных версиях зависимостей.

backend/index.js:
    В этом файле мы настраиваем Express.js сервер, подключаемся к базе данных и определяем обработчики запросов. Здесь приведен пример обработчика для получения списка задач из базы данных.

backend/db.js:
    В этом файле мы создаем подключение к базе данных PostgreSQL и экспортируем функцию query, которая будет использоваться в наших обработчиках для выполнения запросов к базе данных.

backend/Dockerfile:
    В Dockerfile для Backend мы определяем базовый образ (в данном случае, Node.js 14), устанавливаем зависимости, копируем файлы и запускаем сервер на порту 5000.




frontend/package.json:
    В этом файле определяются зависимости для Frontend. Мы будем использовать React.js для создания пользовательского интерфейса.

frontend/package-lock.json:
    Этот файл также создается автоматически после установки зависимостей.

frontend/public/index.html:
    В этом файле определяется HTML разметка для нашего приложения. Здесь вы можете включить тег script для загрузки собранного бандла JavaScript.

frontend/src/App.js:
    В этом файле определен компонент React, который получает список задач с помощью REST API и отображает их на странице.

frontend/src/index.js:
    В этом файле мы рендерим наше приложение React в корневой элемент index.html.


    Описание работы для 

Этап сборки:

    Мы используем официальный образ Node.js для сборки клиентской части приложения.
    Копируем package.json и package-lock.json в рабочую директорию.
    Устанавливаем зависимости.
    Копируем исходный код приложения.
    Запускаем сборку приложения с помощью npm run build. Это создаст оптимизированный бандл, готовый для развертывания.


Этап запуска:

    Мы используем образ nginx для запуска статического контента клиентской части приложения.
    Копируем бандл, созданный на этапе сборки, в директорию nginx, которая отвечает за отдачу статического контента.
    Запускаем сервер nginx для обслуживания контента на порту 80.
    Теперь после добавления Dockerfile для Frontend, у вас будет возможность упаковать и развернуть полное микросервисное приложение в Kubernetes, используя Docker контейнеры для каждой части (Frontend, Backend и PostgreSQL).


    Замените your-dockerhub-username, your-db-user, your-db-password и your-db-name на свои значения в каждом из этих файлов.

