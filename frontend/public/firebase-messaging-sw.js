importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
    "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);


firebase.initializeApp({
    apiKey: "AIzaSyBhI9LxMoADT5ce3DjFIHEbb6pPRbYMWwg",
    authDomain: "ninja-todo-assistant.firebaseapp.com",
    projectId: "ninja-todo-assistant",
    storageBucket: "ninja-todo-assistant.firebasestorage.app",
    messagingSenderId: "303738036585",
    appId: "1:303738036585:web:cd7199e63830c93f01ddf8",
    measurementId: "G-FNW1C2K0ZK"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);

    const notificationTitle = payload.data.title;
    const notificationOptions = {
        body: payload.data.body,
        icon: 'ninjalogo.png',
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

