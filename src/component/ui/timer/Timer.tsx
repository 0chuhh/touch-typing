import React, { FC, useEffect, useState, forwardRef, useImperativeHandle } from 'react'

export interface TimerStateType {
    seconds: number
    minutes: number
}

interface TimerProps {
    time: TimerStateType | 0, // 0 means no time limit, timer will not appear 
    onChange?: (time: TimerStateType) => void
    callback?: () => void
}

type TimerHandle = {
    startTimer: () => void,
    stopTimer:()=> void,
    resetTimer:()=> void,
    isTimerStarted:boolean
  }

const Timer = forwardRef<TimerHandle, TimerProps>(({ time, onChange, callback, }, ref) => {
    const [timerState, setTimerState] = useState<TimerStateType | 0>(time)

    const [isTimerStarted, setIsTimerStarted] = useState<boolean>(false);


    useEffect(() => {
        if (isTimerStarted && timerState) {
            setTimeout(() => {
                if (timerState.minutes === 0 && timerState.seconds === 0) {
                    callback && callback()
                    return
                }

                setTimerState({
                    minutes: timerState.seconds === 0 ? timerState.minutes - 1 : timerState.minutes,
                    seconds: timerState.seconds > 0 ? timerState.seconds - 1 : 59
                })
                onChange && onChange(timerState)
            }, 1000)
        }
    }, [timerState, isTimerStarted])

    // use ref to start and stop the timer

    useImperativeHandle(ref, () => ({
        startTimer() {
            setIsTimerStarted(true)
        },
        stopTimer() {
            setIsTimerStarted(false)
        },
        resetTimer() {
            this.stopTimer()
            setTimerState(time)
        },
        isTimerStarted
    }));

    if(!timerState) return null
    return (
        <h2>
            {timerState.minutes.toString().padStart(2,'0')}
            :{timerState.seconds.toString().padStart(2,'0')}
        </h2>
    )
})
export default Timer