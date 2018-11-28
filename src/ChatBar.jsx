import React, {Component, Fragment} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);

    this.onMessageInput = this.onMessageInput.bind(this);
  }

  onMessageInput(event) {
    if (event.key === 'Enter' && event.currentTarget.message.value) {
      this.props.onNewMessage(event);
      event.currentTarget.message.value = '';
    }
  }

  render() {
    return (
      <Fragment>
        <footer>
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
