import React, {Component, Fragment} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: 'Anonymous'},
      messages: [],
      loading: true,
    };

    this.socket = new WebSocket('ws://localhost:3001/');

    this.newMessage = this.newMessage.bind(this);
    this.usernameChange = this.usernameChange.bind(this);
  }

  componentDidMount() {
    this.socket.onopen = (event) => {
      console.log('Connected to server');
    };

    // After 3 seconds, set `loading` to false in the state.
    setTimeout(() => {
      this.setState({loading: false});
    }, 2000);

    this.socket.onmessage = (event) => {
      let data = JSON.parse(event.data);

      this.setState(
        {
          messages: this.state.messages.concat(JSON.parse(event.data))
        }
      );

      switch(data.type) {
        case 'incomingMessage':
          break;
        case 'incomingNotification':
          this.usernameChange;
          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error('Unknown event type ' + data.type);
      }
    };
  }

  componentWillUnmount() {
    this.wss.close();
  }

  newMessage(event) {
    const message = event.currentTarget.message.value;
    let username = event.currentTarget.username.value;

    let newMessage = {
      username,
      content: message,
      type: 'postMessage',
      update: `Incoming message from ${username}`,
    };

    this.socket.send(JSON.stringify(newMessage));
  }

  usernameChange(event) {
    let username = event.currentTarget.username.value;

    // Check if username exists. If it does exist, set the currentUser state of App to username.
    if (username) {
      this.setState(
        {
          currentUser: {name: username}
        }
      );
    } else {
      username = this.state.currentUser.name;
    }

    let notification = {
      type: 'postNotification',
      update: `${this.state.currentUser.name} has changed their name to ${username}`,
    };

    this.socket.send(JSON.stringify(notification));
  }

  render() {
    if (this.state.loading) {
      return (
        <Fragment>
          <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
          </nav>
          <div className="loading">Loading...</div>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
          </nav>
          <MessageList messages={this.state.messages} />
          <ChatBar onNewMessage={this.newMessage} currentUser={this.state.currentUser.name} onUsernameChange={this.usernameChange} />
        </Fragment>
      );
    }
  }
}

export default App;
