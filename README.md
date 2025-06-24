# Cross-Platform Client with Tamagui

A cross-platform React Native application built with Expo and Tamagui UI library.

## Development

### Prerequisites

- Node.js 18+
- Yarn 4.5.0+

### Getting Started

1. Install dependencies:

   ```bash
   yarn install
   ```

2. Start the development server:

   ```bash
   yarn start
   ```

3. Run on specific platforms:
   ```bash
   yarn web      # Web development server
   yarn ios      # iOS simulator
   yarn android  # Android emulator
   ```

### Building for Web

To build the web version for production:

```bash
yarn build:web
```

### Deployment

The web version is automatically deployed to GitHub Pages when changes are pushed to the `main` branch. The deployment workflow:

1. Runs code quality checks
2. Builds the web application using Expo
3. Deploys to GitHub Pages

You can also manually trigger the deployment from the GitHub Actions tab.

### Code Quality

Run code quality checks locally:

```bash
yarn biome:dev  # Check and fix issues
yarn biome:ci   # Check only (CI mode)
```
