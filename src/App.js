import React, { Component } from 'react';
import { init } from './firebase/firebase-init';
import Header from './header';
import Main from './main';

class App extends Component {
  constructor(props) {
    super(props);
    // firebase must be loaded at the beginning
    init(this.authObserver);
    this.state = { user: null };
  }
  authObserver = (user) => {
    console.log('auth state changed-', user);
    this.setState({ user });
  };
  render() {
    return (
      <div className="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <Header user={this.state.user} />
        <Main user={this.state.user} />
      </div>
    );
  }
}

export default App;
