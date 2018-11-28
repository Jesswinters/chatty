import React, {Fragment} from 'react';

function Message(props) {
  if (props.message.type === 'incomingNotification') {
    return (
      <Fragment>
        <div className="message system">{props.message.update}</div>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <div className="message">
          <span className="message-username">{props.message.username}</span>
          <span className="message-content">{props.message.content}</span>
        </div>
      </Fragment>
    );
  }
}

export default Message;
