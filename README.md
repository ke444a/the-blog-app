# Blog Application

This is a full-stack web application built with React, Node.js, Express, and PostgreSQL that showcases the functionality of a blogging platform. Users can create their own blog posts, explore posts from other users, engage with them by liking and commenting, and manage their profile information.
</br>
The application incorporates various technologies. Redux Toolkit is utilized to store the data of an authenticated user. Cloudinary is used for storing user-uploaded images, such as profile avatars and post images. Requests to the API are handled using React Query, while React Hook Form manages form submissions. For seamless navigation, React Router is employed. Material UI is responsible for styling the application.
</br>

## Table of Contents

-   [Features](#features)
-   [Demonstration](#demonstration)
-   [Technologies](#technologies)
-   [Setup](#setup)
-   [Contact](#contact)

## Features

-   Authentication (login, register, logout)
    -   Authentication system with access tokens sent via cookies.
-   Create and edit blog posts
    -   Preview the blog post before publishing
    -   Upload image to the blog post
-   View the blog posts published by other users
    -   Pagination for blog posts
-   Like and comment on blog posts
-   View the user profile
    -   Update the user profile information
    -   Upload profile avatar
-   Optimistic updates using React Query for enhanced user experience
-   Responsive design for mobile devices
-   Progressive Web App (PWA) support

## Demonstration
### [View the website](https://the-blog-app-zp54.onrender.com)
https://github.com/ke444a/blog-app-mern/assets/81090139/e625485f-cd81-4e23-aef0-7f3a3a50f248

### Home page
<img width="60%" height="50%" src="https://github.com/ke444a/blog-app-mern/assets/81090139/5baf049b-647e-4b94-a6c6-ebd5747eaa56">

### Editor page
![editor](https://github.com/ke444a/blog-app-mern/assets/81090139/1cc9c789-d310-4ae3-ae43-3a72fea9a6aa)

### Profile page
<img width="60%" height="50%" src="https://github.com/ke444a/blog-app-mern/assets/81090139/4ca42abd-187a-4f1c-9d85-02553e8d0978">

## Technologies

-   ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
-   ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
-   ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
-   ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
-   ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
-   ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
-   ![PostgreSQL](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
-   ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
-   ![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
-   ![React Hook Form](https://img.shields.io/badge/React_Hook_Form-0088CC?style=for-the-badge&logo=react-hook-form&logoColor=white)
-   ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
-   ![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)

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

Run the database migrations and populate the data:

```bash
$ cd backend/
$ npx prisma migrate dev
$ npm run seed
```

Run the application:

```bash
# Run the frontend and backend concurrently
$ cd blog-app-mern/
$ npm run dev
```

### Cloudinary Setup

Sign up on [Cloudinary](https://cloudinary.com/) to create an account. Once registered, you can find your API key, API secret, and cloud name in your account settings.

### Environment Variables

Create a `.env` file in the root directory of the project

```bash
$ touch .env
```

Add the following environment variables:

```bash
# PORT to run backend on
PORT=5000
# Connection URL to PostgreSQL database
DATABASE_URL=YOUR_POSTGRES_URL
# Secret key to sign tokens (random string)
TOKEN_SECRET=YOUR_TOKEN_STRING
# Cloudinary configuration
CLOUDINARY_API_KEY=API_KEY
CLOUDINARY_API_SECRET=API_SECRET
CLOUDINARY_CLOUD_NAME=CLOUD_NAME
```

## Contact

-   LinkedIn: [Danyl Kecha](https://www.linkedin.com/in/danylkecha/)
-   Mail: danyl.kecha.uk@gmail.com
-   GitHub: [ke444a](https://github.com/ke444a)
-   Twitter: [@ke444a](https://twitter.com/ke444a)
