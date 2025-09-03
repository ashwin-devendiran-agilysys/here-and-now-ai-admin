# Participant Admin Dashboard

A comprehensive Angular web application for managing participants (trainees) with full CRUD operations, search/sort/pagination, and analytics dashboard with charts.

## Features

### Core Functionality
- **Participants Management**: Complete CRUD operations for participant data
- **Advanced Table**: Search, sort, and pagination capabilities
- **Interactive Dashboard**: KPI cards and charts showing skill analytics
- **Responsive Design**: Mobile-first approach using Angular Material

### Technical Features
- **API Integration**: RESTful API consumption with authentication
- **Form Validation**: Comprehensive form validation with error handling
- **Real-time Analytics**: Charts showing skill distributions and averages
- **Material Design**: Professional UI using Angular Material components

## Prerequisites

- **Node.js**: Version 18 or higher
- **Angular CLI**: Version 17 or higher
- **npm**: Version 8 or higher

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd here-and-now-ai-admin
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure API settings:**
   
   Edit `src/environments/environment.ts` and `src/environments/environment.prod.ts`:
   ```typescript
   export const environment = {
     production: false, // true for production
     apiBaseUrl: 'https://api.hereandnowai.com/public/api',
     apiKeyHeaderName: 'X-API-KEY',
     apiKeyValue: 'your-api-key-here' // Replace with your actual API key
   };
   ```

4. **Start the development server:**
   ```bash
   ng serve
   ```

5. **Open your browser:**
   Navigate to `http://localhost:4200`

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
