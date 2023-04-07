import React, { useState, FC, useRef, ElementRef } from 'react';
import useKeyPress from 'hooks/useKeyPress';
import Timer, { TimerStateType } from 'component/ui/timer/Timer';
import Modal from 'component/ui/modal/Modal';
import { currentTime } from 'utils/Time';
import ResultForm from '../result-form/ResultForm';


interface TypingModuleProps {
    classNum: number
    className: string
    text: string
    maxTime: number
    repeat?: boolean
}
const TypingModule: FC<TypingModuleProps> = ({ classNum = 1, className = 'урок', text = 'Hello world!', repeat = true }) => {
    type TimerHandle = ElementRef<typeof Timer>
    const timerRef = useRef<TimerHandle>(null)
    const [leftPadding, setLeftPadding] = useState(
        new Array(20).fill(' ').join(''),
    );
    const [outgoingChars, setOutgoingChars] = useState<string>('')
    const [currentChar, setCurrentChar] = useState<string>(text.charAt(0))
    const [incomingChars, setIncomingChars] = useState<string>(text.substring(1))

    const [isTextShowed, setIsTextShowed] = useState<boolean>(false)
    const [isModalResultOpen, setSIsModalResultOpen] = useState<boolean>(false)

    const [startTime, setStartTime] = useState<number>(0)
    const [charCount, setCharCount] = useState<number>(0)
    const [wrongCharCount, setWrongCharCount] = useState<number>(0)
    const [charPerMin, setcharPerMin] = useState<number>(0)


    const OnKeysPressed = () => {
        let updatedOutgoingChars = outgoingChars;
        let updatedIncomingChars = incomingChars;

        if (!startTime) {
            setStartTime(currentTime());
        }
        const durationInMinutes = (currentTime() - startTime) / 60000.0;
        if (leftPadding.length > 0) {
            setLeftPadding(leftPadding.substring(1));
        }
        updatedOutgoingChars += currentChar;
        setOutgoingChars(updatedOutgoingChars);
        setCurrentChar(incomingChars.charAt(0));
        updatedIncomingChars = incomingChars.substring(1);
        if (updatedIncomingChars.split(' ').length < 10) {
            // updatedIncomingChars += ' ' + generate();
        }
        setIncomingChars(updatedIncomingChars);

        setCharCount(prev => prev + 1)
        setcharPerMin(Number.parseFloat(((charCount + 1) / durationInMinutes).toFixed(2)));

    }

    useKeyPress(key => {
        switch (key) {
            case 'Enter':
                if (!timerRef.current?.isTimerStarted) {
                    timerRef.current?.startTimer()
                    setIsTextShowed(true)
                }
                break;
            case 'Escape':
                setSIsModalResultOpen(prev => !prev)
                if(timerRef.current?.isTimerStarted){
                    timerRef.current?.stopTimer()
                }
                break;
            default:
                if (key === currentChar) {
                    OnKeysPressed()
                }else{
                    setWrongCharCount(prev=>prev+1)
                }
                break;
        }
    });


    return (
        <div>
            {charCount}
            <Modal open={isModalResultOpen}>
                <ResultForm time={{minutes:10, seconds:43}} charCount={charCount} charPerMin={charPerMin} accuracy={Math.floor((charCount*100)/(charCount+wrongCharCount))}/>
            </Modal>

            <Timer ref={timerRef} time={{ minutes: 1, seconds: 10 }} callback={() => console.log('done')} />
            {classNum} {className}
            {
                isTextShowed ?
                    <p className="Character">
                        <span className="Character-out">
                            {(leftPadding + outgoingChars).slice(-20)}
                        </span>
                        <span className="Character-current">{currentChar}</span>
                        <span>{incomingChars}</span>
                    </p>
                    :
                    <div>
                        type enter to start
                    </div>
            }
        </div>
    )
}

export default TypingModule