import React, {FC, useEffect, useState} from 'react'

export interface TimerStateType{
    seconds: number
    minutes: number
}

interface TimerProps{
    time: TimerStateType,
    callback?: (time:TimerStateType) => void
}

const Timer:FC<TimerProps> = ({time, callback}) =>{
    const [timerState, setTimerState] = useState<TimerStateType>(time)


    useEffect(()=>{
        setTimeout(()=>{
            if(timerState.minutes === 0 && timerState.seconds === 0){
                callback && callback(timerState)
                return
            }  

            setTimerState({
                minutes: timerState.seconds === 0? timerState.minutes - 1: timerState.minutes,
                seconds: timerState.seconds>0? timerState.seconds - 1 : 59
            })
        },1000)
    },[timerState])

    return(
        <h2>
            {timerState.minutes < 10? `0${timerState.minutes}`:timerState.minutes}
            :{timerState.seconds < 10? `0${timerState.seconds}`: timerState.seconds}
        </h2>
    )
} 
export default Timer