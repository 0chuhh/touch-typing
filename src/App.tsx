import React from 'react';
import logo from './logo.svg';
import './App.css';
import useKeyPress from './hooks/useKeyPress';
import TypingModule from 'component/modules/typing-module';
const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nisi arcu, mattis id pretium interdum, euismod ac leo. Suspendisse ut lorem vitae diam sagittis convallis aliquam sed diam. Vivamus mattis odio a enim pellentesque pellentesque. Donec enim nulla, sollicitudin vel iaculis eget, aliquet sit amet nisl. Proin pretium bibendum venenatis. Donec sed viverra dolor. Duis sit amet gravida erat. Duis eleifend sapien ac est sagittis hendrerit. Aliquam volutpat dolor erat, eget egestas lorem tincidunt id. Phasellus mollis odio aliquam purus ullamcorper elementum. Nunc ut libero id quam vehicula pharetra in vel dolor.Nulla semper felis convallis, imperdiet lacus sed, pellentesque metus. Donec molestie nunc et libero vestibulum, et molestie turpis sodales. Nulla condimentum mollis condimentum. Integer et est nunc. Morbi vitae varius nisl. Fusce magna est, rutrum quis sem et, mollis rutrum purus. Proin turpis metus, tempus ac erat et, bibendum pulvinar lectus."
function App() {
  return (
    <div className="App">
      <TypingModule classNum={2} repeat={true} className='урок' text={text}
      maxTime={{minutes:5, seconds:10}}/>
    </div>
  );
}

export default App;
