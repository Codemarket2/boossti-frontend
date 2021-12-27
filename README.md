# Vijaa Frontend Monorepo

# Next.js + React Native

## You have to only use Yarn don't use npm

Install Dependencies:

```sh
$ yarn install 
```

If you want to install package from npm:

```sh
$ yarn workspace @frontend/web add <package name>
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
```

![cypress headless](https://github.com/Codemarket2/drreamz-frontend2/blob/vivekt/images/cypress_headless.jpg?raw=true)

To run Cypress test cases for web react components(head - tests will run in browser)

```sh
$ yarn web:test:head
```

![cypress web](https://github.com/Codemarket2/drreamz-frontend2/blob/vivekt/images/cypress_web.jpg?raw=true)
Build Web:

If you only want to run a single test then you can use this command

```sh
$ yarn workspace @frontend/web run cypress run-ct --spec ./src/components/<path-to-your-test-file>
```

```sh
$ yarn web:build
```

Deploy Web:

```sh
$ yarn web:deploy
```

# React Native

Install Pod Dependencies (Only on Mac OS):

```sh
$ yarn pod:install (if yarn didn't work try npm install pod-install)
```

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
