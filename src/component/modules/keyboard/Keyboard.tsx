import React, { FC, useEffect, useState } from "react"
import KeyboardItem from "./keyboard-item/KeyboardItem"
import { keyboardKeys } from "./localization"


interface KeyboardProps {
    currentKey?: string
    lang: 'ru-RU' | 'en-US'
}
const Keyboard: FC<KeyboardProps> = ({ currentKey, lang }) => {
    const [isLeftShift, setIsLeftShift] = useState<boolean>(false)
    const [isRightShift, setIsRightShift] = useState<boolean>(false)

    useEffect(() => {
        if (currentKey === currentKey?.toUpperCase() && currentKey !== ' ' && currentKey !== '') {
            let currentZoneColor = document.querySelector('.current-key')?.classList[2].split('-')[0]
            console.log(currentZoneColor)
            switch (currentZoneColor) {
                case 'left':
                case 'blue':
                    setIsLeftShift(true)
                    setIsRightShift(false)
                    break;
                case 'right':
                case 'purpule':
                    setIsLeftShift(false)
                    setIsRightShift(true)
                    break
                default:
                    console.log('hui')
                    setIsLeftShift(false)
                    setIsRightShift(false)
            }
        } else {
            setIsLeftShift(false)
            setIsRightShift(false)
        }
    }, [currentKey])
    return (
        <div className="keyboard">
            {
                keyboardKeys[lang].map((row, rowIndex) =>

                    <div key={'row' + rowIndex} className="keyboard-row">
                        {
                            row.map((key, index) => {

                                switch (key) {
                                    case 'Backspace':
                                        return <KeyboardItem key={'key' + (index * rowIndex) + index} current={key.toLowerCase() === currentKey?.toLowerCase()} className="right-green-zone" style={{ width: '80px' }}>{key}</KeyboardItem>
                                    case '\\':
                                        return <KeyboardItem key={'key' + (index * rowIndex) + index} current={key.toLowerCase() === currentKey?.toLowerCase()} className="right-green-zone" style={{ width: '65px' }}>{key}</KeyboardItem>
                                    case 'Tab':
                                        return <KeyboardItem key={'key' + (index * rowIndex) + index} current={key.toLowerCase() === currentKey?.toLowerCase()} className="left-green-zone" style={{ width: '65px' }}>{key}</KeyboardItem>
                                    case 'Enter':
                                        return <KeyboardItem key={'key' + (index * rowIndex) + index} current={key.toLowerCase() === currentKey?.toLowerCase()} className="right-green-zone" style={{ width: '90px' }}>{key}</KeyboardItem>
                                    case 'Caps Lock':
                                        return <KeyboardItem key={'key' + (index * rowIndex) + index} current={key.toLowerCase() === currentKey?.toLowerCase()} className="left-green-zone" style={{ width: '80px' }}>{key}</KeyboardItem>
                                    case 'Shift ':
                                        return <KeyboardItem key={'key' + (index * rowIndex) + index} current={isLeftShift} className="left-green-zone" style={{ width: '110px' }}>{key}</KeyboardItem>
                                    case ' Shift':
                                        return <KeyboardItem key={'key' + (index * rowIndex) + index} current={isRightShift} className="right-green-zone" style={{ width: '110px' }}>{key}</KeyboardItem>
                                    case ' Ctrl':
                                    case 'Ctrl ':
                                    case 'Cmd':
                                    case 'Alt':
                                    case 'Menu':
                                        return <KeyboardItem key={'key' + (index * rowIndex) + index} current={key.toLowerCase() === currentKey?.toLowerCase()} style={{ width: '59px' }}>{key}</KeyboardItem>
                                    case ' ':
                                        return <KeyboardItem key={'key' + (index * rowIndex) + index} current={key.toLowerCase() === currentKey?.toLowerCase()} className="orange-zone" style={{ width: '100%' }}>{key}</KeyboardItem>
                                    default:

                                        switch (index) {
                                            case 0:
                                            case 1:
                                                return <KeyboardItem key={'key' + (index * rowIndex) + index} current={key.toLowerCase() === currentKey?.toLowerCase()} className="left-green-zone">{key}</KeyboardItem>
                                            case 2:
                                                return <KeyboardItem key={'key' + (index * rowIndex) + index} current={key.toLowerCase() === currentKey?.toLowerCase()} className="left-yellow-zone">{key}</KeyboardItem>
                                            case 8:
                                                return <KeyboardItem key={'key' + (index * rowIndex) + index} current={key.toLowerCase() === currentKey?.toLowerCase()} className="right-yellow-zone">{key}</KeyboardItem>
                                            case 3:
                                                return <KeyboardItem key={'key' + (index * rowIndex) + index} current={key.toLowerCase() === currentKey?.toLowerCase()} className="left-red-zone">{key}</KeyboardItem>
                                            case 9:
                                                return <KeyboardItem key={'key' + (index * rowIndex) + index} current={key.toLowerCase() === currentKey?.toLowerCase()} className="right-red-zone">{key}</KeyboardItem>
                                            case 4:
                                            case 5:
                                                return <KeyboardItem key={'key' + (index * rowIndex) + index} current={key.toLowerCase() === currentKey?.toLowerCase()} className="purpule-zone">{key}</KeyboardItem>
                                            case 6:
                                            case 7:
                                                return <KeyboardItem key={'key' + (index * rowIndex) + index} current={key.toLowerCase() === currentKey?.toLowerCase()} className="blue-zone">{key}</KeyboardItem>
                                            case 10:
                                            case 11:
                                            case 12:
                                            case 13:
                                                return <KeyboardItem key={'key' + (index * rowIndex) + index} current={key.toLowerCase() === currentKey?.toLowerCase()} className="right-green-zone">{key}</KeyboardItem>

                                            default:
                                                return <KeyboardItem key={'key' + (index * rowIndex) + index} current={key.toLowerCase() === currentKey?.toLowerCase()} className="red-zone">{key}</KeyboardItem>

                                        }
                                }
                            }
                            )
                        }
                    </div>
                )
            }
        </div>


    )
}
export default React.memo(Keyboard)