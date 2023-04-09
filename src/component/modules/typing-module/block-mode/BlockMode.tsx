import React, { FC } from "react"
interface BlockModeProps {
    text: string
    currentWordIndex: number
    currentCharIndex: number
    blockRef: React.MutableRefObject<HTMLParagraphElement | null>
}
const BlockMode: FC<BlockModeProps> = ({ text, currentWordIndex, currentCharIndex, blockRef }) => {
    return (
        <p tabIndex={0} onKeyDown={e=>{if(e.key===' ')e.preventDefault()}} ref={blockRef} className="lesson-text-field block-mode">
            {
                text.split(' ').map((word, wordIndex) =>

                    <React.Fragment key={'word'+wordIndex}>
                        <span  className={['word', currentWordIndex === wordIndex ? 'current-word' : ''].join(' ')}>
                            {
                                word.split('').map((char, charIndex) =>

                                    <span key={'char'+wordIndex*currentCharIndex+charIndex} className={currentCharIndex === charIndex && currentWordIndex === wordIndex ? 'Character-current' : ''}>{char}</span>
                                )
                            }
                        </span>
                        <span className={currentCharIndex === word.length && currentWordIndex === wordIndex ? 'Character-current' : ''}> </span>
                    </React.Fragment>
                )
            }

        </p>
    )
}
export default BlockMode