import { BrowserRouter } from 'react-router';
import React from 'react';
import Footer from './layout/Footer';
import Header from './layout/Header';
import Main from './Main';

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Main />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}
