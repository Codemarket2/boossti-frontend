export default function showNotification(message, duration = 3000) {
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      background-color: #333;
      color: #fff;
      padding: 10px 20px;
      border-radius: 5px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
      z-index: 9999;
    `;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, duration);
}

// Example usage:
// showNotification('Hello, world!', 5000); // Display a notification with a custom message for 5 seconds.
