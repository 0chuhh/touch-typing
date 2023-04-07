import React, {FC, useEffect} from 'react'

export interface TimerStateType{
    time: number
    seconds: number
    minutes: number
}

interface TimerProps{
    setTime: React.Dispatch<React.SetStateAction<TimerStateType>>
    time: TimerStateType
}

const Timer:FC<TimerProps> = ({setTime, time}) =>{

    useEffect(()=>{
        setTimeout(()=>{
            if(time.time === 0) return

            setTime({
                time: time.time-1,
                minutes: Math.floor((time.time - 1 ) / 60),
                seconds: time.time - Math.floor((time.time - 1) / 60) * 60 - 1
            })
        },1000)
    },[time.time])

    return(
        <h2>
            {time.minutes <= 10? `0${time.minutes}`:time.minutes}:{time.seconds <= 10? `0${time.seconds}`: time.seconds}
        </h2>
    )
} 
export default Timer