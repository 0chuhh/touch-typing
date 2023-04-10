import { FC, useEffect, useState } from "react"
import leftHand from 'assets/left-hand.svg'
import rightHand from 'assets/right-hand.svg'

interface HandsProps {
    currentKey?: string
}
const Hands: FC<HandsProps> = ({ currentKey }) => {
    const [leftDotPosition, setLeftDotPosition] = useState<{ top: string, left: string } | undefined>(undefined)
    const [rightDotPosition, setRightDotPosition] = useState<{ top: string, left: string } | undefined>(undefined)

    useEffect(() => {
        if (currentKey) {
            let currentZoneColor = document.querySelector('.current-key')?.classList[2]

            switch(currentZoneColor){
                case 'left-green-zone':
                    setLeftDotPosition({ top: '90px', left: '38px' })
                    setRightDotPosition(undefined)
                    break;
                case 'right-green-zone':
                    setRightDotPosition({ top: '90px', left: '153px' })
                    setLeftDotPosition(undefined)
                    break;
                case 'left-yellow-zone':
                    setLeftDotPosition({ top: '90px', left: '67px' })
                    setRightDotPosition(undefined)
                    break;
                case 'right-yellow-zone':
                    setRightDotPosition({ top: '90px', left: '93px' })
                    setLeftDotPosition(undefined)
                    break;
                case 'left-red-zone':
                    setLeftDotPosition({ top: '90px', left: '95px' })
                    setRightDotPosition(undefined)
                    break;
                case 'right-red-zone':
                    setRightDotPosition({ top: '90px', left: '123px' })
                    setLeftDotPosition(undefined)
                    break;
                case 'purpule-zone':
                    setLeftDotPosition({ top: '90px', left: '124px' })
                    setRightDotPosition(undefined)
                    break;
                case 'blue-zone':
                    setRightDotPosition({ top: '90px', left: '66px' })
                    setLeftDotPosition(undefined)
                    break;
                default:
                    setLeftDotPosition(undefined)
                    setRightDotPosition(undefined)
            }

        }
    }, [currentKey])
    return (
        <div className="hands-container">
            <div className="hand" style={{
                backgroundImage: `url(${leftHand})`,
            }}>
                <div className="hand-dot" style={{
                    display: leftDotPosition === undefined ? 'none' : 'block',
                    top: leftDotPosition?.top,
                    left: leftDotPosition?.left,
                }}>

                </div>
            </div>
            <div className="hand" style={{
                backgroundImage: `url(${rightHand})`,
            }}>
                <div className="hand-dot" style={{
                    display: rightDotPosition === undefined ? 'none' : 'block',
                    top: rightDotPosition?.top,
                    left: rightDotPosition?.left,
                }}>

                </div>
            </div>
        </div>
    )
}
export default Hands