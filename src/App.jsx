import React, {Component, Fragment} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import data from './data.json';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: 'Anonymous'},
      // messages: data.messages,
      messages: [],
      loading: true,
    };

    this.socket = new WebSocket('ws://localhost:3001/');

    this.newMessage = this.newMessage.bind(this);
  }

  componentDidMount() {
    // After 3 seconds, set `loading` to false in the state.
    setTimeout(() => {
      this.setState({loading: false});
    }, 2000);

    this.socket.addEventListener('message', (message) => {
      this.setState(
        {
          messages: this.state.messages.concat(JSON.parse(message.data))
        }
      );
    });

    this.socket.onopen = (event) => {
      console.log('Connected to server');
    };
  }

  componentWillUnmount() {
    this.wss.close();
  }

  newMessage(event) {
    const message = event.currentTarget.message.value;
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

    let newMessage = {
      username,
      content: message,
      // type: 'incomingMessage',
    };

    this.socket.send(JSON.stringify(newMessage));
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
          <ChatBar onNewMessage={this.newMessage} currentUser={this.state.currentUser.name} />
        </Fragment>
      );
    }
  }
}

export default App;
