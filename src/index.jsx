import React from 'react';
import ReactDOM from 'react-dom';
import Intro from './components/intro';
import './root.scss';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}

const Main = () => {
  return (
    <div>
      <Intro />
    </div>
  );
};

ReactDOM.render(<Main />, document.getElementById('react-app'));
