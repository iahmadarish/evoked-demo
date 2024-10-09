import React, { useState } from 'react'
import "./sidebar.scss"
import Links from './Links'
import ToggleButton from './ToggleButton'
import { delay, motion } from "framer-motion"
import { clipPath } from 'framer-motion/client'

const Sidebar = () => {

    const [opens, setOpens] = useState(false);

    const variants = {
        open: {
            clipPath: "circle(1200px at 50px 50px)",
            transition: {
                type: "spring",
                stiffness: 15,
            }
        },
        closed: {
            clipPath: "circle(30px at 50px 50px)",
            transition: {
                delay: 0.5,
                type: "spring",
                stiffness: 400,
                damping: 40,
            }
        }
    }

    return (
            <motion.div
                className='sidebar  fixed  z-10 overflow-hidden'
                animate={opens ? "open" : "closed"}
            >
                <motion.div className=" bg fixed top-0 right-0 bottom-0 w-[100%] bg-black" variants={variants}>
                    <Links />
                </motion.div>

                <ToggleButton setOpens={setOpens} />

            </motion.div>
    )
}

export default Sidebar