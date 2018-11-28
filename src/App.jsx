import React, {Component, Fragment} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import data from './data.json';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: 'Jess'},
      messages: data.messages,
      loading: true,
    };

    this.newMessage = this.newMessage.bind(this);
  }

  componentDidMount() {
    // After 3 seconds, set `loading` to false in the state.
    setTimeout(() => {
      this.setState({loading: false});
    }, 3000);

    setTimeout(() => {
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: 'Michelle', content: 'Hello there!'};
      const messages = this.state.messages.concat(newMessage);
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages});
    }, 5000);
  }

  newMessage(event) {
    const message = event.currentTarget.message.value;
    let username = event.currentTarget.username.value;

    // Check if username exists. If it does exist, set the currentUser state of App to username.
    if (username) {
      this.setState({currentUser: {name: username}});
    } else {
      username = this.state.currentUser.name;
    }

    const newId = this.state.messages.length + 10;
    const newMessage = {
      id: newId,
      username,
      content: message,
      type: 'incomingMessage',
    };
    const messages = this.state.messages.concat(newMessage);

    this.setState({
      messages: messages
    });
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
          <ChatBar onNewMessage={this.newMessage} />
        </Fragment>
      );
    }
  }
}

export default App;
