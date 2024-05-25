import React from 'react'

const Button = ({
    text,
    onClickHandler,

}) => {
    return (
        <div>
            <button
                onClick={onClickHandler}
                className='bg-green-400 text-white px-4 py-2 rounded-md'
            >
                {text}
            </button>
        </div>
    )
}

export default Button