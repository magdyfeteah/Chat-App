# Chat App Project

## Overview

The Chat App Project is a feature-rich, responsive web application designed to facilitate real-time communication between users. Built with React for the front end and Firebase for the back end, this application offers a seamless chat experience, complete with user authentication, profile management, and advanced features like blocking users and managing shared media.


## Live Preview

You can view a live preview of the application [here](https://chat-app-magdy.vercel.app/).

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Application Structure](#application-structure)
- [Redux Store Structure](#redux-store-structure)
- [Firebase Integration](#firebase-integration)
- [Contributing](#contributing)
- [License](#license)

## Features

### Authentication and Authorization
- **User Registration and Login**: Secure user authentication using Firebase Authentication.
- **Persistent Sessions**: Users stay logged in even after refreshing the page.

### Real-Time Chat
- **Instant Messaging**: Users can send and receive messages in real-time.
- **Message History**: Chat history is maintained, allowing users to view past conversations.

### User Profiles
- **Profile Customization**: Users can update their profile information, including username and avatar.
- **Avatar Upload**: Avatars are stored securely in Firebase Storage.

### User Interaction
- **Block/Unblock Users**: Users can block or unblock others, preventing unwanted communication.
- **Notifications**: Users receive real-time notifications for new messages and updates.

### Media Sharing
- **Image Sharing**: Users can share images within chats.
- **Shared Media Management**: View and manage shared photos and files.

### Additional Features
- **Responsive Design**: The app is fully responsive and works well on all device sizes.
- **Loading States**: User-friendly loading indicators enhance the user experience.

## Technology Stack

- **Front End**: React, Redux
- **Back End**: Firebase (Authentication, Firestore, Storage)
- **Styling**: CSS, custom styles
- **Other Libraries**: date-fns for date formatting, emoji-picker-react for emoji support

## Setup and Installation

### Prerequisites

- Node.js and npm installed
- Firebase account and project set up

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/magdyfeteah/Chat-App
   cd Chat-App
## Install dependencies:

```bash
npm install
```
## Firebase Configuration:
- Create a Firebase project and enable Firestore, Authentication, and Storage.
- Create a firebase.js file in the lib directory with the following configuration:

  ```bash
  import { initializeApp } from "firebase/app";
  import { getAuth } from "firebase/auth";
  import { getFirestore } from "firebase/firestore";
  import { getStorage } from "firebase/storage";

  const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
  };

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getFirestore(app);
  export const storage = getStorage(app);

## Start the application:
```bash
    npm run dev
```
## Usage
- Register/Login: Users can create an account or log in with their credentials.
- Profile Management: Update username and avatar from the profile settings.
- Chat: Start a chat with other users, send messages, and share media.
- Block Users: Block or unblock users to control who can communicate with you.
- View Shared Media: Access and download shared photos and files from the chat history.
## Application Structure
- Components
  - App: Main application component handling routes and authentication state.
  - Chat: Component managing real-time chat and message handling.
  - Detail: Displays user details and blocking functionality.
  - Login: Manages user authentication, including login and registration.
  - List: Contains the user's profile and list of chats.
  - UserInfo: Displays current user's profile information.
  - ChatList: Shows a list of ongoing chats.
  - Notification
## Redux Store Structure
 - userSlice: Manages user-related state, including current user information and authentication status.
 - chatSlice: Manages chat-related state, such as active chat ID, user information, and blocked status.
 - uiSlice: Handles UI states, including detail view toggling.
## Firebase Integration
 - Authentication: Manages user sign-in and sign-out processes.
 - Firestore: Stores user profiles, chat messages, and other application data.
 - Storage: Manages file uploads, such as user avatars.
## Contributing
Contributions are welcome! Please follow the standard guidelines for contributing to this project.
Fork the repository, make your changes, and submit a pull request.
## License
This project is licensed under the MIT License. See the LICENSE file for details.
