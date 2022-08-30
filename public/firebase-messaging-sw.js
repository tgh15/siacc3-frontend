importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyCxCBi_8CjvbsOiC0wU0eV315E_xtUl6jI",
    authDomain: "siacc-b1d0d.firebaseapp.com",
    projectId: "siacc-b1d0d",
    storageBucket: "siacc-b1d0d.appspot.com",
    messagingSenderId: "528209304237",
    appId: "1:528209304237:web:01c1e8640212b2c91dc424",
    measurementId: "G-QC01TY60B9"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});