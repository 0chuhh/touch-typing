import React from 'react';
import logo from './logo.svg';
import './App.css';
import useKeyPress from './hooks/useKeyPress';
import TypingModule from 'component/modules/typing-module';

function App() {
  return (
    <div className="App">
      <TypingModule classNum={2} className='урок' text={'ввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввввв'} maxTime={0}/>
    </div>
  );
}

export default App;
