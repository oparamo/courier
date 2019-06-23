# Courier
A web app for exploring and managing Azure Service Bus.

## Docker
To build and run Courier with Docker, simply run the following commands in the project directory:

```
docker build -t courier .
docker run -p 8080:80 courier
```

Open [http://localhost:8080](http://localhost:8080) to view your Courier instance running in a Docker container.

## Available Scripts

In the project directory, you can run:

### `yarn start` or `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test` or `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build` or `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Create React App

This project was bootstrapped with [Create React App](https://facebook.github.io/create-react-app/).
