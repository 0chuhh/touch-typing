import React, { FC, useEffect, useState } from 'react'
import timeIcon from 'assets/time_icon.svg'
import keyboardIcon from 'assets/keyboard.svg'
import speedometerIcon from 'assets/speedometer.svg'
import accuracyIcon from 'assets/accuracy.svg'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2'
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Filler,
);
interface ResultFormProps {
    time: string // mm:ss
    charCount: number
    charPerMin: number
    accuracy: number
    datasets: { charsPerMin: number[], accuracy: number[], seconds: number[] }
    showContinueButton?: boolean
    onContinueClick: (event: React.MouseEvent) => void
    onResetClick: (event: React.MouseEvent) => void
    onCompleteClick?: (event: React.MouseEvent) => void
}
const ResultForm: FC<ResultFormProps> = ({
    time,
    charCount,
    charPerMin,
    accuracy,
    datasets,
    showContinueButton: showContinueButton = true,
    onContinueClick,
    onResetClick,
    onCompleteClick // this button is not used because it is intended to navigate to another page
}) => {



    return (
        <div className="result-form">
            <h3>Результат</h3>
            <div className="stats">
                <div className="stat">
                    <img width={42} src={timeIcon} alt="" />
                    <div>
                        <h6>Время</h6>
                        <b>{time}
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
            <Line
                style={{ maxHeight: '250px' }}
                options={{

                    elements: {
                        point: {
                            radius: 0
                        }
                    }

                }}
                data={{
                    labels: datasets.seconds,
                    datasets: [
                        {
                            data: datasets.charsPerMin,
                            backgroundColor: 'rgba(55, 173, 221, 0.2)',
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0.4,
                            fill: true
                        },
                        {
                            data: datasets.accuracy,
                            backgroundColor: 'rgba(194, 2, 2, 0.2)',
                            borderColor: 'rgba(194, 2, 2,1)',
                            tension: 0.4,
                            fill: true
                        },

                    ]
                }}

            />
            <div className="control-panel">
                {/* this button is not used because it is intended to navigate to another page */}
                <button onClick={onCompleteClick}>Завершить</button>
                {/* -------------------------------------------------------------------------- */}
                <button onClick={onResetClick}>Начать с начала</button>
                {
                    showContinueButton &&
                    <button onClick={onContinueClick} className='second-btn'>Продолжить</button>
                }
            </div>
        </div>
    )
}
export default ResultForm