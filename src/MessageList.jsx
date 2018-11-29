import React, {Component, Fragment} from 'react';
import Message from './Message.jsx';

// Loop through messages to display all messages and info in the message list
const renderMessages = (messages) => messages.map(
  (message) => <Message message={message} key={message.id}/>
);

class MessageList extends Component {
  render() {
    return (
      <Fragment>
        <main className="messages">
          {renderMessages(this.props.messages)}
        </main>
      </Fragment>
    );
  }
}

export default MessageList;
