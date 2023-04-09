import React, { FC, useEffect, useState } from "react"
import KeyboardItem from "./keyboard-item/KeyboardItem"

const keys = [
    ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', "\\"],
    ['Caps Lock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter'],
    ['Shift ', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', ',', ' Shift'],
    ['Ctrl ', 'Cmd', 'Alt', ' ', 'Alt', 'Cmd', 'Menu', ' Ctrl']
]

interface KeyboardProps {
    currentKey?: string
}
const Keyboard: FC<KeyboardProps> = ({ currentKey }) => {

    return (
        <div className="keyboard">
            {
                keys.map((row, rowIndex) =>
                    <div key={'row' + rowIndex} className="keyboard-row">
                        {
                            row.map((key, index) => {
                                switch (key) {
                                    case 'Backspace':
                                        return <KeyboardItem key={'key'+(index*rowIndex)+index} current={key.toLowerCase() === currentKey?.toLowerCase()} className="green-zone" style={{ width: '80px' }}>{key}</KeyboardItem>
                                    case '\\':
                                        return <KeyboardItem key={'key'+(index*rowIndex)+index} current={key.toLowerCase() === currentKey?.toLowerCase()} className="green-zone" style={{ width: '65px' }}>{key}</KeyboardItem>
                                    case 'Tab':
                                        return <KeyboardItem key={'key'+(index*rowIndex)+index} current={key.toLowerCase() === currentKey?.toLowerCase()} className="green-zone" style={{ width: '65px' }}>{key}</KeyboardItem>
                                    case 'Enter':
                                        return <KeyboardItem key={'key'+(index*rowIndex)+index} current={key.toLowerCase() === currentKey?.toLowerCase()} className="green-zone" style={{ width: '90px' }}>{key}</KeyboardItem>
                                    case 'Caps Lock':
                                        return <KeyboardItem key={'key'+(index*rowIndex)+index} current={key.toLowerCase() === currentKey?.toLowerCase()} className="green-zone" style={{ width: '80px' }}>{key}</KeyboardItem>
                                    case 'Shift ':
                                        return <KeyboardItem key={'key'+(index*rowIndex)+index} current={currentKey === currentKey?.toUpperCase() && currentKey !== ' ' && currentKey !== ''} className="green-zone" style={{ width: '110px' }}>{key}</KeyboardItem>
                                    case ' Shift':
                                        return <KeyboardItem key={'key'+(index*rowIndex)+index} current={key.toLowerCase() === currentKey?.toLowerCase()} className="green-zone" style={{ width: '110px' }}>{key}</KeyboardItem>
                                    case ' Ctrl':
                                    case 'Ctrl ':
                                    case 'Cmd':
                                    case 'Alt':
                                    case 'Menu':
                                        return <KeyboardItem key={'key'+(index*rowIndex)+index} current={key.toLowerCase() === currentKey?.toLowerCase()} style={{ width: '59px' }}>{key}</KeyboardItem>
                                    case ' ':
                                        return <KeyboardItem key={'key'+(index*rowIndex)+index} current={key.toLowerCase() === currentKey?.toLowerCase()} className="orange-zone" style={{ width: '100%' }}>{key}</KeyboardItem>
                                    default:

                                        switch (index) {
                                            case 0:
                                            case 1:
                                                return <KeyboardItem key={'key'+(index*rowIndex)+index} current={key.toLowerCase() === currentKey?.toLowerCase()} className="green-zone">{key}</KeyboardItem>
                                            case 2:
                                            case 8:
                                                return <KeyboardItem key={'key'+(index*rowIndex)+index} current={key.toLowerCase() === currentKey?.toLowerCase()} className="yellow-zone">{key}</KeyboardItem>
                                            case 3:
                                            case 9:
                                                return <KeyboardItem key={'key'+(index*rowIndex)+index} current={key.toLowerCase() === currentKey?.toLowerCase()} className="red-zone">{key}</KeyboardItem>
                                            case 4:
                                            case 5:
                                                return <KeyboardItem key={'key'+(index*rowIndex)+index} current={key.toLowerCase() === currentKey?.toLowerCase()} className="purpule-zone">{key}</KeyboardItem>
                                            case 6:
                                            case 7:
                                                return <KeyboardItem key={'key'+(index*rowIndex)+index} current={key.toLowerCase() === currentKey?.toLowerCase()} className="blue-zone">{key}</KeyboardItem>
                                            case 10:
                                            case 11:
                                            case 12:
                                            case 13:
                                                return <KeyboardItem key={'key'+(index*rowIndex)+index} current={key.toLowerCase() === currentKey?.toLowerCase()} className="green-zone">{key}</KeyboardItem>

                                            default:
                                                return <KeyboardItem key={'key'+(index*rowIndex)+index} current={key.toLowerCase() === currentKey?.toLowerCase()} className="red-zone">{key}</KeyboardItem>

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
export default Keyboard