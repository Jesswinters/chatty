import React, {Component, Fragment} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import data from './data.json';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data,
      loading: true,
    };
  }

  componentDidMount() {
    // After 3 seconds, set `loading` to false in the state.
    setTimeout(() => {
      this.setState({loading: false});
    }, 3000);
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
          <MessageList messages = {this.state.data.messages}/>
          <ChatBar />
        </Fragment>
      );
    }
  }
}

export default App;
