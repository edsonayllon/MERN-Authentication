# MERN Authentication Test


## 1 | Description

Modular authentication application made to isolate bugs with authentication,
and have one working authentication system to compare other apps implementing this protocol.

Authentication system uses MongoDB, Node.js, Express.js, React, and React-Native (MERN).


## 2 | Roadmap

### 2.1 Minimal Viable Product (MVP)

**Status:** _Complete_

Backend
- [x] Add MongoDB
  - [x] Create User Schema
  - [x] Ability to save User objects to the database
  - [x] Hash user passwords before saving credentials to the database
- [x] Add JsonWebTokens (JWT)
  - [x] Create and deliver token to the Client based on credentials
  - [x] Read token, compare to credentials on database
- [x] Create protected API routes  
  - [x] Create middleware the checks JWT

Frontend
- [x] Create a form that saves values to state
- [x] Send user credentials to server with POST method
- [x] Save JWT from Server
  - [x] JWT saved to Local Storage on React and React-native
  - [x] Local storage accessed, sent to server to verify authorization
  - [x] Working access to protected routes on Client and Server
- [x] Create a protected route
  - [x] Create a route that holds protected content
  - [x] Create middleware that redirects when server returns unauthorized

Currently, the app can create a new user with an email and password, redirect that user to the login page, then login to redirect to the restricted section. Passwords are salted and hashed before being saved to the database. The server will return an error on the given situations, which will be shown to the user on the client:
* Mismatching passwords
* Creating an account that has already been created
* Attempting to submit with an empty password field
* Attempting to submit with an empty email field
* Incorrect password for a given email on login

### 2.2 Add Passport

**Status**: _Complete_

- [x] Logout system
- [x] Passport.js integration
  - [x] Login System
    - [x] Create a JWT upon login request if successful
    - [x] Allow access to restricted sections upon login
    - [x] Send error messages for login
  - [x] Account Registration System
    - [x] Create a user with Passport
    - [x] Confirm matching passwords -- handled by client
    - [x] Respond if user already exists

### 2.3 Add password reset through email

**Status**: _Complete_

- [x] Fully functioning password reset using email with Mongodb
  - [x] Create a forgot password form in the frontend
  - [x] Add ability to email users who sign up
  - [x] Email users who submit the forgot password form
  - [x] Create a reset password token, add it to the Email
  - [x] Have email push to a URL on the frontend containing the token
  - [x] Read the token in the URL, save as a variable in the Client
  - [x] Send the password reset token from the Client to the Server
  - [x] Check to see if password reset token expired in the Server using Mongodb
  - [x] If token expired, send expiration notice to the client, have client display message
  - [x] If token is not expired, and matching password provided in form, reset the password
- [x] Other Updates
  - [x] Changed hashing function for passwords from bcrypt to Argon2 https://password-hashing.net/
  - [x] Updated frontend promises to Async functions
  - [x] Made user services and mailing services to hold functions externally

### 2.4 Add email verification

**Status**: *Not started*

- [ ] Fully functioning email verification with Mongodb

### 2.5 Add Alternative Logins (social)

**Status**: *Not started*

- [ ] Add 0Auth for social logins
  - [ ] Change User Schema for local and social logins
- [ ] Create user roles
  - [ ] Create restricted sections based on user role (No account, Free account, Premium account)
  - [ ] Add roles to user schema
  - [ ] Create system to test roles
- [ ] Verify accounts with Email verification
- [ ] Add user page that can update email and username, password in mongodb

## 3 | Getting Started

### 3.1 Installing

1. Install dependencies in both `cd ./frontend` and `cd ./backend`

```
npm install || yarn
```

Authentication requires MongoDB to be installed on your system. MongoDB can be installed with [HomeBrew on Mac](https://treehouse.github.io/installation-guides/mac/mongo-mac.html)

2. In `./backend` create a new file `variables.env`.

Add a secret key to `variables.env`. The secret key can be whatever you would like.
This step is optional for this app if not running for production.

```
AUTH_SECRET_KEY = "Secret Key"
```

And add your mongodb uri with your credentials in `variables.env`: This step is
optional for this app in not running for production.

```
MONGO_URI = "Mongo uri with credentials"
```

And add credentials for a mailing client you will use to send your emails.
Integrated services include Zoho, Gmail, and Outlook. This app uses nodemailer
to send emails. This step is required if you would like to enable password
resets.

Inside `./backend/variables.env`.

```
MAIL_USER = "your email"
MAIL_PASS = "your email password"
APP_NAME = "your app name"
```

### 3.2 Running

You can run as a web app, mobile app, or desktop app.

#### Running the Backend

You must run the backend first. The backend requires MongoD to be running first.

Inside `./backend`:

1. Begin MongoD.

```
mongod
```

2. Then run the server

```
npm run dev || yarn dev || npm run start || yarn start
```

Running the script `dev` will use `nodemon` which restarts the server upon
changes in code.

The back-end will be running in localhost:4000 with current settings.

You can see your mongodb

#### Running the Frontend

The front-end will run in localhost:3000 with current settings.

Inside `./frontend`:


For Web:

```
npm run web || yarn web
```

For Mobile:

```
npm run start || yarn start || exp start
```

For Desktop:

```
npm run desktop || yarn desktop
```
