# command
Set-ExecutionPolicy RemoteSigned -Scope Process

npm install -g @angular/cli
ng new angular_sample
npm start

nvm install 22.12.0
nvm use 22.12.0
nvm list

npm uninstall -g @angular/cli

npm install -g @angular/cli@18.2.14

ng new angular_sample_18

ng generate component views/pages/page1
ng generate component views/pages/page2
ng generate component views/layout/layout
ng generate component views/common/header/header
ng generate component views/common/footer/footer

ng generate service common/services/http

ng generate enum common/defines/enum/enum
ng generate enum common/defines/messages/message1
ng generate enum common/defines/images/image1

ng generate guard common/guard/auth

ng generate interface common/interfaces/interface

ng generate environments



# AngularSample18

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.5.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

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
