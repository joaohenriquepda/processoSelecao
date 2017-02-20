import React, { Component } from 'react';

import '../node_modules/semantic-ui-css/semantic.min.css';
import '../node_modules/react-datepicker/dist/react-datepicker.min.css';
import { Container } from 'semantic-ui-react'
import Graphic from './Graphic/Graphic'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Container>
          <Graphic></Graphic>
        </Container>
      </div>
    );
  }
}

export default App;
