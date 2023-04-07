import React, { FC, useEffect, useState, forwardRef, useImperativeHandle } from 'react'

export interface TimerStateType {
    seconds: number
    minutes: number
}

interface TimerProps {
    time: TimerStateType,
    onChange?: (time: TimerStateType) => void
    callback?: () => void
}

type TimerHandle = {
    startTimer: () => void,
    stopTimer:()=> void,
    isTimerStarted:boolean
  }

const Timer = forwardRef<TimerHandle, TimerProps>(({ time, onChange, callback, }, ref) => {
    const [timerState, setTimerState] = useState<TimerStateType>(time)

    const [isTimerStarted, setIsTimerStarted] = useState<boolean>(false);


    useEffect(() => {
        if (isTimerStarted) {
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
        isTimerStarted
    }));


    return (
        <h2>
            {timerState.minutes < 10 ? `0${timerState.minutes}` : timerState.minutes}
            :{timerState.seconds < 10 ? `0${timerState.seconds}` : timerState.seconds}
        </h2>
    )
})
export default Timer