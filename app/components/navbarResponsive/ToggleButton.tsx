import React from 'react'
import { IoMdOpen } from "react-icons/io";
const ToggleButton = ({ setOpens }) => {
    return (
        <button onClick={() => setOpens((prev) => !prev)}>
                <IoMdOpen className='text-3xl text-white mx-auto '  />
        </button>

    )
}

export default ToggleButton