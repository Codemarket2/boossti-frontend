import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import showNotification from '../../src/components/Notificationdisplay/notificationhelper';

function createConnection(serverUrl, roomId) {
  return {
    connect() {
      const message = `✅ Connecting to "${roomId}" room at ${serverUrl}...`;
      showNotification(message);
    },
    disconnect() {
      const message = `❌ Disconnected from "${roomId}" room at ${serverUrl}`;
      showNotification(message);
    },
  };
}

function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, serverUrl]);

  return (
    <>
      <label htmlFor="serverUrlInput">
        Server URL:{' '}
        <input
          id="serverUrlInput"
          value={serverUrl}
          onChange={(e) => setServerUrl(e.target.value)}
        />
      </label>
      <h1>Welcome to the {roomId} room!</h1>
    </>
  );
}

ChatRoom.propTypes = {
  roomId: PropTypes.string.isRequired,
};
export default function REffect() {
  const [roomId, setRoomId] = useState('general');
  return (
    <>
      <label htmlFor="value">
        Choose the chat room:{' '}
        <select
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          onBlur={(e) => setRoomId(e.target.value)}
        >
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
      </label>
      <hr />
      <ChatRoom roomId={roomId} />
    </>
  );
}
