import React, { FC } from "react"
interface LineModeProps {
    leftPadding: string
    outgoingChars: string
    currentChar: string
    incomingChars: string
}
const LineMode: FC<LineModeProps> = ({ leftPadding, outgoingChars, currentChar, incomingChars }) => {
    return (
        <p className="lesson-text-field line-mode">
            <span className="Character-out">
                {(leftPadding + outgoingChars).slice(-20)}
            </span>
            <span className="Character-current">{currentChar}</span>
            <span>{incomingChars.substring(0, 20)}</span>
        </p>
    )
}
export default LineMode