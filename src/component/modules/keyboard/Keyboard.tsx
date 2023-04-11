import React, { FC, forwardRef, useEffect, useLayoutEffect, useState } from "react"
import KeyboardItem from "./keyboard-item/KeyboardItem"
import { keyboardKeys } from "./localization"
import { languageType } from "types/language"
import { useAppDispatch, useAppSelector } from "hooks/redux"
import { keyboardSlice } from "store/reducers/keyboard/KeyboardSlice"


interface KeyboardProps {
    currentKey?: string
    language?: languageType
}


const Keyboard:FC<KeyboardProps> = ({ currentKey, language = 'ru-RU' }) => {
    const [currentLang, setCurrentLang] = useState<languageType>(language)
    const dispatch = useAppDispatch()
    const keyboard = useAppSelector(state => state.keyboardReducer)
    const checkLanguage = (char: string) => {
        var ruRegexp = /[а-яё]/i;
        var enRegexp = /[a-z\s]/i;
        if (ruRegexp.test(char)) setCurrentLang('ru-RU')
        if (enRegexp.test(char)) setCurrentLang('en-US')
    }


    useLayoutEffect(() => {
        
        if (currentKey && currentKey !== ' ') checkLanguage(currentKey)

        dispatch(keyboardSlice.actions.resetCurrentKeyZone())

    }, [currentKey])

    useEffect(() => {

        if (currentKey) {

            if (currentKey === currentKey?.toUpperCase() && currentKey !== ' ' && currentKey !== '') {
                let currentZoneColor = keyboard.currentKeyZone.split('-')[0]
                switch (currentZoneColor) {
                    case 'left':
                    case 'purpule':
                        dispatch(keyboardSlice.actions.turnOnRightShift())
                        break;
                    case 'right':
                    case 'blue':
                        dispatch(keyboardSlice.actions.turnOnLeftShift())

                        break
                    default:
                        dispatch(keyboardSlice.actions.turnOffLeftAndRightShift())
                }
            } else {
                dispatch(keyboardSlice.actions.turnOffLeftAndRightShift())
            }
        }
    }, [keyboard.currentKeyZone])


    return (
        <div className="keyboard">
            {
                keyboardKeys[currentLang].map((row, rowIndex) =>

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
                                        return <KeyboardItem key={'key' + (index * rowIndex) + index} current={keyboard.leftShift} className="left-green-zone" style={{ width: '110px' }}>{key}</KeyboardItem>
                                    case ' Shift':
                                        return <KeyboardItem key={'key' + (index * rowIndex) + index} current={keyboard.rightShift} className="right-green-zone" style={{ width: '110px' }}>{key}</KeyboardItem>
                                    case ' Ctrl':
                                    case 'Ctrl ':
                                    case 'Cmd':
                                    case 'Alt':
                                    case 'Menu':
                                        return <KeyboardItem key={'key' + (index * rowIndex) + index} current={key.toLowerCase() === currentKey?.toLowerCase()} style={{ width: '59px' }}>{key}</KeyboardItem>
                                    case ' ':
                                        if (key.toLowerCase() === currentKey?.toLowerCase())
                                            dispatch(keyboardSlice.actions.setCurrentKeyZone('orange-zone'))
                                        return <KeyboardItem key={'key' + (index * rowIndex) + index} current={key.toLowerCase() === currentKey?.toLowerCase()} className="orange-zone" style={{ width: '100%' }}>{key}</KeyboardItem>
                                    default:

                                        switch (index) {
                                            case 0:
                                            case 1:
                                                if (key.toLowerCase() === currentKey?.toLowerCase())
                                                    dispatch(keyboardSlice.actions.setCurrentKeyZone('left-green-zone'))
                                                return <KeyboardItem key={'key' + (index * rowIndex) + index} current={key.toLowerCase() === currentKey?.toLowerCase()} className="left-green-zone">{key}</KeyboardItem>
                                            case 2:
                                                if (key.toLowerCase() === currentKey?.toLowerCase())
                                                    dispatch(keyboardSlice.actions.setCurrentKeyZone('left-yellow-zone'))
                                                return <KeyboardItem key={'key' + (index * rowIndex) + index} current={key.toLowerCase() === currentKey?.toLowerCase()} className="left-yellow-zone">{key}</KeyboardItem>
                                            case 8:
                                                if (key.toLowerCase() === currentKey?.toLowerCase())
                                                    dispatch(keyboardSlice.actions.setCurrentKeyZone('right-yellow-zone'))

                                                return <KeyboardItem key={'key' + (index * rowIndex) + index} current={key.toLowerCase() === currentKey?.toLowerCase()} className="right-yellow-zone">{key}</KeyboardItem>
                                            case 3:
                                                if (key.toLowerCase() === currentKey?.toLowerCase())
                                                    dispatch(keyboardSlice.actions.setCurrentKeyZone('left-red-zone'))

                                                return <KeyboardItem key={'key' + (index * rowIndex) + index} current={key.toLowerCase() === currentKey?.toLowerCase()} className="left-red-zone">{key}</KeyboardItem>
                                            case 9:
                                                if (key.toLowerCase() === currentKey?.toLowerCase())
                                                    dispatch(keyboardSlice.actions.setCurrentKeyZone('right-red-zone'))

                                                return <KeyboardItem key={'key' + (index * rowIndex) + index} current={key.toLowerCase() === currentKey?.toLowerCase()} className="right-red-zone">{key}</KeyboardItem>
                                            case 4:
                                            case 5:
                                                if (key.toLowerCase() === currentKey?.toLowerCase())
                                                    dispatch(keyboardSlice.actions.setCurrentKeyZone('purpule-zone'))
                                                return <KeyboardItem key={'key' + (index * rowIndex) + index} current={key.toLowerCase() === currentKey?.toLowerCase()} className="purpule-zone">{key}</KeyboardItem>
                                            case 6:
                                            case 7:
                                                if (key.toLowerCase() === currentKey?.toLowerCase())
                                                    dispatch(keyboardSlice.actions.setCurrentKeyZone('blue-zone'))

                                                return <KeyboardItem key={'key' + (index * rowIndex) + index} current={key.toLowerCase() === currentKey?.toLowerCase()} className="blue-zone">{key}</KeyboardItem>
                                            case 10:
                                            case 11:
                                            case 12:
                                            case 13:
                                                if (key.toLowerCase() === currentKey?.toLowerCase())
                                                    dispatch(keyboardSlice.actions.setCurrentKeyZone('right-green-zone'))

                                                return <KeyboardItem key={'key' + (index * rowIndex) + index} current={key.toLowerCase() === currentKey?.toLowerCase()} className="right-green-zone">{key}</KeyboardItem>

                                            default:
                                                if (key.toLowerCase() === currentKey?.toLowerCase())
                                                    dispatch(keyboardSlice.actions.setCurrentKeyZone('left-red-zone'))

                                                return <KeyboardItem key={'key' + (index * rowIndex) + index} current={key.toLowerCase() === currentKey?.toLowerCase()} className="left-red-zone">{key}</KeyboardItem>

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