import React from 'react';
import CardComponent from './SpotifyCard';
// import Card from '../card/Card'

function Spotify({ responses }) {
  console.log(responses, 'In the spotify respsonse');
  return (
    <div>
      <div>
        {responses?.map((response) => (
          <div
            key={response._id}
            className="draggable-form-item"
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('text/plain', JSON.stringify([response]));
            }}
          >
            <div>
              <CardComponent
                imageSource={response.imageSource}
                title={response.title}
                description={response.description}
                height={2}
                width={2}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Spotify;
