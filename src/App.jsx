import React, {Component, Fragment} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {
        name: 'Anonymous',
      },
      loading: true,
      messages: [],
      numberofUsers: 0,
    };

    this.socket = new WebSocket('ws://localhost:3001/');

    this.newMessage = this.newMessage.bind(this);
    this.usernameChange = this.usernameChange.bind(this);
    this.pickRandomColor = this.pickRandomColor.bind(this);
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

      switch(data.type) {
        case 'incomingMessage':
          break;
        case 'incomingNotification':
          this.usernameChange;
          break;
        case 'numberOnlineUsers':
          this.setState(
            {
              numberofUsers: data.numberofUsers
            }
          );
          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error('Unknown event type ' + data.type);
      }

      this.setState(
        {
          messages: this.state.messages.concat(JSON.parse(event.data)),
        }
      );
    };

    this.setState(
      {
        currentUser:
        {
          name: this.state.currentUser.name,
          color: this.pickRandomColor(),
        }
      }
    );
  }

  componentWillUnmount() {
    this.wss.close();
  }

  newMessage(event) {
    const message = event.currentTarget.message.value;
    let username = event.currentTarget.username.value;

    let newMessage = {
      color: this.state.currentUser.color,
      username,
      content: message,
      type: 'postMessage',
      update: `Incoming message from ${username}`,
    };

    this.socket.send(JSON.stringify(newMessage));
  }

  usernameChange(event) {
    let username = event.currentTarget.username.value;

    // Check if username exists. If it does exist, set the currentUser state of app to username.
    if (username) {
      this.setState(
        {
          currentUser: {
            name: username,
            color: this.state.currentUser.color,
          }
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

  pickRandomColor() {
    const colorsArray = ['#FF0000', '#00FF00', '#0000FF', '#FFD700'];
    const randomColor = colorsArray[Math.floor(Math.random() * colorsArray.length)];

    return randomColor;
  }

  render() {
    if (this.state.loading) {
      return (
        <Fragment>
          <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
            <span className="navbar-users-online">
              {this.state.numberofUsers} {(this.state.numberofUsers === 1) ? 'user online' : 'users online'}
            </span>
          </nav>
          <div className="loading">Loading...</div>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
            <span className="navbar-users-online">
              {this.state.numberofUsers} {(this.state.numberofUsers === 1) ? 'user online' : 'users online'}
            </span>
          </nav>
          <MessageList messages={this.state.messages} />
          <ChatBar onNewMessage={this.newMessage} currentUser={this.state.currentUser.name} onUsernameChange={this.usernameChange} />
        </Fragment>
      );
    }
  }
}

export default App;
