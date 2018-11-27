import React, {Fragment} from 'react';

function ChatBar() {
  return (
    <Fragment>
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    </Fragment>
  );
}

export default ChatBar;
