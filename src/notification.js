if ("Notification" in window) {
  if (Notification.permission === "granted") {
    // l'utilisateur a déjà autorisé les notifications pour votre application
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function(permission) {
      if (permission === "granted") {
        // l'utilisateur a autorisé les notifications
      }
    });
  }
}

// Pour activer les notifications, vous pouvez utiliser l'API Web Push

function sendNotification() {
  // Votre code pour envoyer une notification
}

// Exemple d'utilisation
sendNotification();
