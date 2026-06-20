# Realtime Chat Application

A realtime chat application built with React Native and Node.js.  
Users can register, login, and chat instantly using Socket.io.

## Features

- User Registration and Login
- JWT Authentication
- Persistent Login using AsyncStorage
- Realtime messaging using Socket.io
- Chat history persistence
- Sender name and message timestamp
- Sent and received message UI separation
- Socket connection status
- Logout functionality
- Custom App Icon and Splash Screen

## Tech Stack

### Mobile App
- React Native (Expo)
- React Navigation
- Socket.io Client
- AsyncStorage
- Axios

### Backend
- Node.js
- Express.js
- Socket.io
- JWT Authentication
- MongoDB Atlas

## Chat History Approach

Option B - Server Side Storage

All chat messages are stored in MongoDB Atlas.  
When the app opens, previous messages are fetched from the backend API.

## Backend URL
https://chat-app-backend-1yck.onrender.com


## Project Setup

Clone repository:

```bash
git clone https://github.com/shreyas-khandare/chat-app.git

cd chat-application
```

Backend:

```bash
cd backend

npm install

npm start
```

Mobile:

```bash
cd mobile

npm install

npx expo start
```

## Test Accounts

User 1:

Username: user1  
Password: 123456


User 2:

Username: shreyas  
Password: 123456


## APK Download

https://expo.dev/accounts/shreyas_dev/projects/realtime-chat/builds/77b8c77d-d816-435c-bd19-6e96d66bbc92