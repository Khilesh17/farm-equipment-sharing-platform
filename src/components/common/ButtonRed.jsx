import React from 'react'

const ButtonRed = ({
    text,
    onClickHandler,

}) => {
    return (
        <div>
            <button
                onClick={onClickHandler}
                className='border-2 border-red-400 text-red-400 px-4 py-2 rounded-sm'
            >
                {text}
            </button>
        </div>
    )
}

export default ButtonRed