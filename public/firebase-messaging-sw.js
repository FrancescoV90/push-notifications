// importScripts(
//   "https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js"
// );
// importScripts(
//   "https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js"
// );

// // "Default" Firebase configuration (prevents errors)
// const defaultConfig = {
//   apiKey: true,
//   projectId: true,
//   messagingSenderId: true,
//   appId: true,
// };

// // Initialize Firebase app
// firebase.initializeApp(defaultConfig);
// const messaging = firebase.messaging();

// //Listens for background notifications
// messaging.onBackgroundMessage((payload) => {
//   console.log("Received background message: ", payload);

//   //customise notification
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: payload.notification.icon || "/icon.png",
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

importScripts(
  "https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js"
);

if (firebase.messaging.isSupported()) {
  firebase.initializeApp({
    apiKey: true,
    projectId: true,
    messagingSenderId: true,
    appId: true,
  });

  const messaging = firebase.messaging();
  messaging.onBackgroundMessage((payload) => {
    var notificationData = {};
    if (payload.notification) {
      notificationData = payload.notification;
    } else {
      notificationData = JSON.parse(payload.data.notification);
    }
    var notificationOptions = {
      body: notificationData.body.replace(/<(.|\n)*?>/g, ""),
      icon: notificationData.icon,
    };

    self.registration.showNotification(
      notificationData.title,
      notificationOptions
    );
  });

  self.addEventListener("notificationclick", function (event) {
    console.dir(event);
    event.notification.close();

    event.waitUntil(
      clients
        .matchAll({
          type: "window",
        })
        .then(function (clientList) {
          for (var i = 0; i < clientList.length; i++) {
            var client = clientList[i];
            if (client.url == "/" && "focus" in client) return client.focus();
          }
          if (clients.openWindow) return clients.openWindow("/");
        })
    );
  });
}
