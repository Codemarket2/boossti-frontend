import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import showNotification from '../../src/components/Notificationdisplay/notificationhelper';

function createConnection({ serverUrl, roomId }) {
  // A real implementation would actually connect to the server
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

const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const options = {
      serverUrl,
      roomId,
    };
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);

  return (
    <>
      <h1>Welcome to the {roomId} room!</h1>
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
    </>
  );
}
ChatRoom.propTypes = {
  roomId: PropTypes.string.isRequired,
};

export default function RED() {
  const [roomId, setRoomId] = useState('general');
  return (
    <>
      <label htmlFor="value">
        Choose the chat room:{' '}
        <select
          id="value"
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
