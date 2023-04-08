import React from 'react';
import logo from './logo.svg';
import './App.css';
import useKeyPress from './hooks/useKeyPress';
import TypingModule from 'component/modules/typing-module';

function App() {
  return (
    <div className="App">
      <TypingModule classNum={2} repeat={true} className='урок' text={'hello world'}
      maxTime={{minutes:0, seconds:10}}/>
    </div>
  );
}

export default App;
