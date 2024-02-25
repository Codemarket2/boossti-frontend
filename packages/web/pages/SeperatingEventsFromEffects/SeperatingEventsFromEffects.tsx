import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import showNotification from '../../src/components/Notificationdisplay/notificationhelper';

function createConnection(serverUrl, roomId) {
  // A real implementation would actually connect to the server
  let connectedCallback;
  let timeout;
  return {
    connect() {
      timeout = setTimeout(() => {
        if (connectedCallback) {
          connectedCallback();
        }
      }, 100);
    },
    on(event, callback) {
      if (connectedCallback) {
        throw Error('Cannot add the handler twice.');
      }
      if (event !== 'connected') {
        throw Error('Only "connected" event is supported.');
      }
      connectedCallback = callback;
    },
    disconnect() {
      clearTimeout(timeout);
    },
  };
}

// function showNotification(message, theme) {
//   // Create a new div element for the notification
//   const notification = document.createElement('div');
//   notification.className = 'notification';
//   notification.textContent = message;

//   notification.style.position = 'fixed';
//   notification.style.top = '10px';
//   notification.style.right = '10px';
//   notification.style.padding = '10px';
//   notification.style.border = '1px solid #ccc';
//   notification.style.borderRadius = '4px';
//   notification.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
//   notification.style.transition = 'opacity 0.3s ease-in-out';
//   notification.style.background = theme === 'dark' ? 'black' : 'white';
//   notification.style.color = theme === 'dark' ? 'white' : 'black';

//   notification.style.background = theme === 'dark' ? 'black' : 'white';
//   notification.style.color = theme === 'dark' ? 'white' : 'black';

//   // Append the notification to the body
//   document.body.appendChild(notification);

//   // Remove the notification after 2 seconds
//   setTimeout(() => {
//     notification.remove();
//   }, 60);
// }

const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId, theme }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.on('connected', () => {
      showNotification('Connected!', theme);
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, theme]);

  return <h1>Welcome to the {roomId} room!</h1>;
}
ChatRoom.propTypes = {
  roomId: PropTypes.string.isRequired,
  theme: PropTypes.oneOf(['light', 'dark']).isRequired,
};
export default function SEFE() {
  const [roomId, setRoomId] = useState('general');
  const [isDark, setIsDark] = useState(false);
  return (
    <>
      <label htmlFor="val">
        Choose the chat room:{' '}
        <select
          id="val"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          onBlur={(e) => setRoomId(e.target.value)}
        >
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
      </label>
      <label htmlFor="check">
        <input
          id="check"
          type="checkbox"
          checked={isDark}
          onChange={(e) => setIsDark(e.target.checked)}
        />
        Use dark theme
      </label>
      <hr />
      <ChatRoom roomId={roomId} theme={isDark ? 'dark' : 'light'} />
    </>
  );
}
