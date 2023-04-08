import React, { useState, FC, useRef, ElementRef, useEffect } from 'react';
import useKeyPress from 'hooks/useKeyPress';
import Timer, { TimerStateType } from 'component/ui/timer/Timer';
import Modal from 'component/ui/modal/Modal';
import { currentTime } from 'utils/Time';
import ResultForm from '../result-form/ResultForm';


interface TypingModuleProps {
    classNum: number
    className: string
    text: string
    maxTime?: { minutes: number, seconds: number } | 0 // 0 means no time limit, timer will not appear 
    repeat?: boolean
}
const TypingModule: FC<TypingModuleProps> = ({ classNum = 1, className = 'урок', text = 'Hello world!', maxTime = 0, repeat = true }) => {
    type TimerHandle = ElementRef<typeof Timer>
    const timerRef = useRef<TimerHandle>(null)
    const [leftPadding, setLeftPadding] = useState(
        new Array(20).fill(' ').join(''),
    );
    const [outgoingChars, setOutgoingChars] = useState<string>('')
    const [currentChar, setCurrentChar] = useState<string>(text.charAt(0))
    const [incomingChars, setIncomingChars] = useState<string>(text.substring(1))

    const [isTextShowed, setIsTextShowed] = useState<boolean>(false)
    const [isModalResultOpen, setIsModalResultOpen] = useState<boolean>(false)

    const [charCount, setCharCount] = useState<number>(0)
    const [wrongCharCount, setWrongCharCount] = useState<number>(0)

    const [charPerMin, setcharPerMin] = useState<number>(0)
    const [spentTime, setSpentTime] = useState<string>('00:00')
    const [spentSeconds, setSpentSeconds] = useState<number>(0)
    const [accuracy, setAccuracy] = useState<number>(0)

    const [datasets, setDatasets] = useState<{ charsPerMin: number[], accuracy: number[], seconds: number[] }>({ charsPerMin: [], accuracy: [], seconds: [] })

    const [isTimesUp, setIsTimesUp] = useState<boolean>(false)

    const OnKeysPressed = () => {
        let updatedOutgoingChars = outgoingChars;
        let updatedIncomingChars = incomingChars;



        if (leftPadding.length > 0) {
            setLeftPadding(leftPadding.substring(1));
        }
        updatedOutgoingChars += currentChar;
        setOutgoingChars(updatedOutgoingChars);
        setCurrentChar(incomingChars.charAt(0));
        updatedIncomingChars = incomingChars.substring(1);
        if (repeat && updatedIncomingChars.split(' ').length < 10) {
            updatedIncomingChars += ' ' + text;
        }
        setIncomingChars(updatedIncomingChars);

        setCharCount(prev => prev + 1)
    }

    const toogleResultModal = () => {
        setIsModalResultOpen(prev => !prev)
        if (timerRef.current?.isTimerStarted) {
            timerRef.current?.stopTimer()
            changeSpentTime()
        }
    }

    useKeyPress(key => {
        switch (key) {
            case 'Enter':
                if (!timerRef.current?.isTimerStarted && !isModalResultOpen) {
                    timerRef.current?.startTimer()
                    setIsTextShowed(true)
                }
                break;
            case 'Escape':
                toogleResultModal()
                break;
            default:
                if (isTextShowed && !isModalResultOpen) {
                    if (key === currentChar) {
                        if (!timerRef.current?.isTimerStarted && !isModalResultOpen) {
                            timerRef.current?.startTimer()
                        }
                        OnKeysPressed()
                    } else {
                        setWrongCharCount(prev => prev + 1)
                    }
                }
                break;
        }
    });

    const changeSpentTime = () => {
        setSpentTime(`${(Math.floor(spentSeconds / 60)).toString().padStart(2, '0')}:${((spentSeconds + 1) % 60).toString().padStart(2, '0')}`)
    }


    const onTimerChange = (minutes: number, seconds: number) => {
        setSpentSeconds(prev => prev + 1)
        setDatasets(prev => ({
            charsPerMin: [...prev.charsPerMin, charPerMin],
            accuracy: [...prev.accuracy, accuracy !== 0 ? 100 - accuracy : 0],
            seconds: [...prev.seconds, spentSeconds + 1]
        }))

    }

    const changeAccuracy = () => {
        if (charCount || wrongCharCount) {
            let newAccuracy = Math.floor((charCount * 100) / (charCount + wrongCharCount))
            setAccuracy(newAccuracy)

        }
    }


    const resetLesson = () => {
        timerRef.current?.resetTimer()
        setIncomingChars(text.substring(1))
        setCurrentChar(text.charAt(0))
        setOutgoingChars('')
        setAccuracy(0)
        setCharCount(0)
        setIsTextShowed(false)
        setWrongCharCount(0)
        setDatasets({ charsPerMin: [], accuracy: [], seconds: [] })
        setSpentTime('00:00')
        setSpentSeconds(0)
        toogleResultModal()
        setIsTimesUp(false)
    } 

    useEffect(() => {
        let newCharPerMin = Number.parseInt(((charCount) / ((spentSeconds + 1) / 60)).toFixed(2))
        changeAccuracy()
        setcharPerMin(newCharPerMin);
    }, [charCount, wrongCharCount])

    return (
        <div className='module-container'>
            {charCount}
            <Modal open={isModalResultOpen}>
                <ResultForm
                    time={spentTime}
                    charCount={charCount}
                    charPerMin={charPerMin}
                    accuracy={accuracy}
                    datasets={datasets}
                    showContinueButton={!isTimesUp}
                    onContinueClick={toogleResultModal}
                    onResetClick={resetLesson}
                />
            </Modal>

            <Timer onChange={(time) => onTimerChange(time.minutes, time.seconds)} ref={timerRef} time={maxTime} callback={()=>{
                toogleResultModal()
                setIsTimesUp(true)
            }} />
            {classNum} {className}
            {
                isTextShowed ?
                    <p className="lesson-text-field">
                        <span className="Character-out">
                            {(leftPadding + outgoingChars).slice(-20)}
                        </span>
                        <span className="Character-current">{currentChar}</span>
                        <span>{incomingChars.substring(0, 20)}</span>
                    </p>
                    :
                    <div>
                        Нажмите Enter Чтобы начать
                    </div>
            }
        </div>
    )
}

export default TypingModule