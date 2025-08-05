# Pre-commit Hooks Configuration

Этот проект настроен с комплексной системой pre-commit хуков для обеспечения качества кода.

## Установленные хуки

### Pre-commit

Выполняется перед каждым коммитом:

- ✅ Форматирование кода с помощью Prettier
- ✅ Линтинг с помощью ESLint с автоисправлением
- ✅ Запуск связанных тестов для измененных файлов
- ✅ Запуск всех тестов для проверки целостности

### Pre-push

Выполняется перед отправкой в удаленный репозиторий:

- ✅ Запуск всех тестов с покрытием
- ✅ Проверка сборки проекта
- ✅ Генерация отчета о покрытии

### Commit-msg

Проверяет формат сообщения коммита:

- ✅ Соответствие стандарту Conventional Commits
- ✅ Валидация типа и описания

## Компоненты с тестами

| Компонент | Количество тестов | Покрытие      |
| --------- | ----------------- | ------------- |
| Button    | 45 тестов         | ✅ Все пропсы |
| Checkbox  | 69 тестов         | ✅ Все пропсы |
| Modal     | 55 тестов         | ✅ Все пропсы |
| Select    | 76 тестов         | ✅ Все пропсы |
| Switch    | 29 тестов         | ✅ Все пропсы |
| TextField | 91 тестов         | ✅ Все пропсы |

**Всего: 365 тестов**

## Команды для тестирования

```bash
# Запуск всех тестов
npm test

# Запуск тестов в режиме наблюдения
npm run test:watch

# Запуск тестов с покрытием
npm run test:coverage

# Запуск тестов для CI/CD
npm run test:ci

# Запуск связанных тестов для конкретных файлов
npm run test:related src/components/Button/Button.tsx

# Запуск конкретного компонента
npm test -- Button.test.tsx
```

## Настройка качества кода

### Пороги покрытия кода

```javascript
coverageThreshold: {
  global: {
    branches: 80,
    functions: 80,
    lines: 80,
    statements: 80
  }
}
```

### Форматы коммитов

```
feat(component): add new functionality
fix(component): resolve specific issue
docs(readme): update installation guide
style(button): improve CSS formatting
refactor(select): optimize performance
test(modal): add comprehensive tests
chore(deps): update dependencies
```

## CI/CD Integration

### GitHub Actions

- ✅ Автоматический запуск тестов на push/PR
- ✅ Тестирование на множественных версиях Node.js (18.x, 20.x)
- ✅ Проверка сборки проекта и Storybook
- ✅ Аудит безопасности зависимостей
- ✅ Загрузка отчетов о покрытии в Codecov

### Workflow статусы

- `test`: Запуск всех тестов и линтинга
- `build`: Сборка проекта и артефактов
- `component-tests`: Индивидуальное тестирование компонентов
- `security`: Аудит безопасности

## Обход хуков (только для экстренных случаев)

```bash
# Обход pre-commit хука
git commit --no-verify -m "emergency fix"

# Обход pre-push хука
git push --no-verify
```

## Устранение неполадок

### Проблемы с правами доступа (Linux/macOS)

```bash
chmod +x .husky/pre-commit
chmod +x .husky/pre-push
chmod +x .husky/commit-msg
```

### Переустановка хуков

```bash
npm run prepare
```

### Очистка кэша тестов

```bash
npx jest --clearCache
```

## Статистика проекта

- **Всего компонентов**: 6
- **Всего тестов**: 365
- **Время выполнения тестов**: ~5-6 секунд
- **Покрытие кода**: 80%+ (настраиваемо)
- **Поддерживаемые версии Node.js**: 18.x, 20.x

## Рекомендации

1. **Пишите тесты для новых компонентов** - следуйте паттернам существующих тестов
2. **Покрывайте все пропсы** - каждый проп должен иметь минимум один тест
3. **Используйте описательные имена тестов** - `should render with primary variant` вместо `test variant`
4. **Группируйте тесты логически** - используйте `describe` блоки для организации
5. **Тестируйте edge cases** - null values, empty strings, large numbers
6. **Следуйте соглашениям о коммитах** - это помогает в автоматической генерации changelog

---

_Этот файл автоматически обновляется при изменении конфигурации тестов._
