import React, { FC } from 'react'
import timeIcon from 'assets/time_icon.svg'
import keyboardIcon from 'assets/keyboard.svg'
import speedometerIcon from 'assets/speedometer.svg'
import accuracyIcon from 'assets/accuracy.svg'
import { Line } from 'react-chartjs-2';

interface ResultFormProps {
    time: { minutes: number, seconds: number }
    charCount: number
    charPerMin: number
    accuracy?: number
}
const ResultForm: FC<ResultFormProps> = ({ time, charCount, charPerMin, accuracy }) => {
    return (
        <div className="result-form">
            <h3>Результат</h3>
            <div className="stats">
                <div className="stat">
                    <img width={42} src={timeIcon} alt="" />
                    <div>
                        <h6>Время</h6>
                        <b>{time.minutes < 10 ? `0${time.minutes}` : time.minutes}
                            :
                            {time.seconds < 10 ? `0${time.seconds}` : time.seconds}
                        </b>
                    </div>
                </div>
                <div className="stat">
                    <img width={42} src={keyboardIcon} alt="" />
                    <div>
                        <h6>Набрано</h6>
                        <b>{charCount} </b>
                        <small>зн</small>
                    </div>
                </div>
                <div className="stat">
                    <img width={42} src={speedometerIcon} alt="" />
                    <div>
                        <h6>Скорость</h6>
                        <b>{charPerMin} </b>
                        <small>зн/м</small>

                    </div>
                </div>
                <div className="stat">
                    <img width={42} src={accuracyIcon} alt="" />
                    <div>
                        <h6>Точность</h6>
                        <b>{accuracy} %</b>
                    </div>
                </div>

            </div>
            {/* <Line
                options={...}
                data={...}
                {...props}
            /> */}
        </div>
    )
}
export default ResultForm