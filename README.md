# Blog Application
This is a full-stack MERN web application that showcases the functionality of a blogging platform. Users can create their own blog posts, explore posts from other users, engage with them by liking and commenting, and manage their profile information.
</br>
The application incorporates various technologies. Redux Toolkit is utilized to store authenticated user data and their access token. Firebase Storage is used for storing user-uploaded images, such as profile avatars and post images. Requests to the API are handled using React Query, while React Hook Form manages form submissions. For seamless navigation, React Router is employed. Material UI is responsible for styling the application.
</br>
To ensure secure authentication, this project implements a system with two tokens. Users are assigned an access token and a refresh token. The access token serves as a means of authentication, granting the user access to the application. Meanwhile, the refresh token is used to renew an expired access token.
</br>

## Table of Contents
- [Features](#features)
- [Demonstration](#demonstration)
- [Technologies](#technologies)
- [Setup](#setup)
- [Contact](#contact)
- [Sources](#sources)

## Features
- Authentication (login, register, logout)
    - Authentication system with access token to access the application and refresh token to renew the access token
- Create and edit blog posts
    - Preview the blog post before publishing
    - Upload image to the blog post
- View the blog posts published by other users
    - Pagination for blog posts
- Like and comment on blog posts
- View the user profile
    - Update the user profile information
    - Upload profile avatar
- Responsive design for mobile devices
- Progressive Web App (PWA) support

## Demonstration
### [View the website](https://the-blog-app-zp54.onrender.com)

### Home page
### Editor page
### Profile page

## Technologies
* ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
* ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
* ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
* ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
* ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
* ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
* ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
* ![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase&logoColor=white)
* ![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
* ![React Hook Form](https://img.shields.io/badge/React_Hook_Form-0088CC?style=for-the-badge&logo=react-hook-form&logoColor=white)
* ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
* ![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)

## Setup
Follow the instructions below to run the application locally.

### Installation
Clone the repository:
```bash
$ git clone https://github.com/ke444a/blog-app-mern.git
```
Install the dependencies:
```bash
# Install the dependencies for the root directory, frontend, and backend
$ cd blog-app-mern/
$ npm run postinstall
```
Create a new application using Firebase and update the Firebase configuration in `backend/src/config/firebase.js` with the provided details specific to your project
```javascript
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "...",
    projectId: "...",
    storageBucket: "...",
    messagingSenderId: "...",
    appId: "..."
};
```

Seed the database:
```bash
# Seed the database with dummy data
$ npm run seed
```

Run the application:
```bash
# Run the frontend and backend concurrently
$ cd blog-app-mern/
$ npm run dev
```

### Environment Variables
Create a `.env` file in the root directory of the project 
```bash
$ touch .env
```
Add the following environment variables:
```bash
# PORT to run backend on
PORT=5000
# URI to your MongoDB database
MONGODB_URI=YOUR_MONGODB_URI
# Secret keys to sign tokens (random strings)
ACCESS_TOKEN_SECRET=SECRET_KEY_TO_SIGN_ACCESS_TOKENS
REFRESH_TOKEN_SECRET=SECRET_KEY_TO_SIGN_REFRESH_TOKENS
# Firebase configuration
FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
```

## Contact
- LinkedIn: [Danyl Kecha](https://www.linkedin.com/in/danylkecha/)
- Mail: danyl.kecha.uk@gmail.com
- GitHub: [ke444a](https://github.com/ke444a)
- Twitter: [@ke444a](https://twitter.com/ke444a)