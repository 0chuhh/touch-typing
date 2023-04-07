import React from 'react';
import logo from './logo.svg';
import './App.css';
import useKeyPress from './hooks/useKeyPress';
import TypingModule from 'component/modules/typing-module';

function App() {
  return (
    <div className="App">
      <TypingModule class={{name:'urok', number:1}} text={''} maxTime={0}/>
    </div>
  );
}

export default App;
