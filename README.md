# Innowise Components Library

A modern React components library inspired by Material-UI, built with TypeScript and designed for flexibility and ease of use.

## Features

- 🚀 **Modern React Components**: Button, TextField, Checkbox, Select
- 📝 **TypeScript Support**: Full type safety and IntelliSense support
- 🎨 **CSS Modules**: Scoped styling with CSS modules
- 📚 **Storybook**: Interactive component documentation and playground
- 🧪 **Testing**: Comprehensive test coverage with Jest and React Testing Library
- 🎯 **ESLint & Prettier**: Code quality and consistent formatting
- 📦 **Webpack**: Optimized build process
- 🔧 **Husky**: Git hooks for code quality

## Installation

> **Note**: This package is not yet published to npm. To use this library, you'll need to build it locally or publish it to npm first.

For local development, clone the repository and build the library:

```bash
git clone <repository-url>
cd innowise-components-lib
npm install
npm run build
```

Once published to npm, you can install it with:

```bash
npm install innowise-components-lib
```

### Publishing to npm

To publish this library to npm:

1. **Build the library**:

```bash
npm run build
```

2. **Login to npm** (if not already logged in):

```bash
npm login
```

3. **Publish the package**:

```bash
npm publish
```

> **Important**: Make sure to update the version number in `package.json` before publishing updates using `npm version patch|minor|major`.

## Quick Start

```jsx
import React from 'react';
import { Button, TextField, Checkbox, Select } from 'innowise-components-lib';

function App() {
  return (
    <div>
      <Button variant="primary" onClick={() => console.log('Clicked!')}>
        Click Me
      </Button>

      <TextField label="Email" type="email" placeholder="Enter your email" />

      <Checkbox label="Subscribe to newsletter" checked={true} />

      <Select
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
        ]}
        placeholder="Choose an option"
      />
    </div>
  );
}

export default App;
```

## Available Components

### Button

Customizable button component with multiple variants and sizes.

```jsx
import { Button } from 'innowise-components-lib';

<Button variant="primary" size="medium">
  Primary Button
</Button>;
```

### TextField

Input field component with label, error states, and validation support.

```jsx
import { TextField } from 'innowise-components-lib';

<TextField
  label="Username"
  placeholder="Enter username"
  error="This field is required"
/>;
```

### Checkbox

Checkbox component with support for indeterminate state.

```jsx
import { Checkbox } from 'innowise-components-lib';

<Checkbox
  label="Accept terms and conditions"
  checked={isChecked}
  onChange={setIsChecked}
/>;
```

### Select

Dropdown select component with search and multi-select capabilities.

```jsx
import { Select } from 'innowise-components-lib';

<Select
  options={options}
  value={selectedValue}
  onChange={setSelectedValue}
  placeholder="Select an option"
/>;
```

## Development

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd innowise-components-lib
```

2. Install dependencies:

```bash
npm install
```

### Available Scripts

- **`npm run dev`** - Start development mode with file watching
- **`npm run build`** - Build the library for production
- **`npm run build:dev`** - Build the library in development mode
- **`npm test`** - Run tests
- **`npm run test:watch`** - Run tests in watch mode
- **`npm run test:coverage`** - Run tests with coverage report
- **`npm run lint`** - Lint TypeScript files
- **`npm run lint:fix`** - Fix linting issues automatically
- **`npm run storybook`** - Start Storybook development server
- **`npm run build-storybook`** - Build Storybook for production

### Development Workflow

1. **Start Storybook** for component development:

```bash
npm run storybook
```

This will open Storybook at `http://localhost:6006` where you can develop and test components interactively.

2. **Run tests** to ensure everything works:

```bash
npm test
```

3. **Build the library** when ready:

```bash
npm run build
```

### Project Structure

```
src/
├── components/           # Component source files
│   ├── Button/          # Button component
│   ├── Checkbox/        # Checkbox component
│   ├── Select/          # Select component
│   └── TextField/       # TextField component
├── stories/             # Storybook configuration and assets
├── styles/              # Global styles
└── types/               # TypeScript type definitions

tests/                   # Test setup and utilities
```

### Testing

The project uses Jest and React Testing Library for testing. Tests are located alongside component files with the `.test.tsx` extension (currentle WIP).

Run tests:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Linting and Formatting

The project uses ESLint for linting and Prettier for code formatting:

```bash
# Check for linting issues
npm run lint

# Fix linting issues automatically
npm run lint:fix
```

Pre-commit hooks are set up with Husky to ensure code quality.

## Storybook

Storybook is used for component development and documentation. Each component has its own story file (`.stories.tsx`) that demonstrates different use cases and variants.

```bash
# Start Storybook development server
npm run storybook

# Build Storybook for deployment
npm run build-storybook
```

## Publishing & Release

### Before Publishing

Before publishing to npm, make sure to:

1. **Update version number** in `package.json`:

```bash
# For bug fixes
npm version patch

# For new features
npm version minor

# For breaking changes
npm version major
```

2. **Build and test** the library:

```bash
npm run build
npm test
npm run lint
```

3. **Test the build** by checking the `dist` folder contents

### Publishing Process

1. **Ensure you're logged in to npm**:

```bash
npm whoami
# If not logged in, run: npm login
```

2. **Publish to npm**:

```bash
npm publish
```

### Updating Published Package

When updating an already published package:

1. Make your changes
2. Update version number: `npm version patch|minor|major`
3. Build and test: `npm run build && npm test`
4. Publish: `npm publish`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Write tests for your changes
5. Run tests and linting (`npm test && npm run lint`)
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Development Guidelines

- Write tests for all new components and features
- Follow the existing code style and patterns
- Update Storybook stories for new components
- Ensure all components are properly typed with TypeScript
- Use CSS modules for component styling
- Follow semantic versioning for releases

## Browser Support

This library supports all modern browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
