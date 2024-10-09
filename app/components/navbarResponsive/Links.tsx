import React from 'react'
import logo from "../../../public/assets/logo.svg"
import cart from "../../../public/assets/cart.svg"
import { motion } from "framer-motion"
const Links = () => {

    const variants = {
        open: {
            y: 30,
            opacity: 1,
            transition: {
                y: { stiffness: 1000, velocity: -100 }
            }
        },
        
        closed: {
            y: 50,
            opacity: 0,
            transition: {
                y: { stiffness: 1000 }
            }
        }
    };

    return (
        <div className='links'>

            <div className="mx-auto mb-6 flex  items-center gap-x-7">
                <img src={logo} alt="" />
                <img src={cart} alt="" />
            </div>

            <ul className='text-white font-bold text-2xl flex flex-col gap-4 '>

                <motion.li
                    variants={variants}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 1 }}
                    className='hover:text-[#EDCF5D]  hover:px-2 hover:rounded-md'>Shop
                </motion.li>
                <motion.li
                    variants={variants}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 1 }}
                    className='hover:text-[#EDCF5D]  hover:px-4 hover:rounded-md'>Earn
                </motion.li>
                <motion.li
                    variants={variants}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 1 }}
                    className='hover:text-[#EDCF5D]  hover:px-4 hover:rounded-md'>Blog
                </motion.li>
                <motion.li
                    variants={variants}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 1 }}
                    className='hover:text-[#EDCF5D]  hover:px-4 hover:rounded-md'>About
                </motion.li>
                <motion.li
                    variants={variants}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 1 }}
                    className='hover:text-[#EDCF5D]   hover:px-4 hover:rounded-md'>Reviews
                </motion.li>
            </ul>

            <p className='font-bold text-3xl text-white mt-4'>2024 BE EVOKED </p>
        </div>
    )
}

export default Links