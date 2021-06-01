# Covida
A digital version of the popular board game Pandemic. I made this game as I didn't like that the 
official game version does not have a true multiplayer.

![](https://i.postimg.cc/gcvR3Fxc/covida.png)

## Functionality
- Email/Password or Google login
- Realtime multiplayer for 2-5 players. When starting a new game, a game code is generated that can 
  be used by other players to join the game.
- Includes all cards, roles and functionality of the original game. The game startup, meaning 
  assigning roles, infecting cities and dealing cards has been automated. Actions throughout the 
  game, e.g. increasing the infection rate are not automated on purpose, as it reduces the fun 
  of playing in my opinion.
- Option to revert the last 5 changes, in case a mistake has been made and to keep it fun.
- Game over and win detection.
- The game is available in English and German.

![](https://media.giphy.com/media/Rdxv5lyyxWqCXwjXP9/giphy.gif)

### Limitations
- The game works reasonably well on smaller screen and most actions should work on touchscreens 
  but there is certainly some more work needed to get this done fully.
- The current version does not have an in-game manual included.

## Prerequesites
1. Create a [Firebase project](https://console.firebase.google.com)
    - Enable Email/Password (and optionally Google) for the authentication Sign-In settings
    - Add `localhost` to the authorized domains in the Authentication settings. Once deployed, 
      you should also add the domain to which you deployed the app to.
    - Create a Firestore database instance
    - Create a collection `authorized` with a document `users`. In this document, create an 
      array called `players` which should contain the email addresses that should have access to 
      the game. I included this to prevent unwanted access for others, as I wanted to limit it 
      to friends & family only.
2. `.env` file with the following parameters from your Firebase project
```.dotenv
VUE_APP_FIREBASE_APIKEY=<APIKEY>
VUE_APP_FIREBASE_AUTHDOMAIN=<AUTHDOMAIN>
VUE_APP_FIREBASE_PROJECTID=<PROJECTID>
VUE_APP_FIREBASE_APPID=<APPID>
VUE_APP_FIREBASE_DATABASEURL=<DATABASEURL>
```


## Project setup
### Install dependencies
```
yarn
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

## Deployment
The project can be deployed to a static site hosting. I hosted my version on a [Netlify](https://www.netlify.com) instance.

### Copyright
I do not own the rights to Pandemic. This project was created for personal use only and is not 
intended to be marketed in any form. In case of any complaints, please 
[contact me](mailto:jonas.weidner@outlook.com).
