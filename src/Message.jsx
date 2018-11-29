import React, {Fragment} from 'react';

function Message(props) {
  const msg = props.message;

  if (msg.type === 'incomingMessage') {
    return (
      <Fragment>
        <div className="message system">{msg.update}</div>
        <div className="message">
          <span className="message-username" style={{color: msg.color}}>{msg.username}</span>
          <span className="message-content">
            {msg.content}
            {msg.image ? <img src={msg.image} className="message-image" /> : null}
          </span>
        </div>
      </Fragment>
    );
  } else if (msg.type === 'numberOnlineUsers' || 'incomingNotification') {
    return (
      <Fragment>
        <div className="message system">{msg.update}</div>
      </Fragment>
    );
  }
}

export default Message;
