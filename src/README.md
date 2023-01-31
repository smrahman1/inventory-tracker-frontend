# Service Template Frontend
This is the source folder for Service Template Frontend. In this folder, we have the following:

## 1.	[Assets Folder](./assets/)
The assets folder contains all assets for what the app needs at runtime. Examples include images, fonts, and sounds.

## 2.   [Components Folder](./components/)
The components folder contains all TypeScript React components used in the app, typically these are `.tsx` files. All reusable components should stay here. Also, only _functional_ React components should be created, not `class` components.

## 3.	[Helpers Folder](./helpers/)
The helper folder contains any helper functions the app requires, typically these are `.ts` files. Currently, we have [ToastHelpers.ts](./helpers/ToastHelpers.ts) to manage error/success toast responses.

## 4.	[Services Folder](./services/)
The services folder contains all services used by the frontend app, typically these are `.ts` files. Currently, there are two services, one service for login/logout and another for user registration.

## 5.	[Views Folder](./views/)
The views folder contains all different views/pages for the app. It is best to create a new folder for each new view you create, to house a `.tsx` file and a `.css` file if needed.

## 6.	[index.tsx](./index.tsx)
The base TypeScript React file for the application, all app `<Route/>`s should stay here.

## Additional Notes
We did not use any styling libraries for our pages and views. All styling is done through CSS. In the future, a styling library can be used to avoid the usage of CSS.

In the future, look into using [Semantic UI](https://semantic-ui.com/) for starters.