import Earth from './Earth';
import Mars from './Mars';
import { Match, Miss } from 'react-router';
import Moon from './Moon';
import NotFound from './NotFound';
import React from 'react';

const Main = React.createClass({
  render() {
    return (
      <main>
        <Match pattern="/" exactly component={Earth} />
        <Match pattern="/moon" component={Moon} />
        <Match pattern="/mars" component={Mars} />
        <Miss component={NotFound} />
      </main>
    )
  }
});

export default Main;
