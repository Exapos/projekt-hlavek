# Name

Vítejte tohle je projekt pro Pana učitele Hlavka

# Description
Poměrně jednoduchá aplikace na TODO s registračním formulařem napojený celé na Firebase platformu

# Requirements

Je nutné mít minimalně:
 - git version: 2.34.1
 - node version: v19.7.0
 - npm version: 9.6.0
 
 Dále doporučuji mít emulator androidu nebo Ios nebo stačí [Expo Go](https://expo.dev/client)

## Installation

Pro správne spuštění aplikace je nutné vše spustit uvnitř projektu.
Velmi důležité je nastavit si [firebase](https://firebase.google.com/?gclid=Cj0KCQiA9YugBhCZARIsAACXxeJKmucpAiwVdJBcRqwwoc3rKUe3AzawFFRdCn4cXoJSCHKL0bJyLjcaAiXKEALw_wcB&gclsrc=aw.ds) projekt.
A vytvoření souboru ve složce ./src/Firebase/
Například:

**Firebase.js**
```javascript
        const firebaseConfig = {
    
    	apiKey: "ENV.apiKey",
    
    	authDomain: "ENV.authDomain",
    
    	projectId: "ENV.projectId",
    
    	storageBucket: "ENV.storageBucket",
    
    	messagingSenderId: "ENV.messagingSenderId",
    
    	appId: "ENV.appId",
    
    	measurementId: "ENV.mesurementId"
    
    };
```
Pak už stačí jen:
 1. npm install
 3. npx expo start --tunnel