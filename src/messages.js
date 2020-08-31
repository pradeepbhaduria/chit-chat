import React, { useState, useEffect, useRef } from 'react';
import { retrieveMessagesFromDB } from './firebase/firebase-db';
import { addSizeToGoogleProfilePic } from './util';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const messageListElement = useRef();

  useEffect(() => {
    const cb = (messages) => setMessages(messages);
    retrieveMessagesFromDB(cb);
  }, []);

  useEffect(() => {
    messageListElement.current.scrollTop =
      messageListElement.current.scrollHeight;
  });

  console.log('messages to display: ', messages);

  return (
    <div id="messages" ref={messageListElement}>
      <div className="messages-list-content">
        {messages.map(
          ({ id, timestamp, text, name, profilePicUrl, imageUrl }) => {
            let userPicElementStyle = {};
            if (profilePicUrl)
              userPicElementStyle = {
                backgroundImage:
                  'url(' + addSizeToGoogleProfilePic(profilePicUrl) + ')',
              };
            const ts = timestamp ? timestamp.toMillis() : Date.now();
            return (
              <div
                className="message-container"
                id={id}
                timestamp={ts}
                key={id}
              >
                <div className="spacing">
                  <div className="pic" style={userPicElementStyle}></div>
                </div>
                <div className="message">
                  {text ? text : <image src={imageUrl} />}
                </div>
                <div className="name">{name}</div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default Messages;
