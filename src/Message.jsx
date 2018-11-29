import React, {Fragment} from 'react';

function Message(props) {
  if (props.message.type === 'incomingMessage') {
    return (
      <Fragment>
        <div className="message system">{props.message.update}</div>
        <div className="message">
          <span className="message-username" style={{color: `${props.message.color}`}}>{props.message.username}</span>
          <span className="message-content">{props.message.content}</span>
        </div>
      </Fragment>
    );
  } else if (props.message.type === 'numberOnlineUsers' || 'incomingNotification') {
    return (
      <Fragment>
        <div className="message system">{props.message.update}</div>
      </Fragment>
    );
  }
}

export default Message;
