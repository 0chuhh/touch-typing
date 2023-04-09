import { FC, useEffect, useState } from "react"
import leftHand from 'assets/left-hand.svg'
import rightHand from 'assets/right-hand.svg'


const leftGreenZone = ['ё', '1', 'Tab', 'й', 'Caps Lock', 'ф', 'Shift ', 'я']
const leftYellowZone = ['2', 'ц', 'ы', 'ч',]
const leftRedZone = ['3', 'у', 'в', 'с',]
const leftPurpuleZone = ['4', '5', 'к', 'е', 'а', 'п', 'м', 'и']

const rightGreenZone = ['0', '-', '=', 'Backspace', 'ж', 'э', 'Enter', 'х', 'ъ', "\\", ',', ' Shift', 'з']
const rightYellowZone = ['8', 'ш', 'л', 'б',]
const rightRedZone = ['9', 'д', 'ю', 'щ']
const rightBlueZone = ['6', '7', 'н', 'г', 'р', 'о', 'т', 'ь']

interface HandsProps {
    currentKey?: string
}
const Hands: FC<HandsProps> = ({ currentKey }) => {
    const [leftDotPosition, setLeftDotPosition] = useState<{ top: string, left: string } | undefined>(undefined)
    const [rightDotPosition, setRightDotPosition] = useState<{ top: string, left: string } | undefined>(undefined)

    useEffect(() => {
        if (currentKey) {

            if (leftGreenZone.includes(currentKey.toLocaleLowerCase())) {
                setLeftDotPosition({ top: '90px', left: '38px' })
            } else if (leftYellowZone.includes(currentKey.toLocaleLowerCase())) {
                setLeftDotPosition({ top: '90px', left: '67px' })
            } else if (leftRedZone.includes(currentKey.toLocaleLowerCase())) {
                setLeftDotPosition({ top: '90px', left: '95px' })
            } else if (leftPurpuleZone.includes(currentKey.toLocaleLowerCase())) {
                setLeftDotPosition({ top: '90px', left: '124px' })
            } else if (currentKey === ' ') {
                setLeftDotPosition({ top: '140px', left: '154px' })
            } else {
                setLeftDotPosition(undefined)
            }

            if (rightGreenZone.includes(currentKey.toLocaleLowerCase())) {
                setRightDotPosition({ top: '90px', left: '153px' })
            } else if (rightRedZone.includes(currentKey.toLocaleLowerCase())) {
                setRightDotPosition({ top: '90px', left: '123px' })
            } else if (rightYellowZone.includes(currentKey.toLocaleLowerCase())) {
                setRightDotPosition({ top: '90px', left: '93px' })
            } else if (rightBlueZone.includes(currentKey.toLocaleLowerCase())) {
                setRightDotPosition({ top: '90px', left: '66px' })
            } else {
                setRightDotPosition(undefined)
            }
        }
    }, [currentKey])
    return (
        <div style={{
            width: '100%',
            height: 'max-content',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            marginTop: '50px'
        }}>
            <div className="hand" style={{
                backgroundImage: `url(${leftHand})`,
                backgroundSize: 'cover',
                width: '200px',
                height: '200px',
                position: 'relative'
            }}>
                <div style={{
                    display: leftDotPosition === undefined ? 'none' : 'block',
                    position: 'absolute', width: '10px',
                    height: '10px',
                    background: 'red',
                    borderRadius: '50%',
                    top: leftDotPosition?.top,
                    left: leftDotPosition?.left,
                    transition:'all 0.3s ease'
                }}>

                </div>
            </div>
            <div className="hand" style={{
                backgroundImage: `url(${rightHand})`,
                backgroundSize: 'cover',
                width: '200px',
                height: '200px',
                position: 'relative'
            }}>
                <div style={{
                    display: rightDotPosition === undefined ? 'none' : 'block',
                    position: 'absolute', width: '10px',
                    height: '10px',
                    background: 'red',
                    borderRadius: '50%',
                    top: rightDotPosition?.top,
                    left: rightDotPosition?.left,
                    transition:'all 0.3s ease'

                }}>

                </div>
            </div>
        </div>
    )
}
export default Hands