Проект представляет собой реализацию аналога Trello

## Функциональность

- Создание, редактирование и удаление задач
- Распределение задач по категориям (Bug, Feature, Documentation, Refactor, Test)
- Управление статусом задач (To Do, In Progress, Done)
- Установка приоритетов (Low, Medium, High)
- Маршрутизация между страницами
- Сохранение данных локально
- Современный UI с Mantine компонентами

## Архитектура

Проект построен по методологии Feature-Sliced Design (FSD):
- `app/` - настройка приложения, провайдеры, роутинг
- `pages/` - страницы приложения
- `widgets/` - композитные UI блоки
- `features/` - бизнес-функциональность
- `entities/` - бизнес-сущности
- `shared/` - переиспользуемые ресурсы

## Используемые технологии

- TypeScript
- Vite
- React 19
- React Router v6
- Redux Toolkit, RTK Query
- Mantine UI Framework
- Framer Motion
- Tabler Icons
- ESLint & Prettier
- PostCSS с Autoprefixer
- CSS Modules
- Vitest для тестирования

## Запуск проекта

1.  `npm install`
2.  `npm run dev` или `npm start`

ДЕПЛОЙ НА gh pages: https://rnegic.github.io/trello/