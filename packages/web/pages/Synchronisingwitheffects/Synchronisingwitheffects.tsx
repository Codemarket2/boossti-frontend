import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import showNotification from '../../src/components/Notificationdisplay/notificationhelper';

function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      const msg = 'Calling video.play()';
      showNotification(msg);
    } else {
      const msg = 'Calling video.pause()';
      showNotification(msg);
    }
  }, [isPlaying]);

  return (
    <video ref={ref} src={src} loop playsInline>
      {/* Add a track for captions here */}
      <track kind="captions" srcLang="en" label="English captions" />
    </video>
  );
}
VideoPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};
export default function Effect() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [text, setText] = useState('');
  return (
    <>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button type="button" onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <VideoPlayer
        isPlaying={isPlaying}
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      />
    </>
  );
}
