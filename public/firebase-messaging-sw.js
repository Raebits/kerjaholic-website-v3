// Import and configure the Firebase SDK
// These scripts are made available when the app is served or deployed on Firebase Hosting
// If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup
// importScripts('/__/firebase/7.14.4/firebase-app.js');
// importScripts('/__/firebase/7.14.4/firebase-messaging.js');
// importScripts('/__/firebase/init.js');

// const messaging = firebase.messaging();

/**
 * Here is is the code snippet to initialize Firebase Messaging in the Service
 * Worker when your app is not hosted on Firebase Hosting.
 // [START initialize_firebase_in_sw]
 // Give the service worker access to Firebase Messaging.
 // Note that you can only use Firebase Messaging here, other Firebase libraries
 // are not available in the service worker.**/
 importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js');
 importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js');
 // Initialize the Firebase app in the service worker by passing in
 // your app's Firebase config object.
 // https://firebase.google.com/docs/web/setup#config-object
 firebase.initializeApp({
   apiKey: "AIzaSyDf4XIIW9vIY88ZaIRztbJdx5cC3v4y4ug",
   authDomain: "kerjaholic-project.firebaseapp.com",
   databaseURL: "https://kerjaholic-project.firebaseio.com",
   projectId: "kerjaholic-project",
   storageBucket: "kerjaholic-project.appspot.com",
   messagingSenderId: "17773254584",
   appId: "1:17773254584:web:1d11fa3b369362a3efa14d"
 });
 // Retrieve an instance of Firebase Messaging so that it can handle background
 // messages.
 const messaging = firebase.messaging();
 // [END initialize_firebase_in_sw]


// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// [START background_handler]

// v1
// messaging.setBackgroundMessageHandler(function(payload) {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);
//   // Customize notification here
//   const notificationTitle = 'Background Message Title';
//   const notificationOptions = {
//     body: 'Background Message body.',
//     icon: '/images/thumbnail.png'
//   };

//   return self.registration.showNotification(notificationTitle, notificationOptions);
// });

// v2
messaging.setBackgroundMessageHandler(function (payload) {
  console.log('Handling background message ', payload);

  return self.registration.showNotification(payload.data.title, {
    body: payload.data.body,
    icon: payload.data.icon,
    tag: payload.data.tag,
    data: payload.data.link,
  });
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  event.waitUntil(self.clients.openWindow(event.notification.data));
});