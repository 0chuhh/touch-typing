import React, { useState, FC, useRef, ElementRef, useEffect } from 'react';
import useKeyPress from 'hooks/useKeyPress';
import Timer, { TimerStateType } from 'component/ui/timer/Timer';
import Modal from 'component/ui/modal/Modal';
import { currentTime } from 'utils/Time';
import ResultForm from '../result-form/ResultForm';
import LineMode from './line-mode/LineMode';
import BlockMode from './block-mode/BlockMode';
import Keyboard from 'component/modules/keyboard/Keyboard';
import Hands from '../hands/Hands';
import { languageType } from 'types/language';


interface TypingModuleProps {
    classNum: number
    className: string
    text: string
    maxTime?: { minutes: number, seconds: number } | 0 // 0 means no time limit, timer will not appear 
    repeat?: boolean
    language?: languageType
    callback?: (dataset: { charsPerMin: number, charsCount: number, mistakesCount: number, mistakes: string[] }) => void  // do smth with accumulated data
}
const TypingModule: FC<TypingModuleProps> = ({ classNum = 1, className = 'урок', text = 'Hello world!', maxTime = 0, repeat = true, language= 'ru-RU', callback }) => {
    type TimerHandle = ElementRef<typeof Timer>
    const timerRef = useRef<TimerHandle>(null)
    const [leftPadding, setLeftPadding] = useState<string>(
        new Array(20).fill(' ').join(''),
    );
    const [outgoingChars, setOutgoingChars] = useState<string>('')
    const [currentChar, setCurrentChar] = useState<string>(text.charAt(0))
    const [incomingChars, setIncomingChars] = useState<string>(text.substring(1))

    const [mode, setMode] = useState<'line' | 'block'>('line')
    const [currentWordIndex, setCurrentWordIndex] = useState<number>(0)
    const [currentCharIndex, setCurrentCharIndex] = useState<number>(0)

    const [isTextShowed, setIsTextShowed] = useState<boolean>(false)
    const [isModalResultOpen, setIsModalResultOpen] = useState<boolean>(false)

    const [charCount, setCharCount] = useState<number>(0)
    const [wrongCharCount, setWrongCharCount] = useState<number>(0)

    const [charPerMin, setcharPerMin] = useState<number>(0)
    const [spentTime, setSpentTime] = useState<string>('00:00')
    const [spentSeconds, setSpentSeconds] = useState<number>(0)
    const [accuracy, setAccuracy] = useState<number>(0)
    const [mistakes, setMistakes] = useState<string[]>([])

    const [datasets, setDatasets] = useState<{ charsPerMin: number[], accuracy: number[], seconds: number[] }>({ charsPerMin: [], accuracy: [], seconds: [] })

    const [isTimesUp, setIsTimesUp] = useState<boolean>(false)

    const blockRef = useRef<HTMLParagraphElement | null>(null);

    const OnKeysPressedKey = (key: string) => {
        let updatedOutgoingChars = outgoingChars;
        let updatedIncomingChars = incomingChars;



        if (leftPadding.length > 0) {
            setLeftPadding(leftPadding.substring(1));
        }
        if (key === ' ' && currentChar === ' ') {
            setCurrentWordIndex(prev => prev + 1)
            setCurrentCharIndex(0)
        } else {
            setCurrentCharIndex(prev => prev + 1)
        }

        blockRef.current?.querySelector('.current-word')?.scrollIntoView({ behavior: 'smooth' })

        updatedOutgoingChars += currentChar;
        setOutgoingChars(updatedOutgoingChars);
        setCurrentChar(incomingChars.charAt(0));
        updatedIncomingChars = incomingChars.substring(1);
        if (repeat && updatedIncomingChars.split(' ').length < 10) {
            updatedIncomingChars += ' ' + text;
        }
        if (!repeat && incomingChars.length === 0) {
            endLesson()
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
                if (isTextShowed && !isModalResultOpen && key.length === 1) {
                    if (key === currentChar) {
                        if (!timerRef.current?.isTimerStarted && !isModalResultOpen) {
                            timerRef.current?.startTimer()
                        }
                        OnKeysPressedKey(key)
                    } else {
                        setWrongCharCount(prev => prev + 1)
                        setMistakes(prev => [...prev, key])
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
            let newAccuracy = Math.floor((charCount / (charCount + wrongCharCount)) * 100)
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
        setCurrentWordIndex(0)
        setCurrentCharIndex(0)
    }

    const endLesson = () => {
        toogleResultModal()
        setIsTimesUp(true)
        let data = {
            charsPerMin: charPerMin,
            charsCount: charCount + 1,
            mistakesCount: wrongCharCount,
            mistakes: mistakes
        }
        callback && callback(data)
    }

    useEffect(() => {
        let newCharPerMin = Number.parseInt(((charCount) / ((spentSeconds + 1) / 60)).toFixed(2))
        changeAccuracy()
        setcharPerMin(newCharPerMin);
    }, [charCount, wrongCharCount])



    return (
        <div className='module-container'>
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


            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#fff' }}>
                <div>{classNum} {className}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span>Осталось времени</span>
                    <Timer onChange={(time) => onTimerChange(time.minutes, time.seconds)} ref={timerRef} time={maxTime} callback={endLesson} />


                    <button tabIndex={-1} onKeyDown={e => { if (e.key === ' ') e.preventDefault() }} onClick={() => {
                        setMode(prev => prev === 'line' ? 'block' : 'line')
                        blockRef.current?.querySelector('.current-word')?.scrollIntoView({ behavior: 'smooth' })
                    }}>режим</button>
                    <div>{mode === 'line' ? 'Строка' : 'Блок'}</div>
                </div>
            </div>
            {
                isTextShowed ?
                    mode === 'line'
                        ?
                        <LineMode
                            leftPadding={leftPadding}
                            outgoingChars={outgoingChars}
                            currentChar={currentChar}
                            incomingChars={incomingChars}
                        />
                        :
                        mode === 'block'
                        &&
                        <BlockMode
                            blockRef={blockRef}
                            currentCharIndex={currentCharIndex}
                            currentWordIndex={currentWordIndex}
                            text={text}
                        />
                    :
                    <div className='lesson-text-field'>
                        Нажмите Enter Чтобы начать
                    </div>
            }
            <div className="keyboard-container">
                <Keyboard language={language} currentKey={isTextShowed ? currentChar : ''} />
                <Hands currentKey={isTextShowed ? currentChar : ''}/>
            </div>
        </div>
    )
}

export default TypingModule