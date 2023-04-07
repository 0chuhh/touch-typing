import React, { useState, FC } from 'react';
import useKeyPress from '../../../hooks/useKeyPress';
import Timer, { TimerStateType } from 'component/ui/timer/Timer';

interface classType{
    number:number,
    name:string
}

interface TypingModuleProps{
    class: classType
    text:string
    maxTime:number
    repeat?:boolean 
}
const TypingModule:FC<TypingModuleProps> = ({class: {number=1, name='name'}, text='Hello world!', repeat=true}) => {
const initialWords = 'hello world!hello world!hello world!hello world!';
    const [leftPadding, setLeftPadding] = useState(
        new Array(20).fill(' ').join(''),
    );
    const [outgoingChars, setOutgoingChars] = useState('');
    const [currentChar, setCurrentChar] = useState(initialWords.charAt(0));
    const [incomingChars, setIncomingChars] = useState(initialWords.substring(1));

 
    const generate = () =>{
        return 'abcd'
    }
    useKeyPress(key => {
        console.log(currentChar)
         //1
    let updatedOutgoingChars = outgoingChars;
    let updatedIncomingChars = incomingChars;
    
    //2
    if (key === currentChar) {
      //3
      if (leftPadding.length > 0) {
        setLeftPadding(leftPadding.substring(1));
      }
      updatedOutgoingChars += currentChar;
      setOutgoingChars(updatedOutgoingChars);
      setCurrentChar(incomingChars.charAt(0));
      updatedIncomingChars = incomingChars.substring(1);
      if (updatedIncomingChars.split(' ').length < 10) {
        updatedIncomingChars +=' ' + generate();
      }
      setIncomingChars(updatedIncomingChars);
    }
    });


    return (
        <div>
            <Timer time={{minutes:0, seconds:10}} callback={(time)=>console.log('done')}/>
            {name} {number}
            <p className="Character">
                <span className="Character-out">
                    {(leftPadding + outgoingChars).slice(-20)}
                </span>
                <span className="Character-current">{currentChar}</span>
                <span>{incomingChars}</span>
            </p>
        </div>
    )
}

export default TypingModule