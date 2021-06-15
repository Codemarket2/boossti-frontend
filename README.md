# drreamz Frontend Monorepo

# Next.js + React Native

Install Dependencies:

```sh
$ yarn install (if yarn didn't work try npm install)
```

Install Pod Dependencies (Only on Mac OS):

```sh
$ yarn pod:install (if yarn didn't work try npm install pod-install)
```

# Next.js Web

Run Web Next.js:

```sh
$ yarn web
```

# Storybook

To run stories of your storybook open a new termianl and run:

```sh
$ yarn web:storybook
```

# Run Test Cases

To run Cypress test cases for web react components(headless - tests will run in terminal without opening the browser)

```sh
$ yarn web:test
![alt text](https://github.com/Codemarket2/drreamz-frontend2/blob/vivekt/images/cypress_headless.jpg?raw=true)
```

To run Cypress test cases for web react components(head - tests will run in browser)

```sh
$ yarn web:test:head
```

Build Web:

```sh
$ yarn web:build
```

Deploy Web:

```sh
$ yarn web:deploy
```

# React Native

Start metro server:

```sh
$ yarn mobile
```

Run android:

```sh
$ yarn android
```

Run ios:

```sh
$ yarn ios
```

# Android Build

Clean the build folders:

```sh
$ yarn android:clean
```

Create build:

```sh
$ yarn android:build
```

# iOS Build

Open project in xcode:

```sh
$ yarn xcode
```
