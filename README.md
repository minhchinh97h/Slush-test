# Simple to-do application built with Angular 9, Firebase and PWA service.

This project was built to show the learning curves and creativities in building an Angular app.

## Installed packages

- Angular 9
- Bootstrap 3.4.1
- Firebase 7.8.2
- Angular service worker (pwa) 9

More can be found at `package.json`

## Installing instruction

Clone the repository and then run the following `npm` command:

`
npm install
`

All packages and dependencies should be installed by `npm`.

## Running in development

To start the app, simple navigate to its directory address, then type the command:

`
ng serve
`

or

`
ng serve --port {number}
`

## Running with Firebase static host

The project has been deployed to Firebase static host, click https://slush-test-2020.firebaseapp.com/display-all to observe.

## Features
- A simple to-do app with CRUD operations to handle to-dos/tasks.
- Using Firebase to authenticate users (simple sign up and log in functions available).
- When logged in, users can save their to-dos/tasks by clicking the "Save Data" button in the app's header to syncing with Firestore.
- The application can be used in offline mode by using service workers provied by @angular/pwa package.
- In offline mode, users can still perform CRUD operations with tasks, but cannot syncing with Firestore or any Internet-required activities. When the app comes online, any performed Internet-required activities will be performed with the Firebase-deployed version as soon as possible. However, in development, performed Internet-required activities will be ignored or be thrown with a connect-issue error.

## Known issues
- There is a warning in console which refers to multiple SDK imports of `firebase` package. This warning can be neglected at the moment since the app's size is small and multiple SDK imports will not affect the app's performance greatly.
- When logged in and then logged out, all to-dos/tasks will be erased for simplicities.
- There is an exposed Firebase's API key in the repo. This is for the testing convenience only. It is a bad practice to keep confidentials revealed publicly.
