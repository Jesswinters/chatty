import React, {Fragment} from 'react';

function Message(props) {
  return (
    <Fragment>
      <div className="message">
        <span className="message-username">{props.message.username}</span>
        <span className="message-content">{props.message.content}</span>
      </div>
      {/* <div className="message system">{props.message.type}</div> */}
    </Fragment>
  );
}

export default Message;
