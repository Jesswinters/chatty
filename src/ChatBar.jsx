import React, {Component, Fragment} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);

    this.onMessageInput = this.onMessageInput.bind(this);
  }

  // Check if the enter key is pressed on the message or username inputs,
  // then send the info to the functions in App.jsx
  onMessageInput(event) {
    if (event.key === 'Enter' && event.currentTarget.message.value) {
      this.props.onNewMessage(event);
      event.currentTarget.message.value = '';
    } else if (event.key === 'Enter' && event.currentTarget.username.value) {
      this.props.onUsernameChange(event);
    }
  }

  render() {
    return (
      <Fragment>
        <footer className="footer-container">
          <form className="chatbar" onKeyPress={this.onMessageInput}>
            <input className="chatbar-username" name="username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser} />
            <input className="chatbar-message" name="message" placeholder="Type a message and hit ENTER" />
          </form>
        </footer>
      </Fragment>
    );
  }
}

export default ChatBar;
