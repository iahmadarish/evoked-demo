import { motion, AnimatePresence } from 'framer-motion'
import React from 'react'

const variants = {
    open: {
      y: 0,
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
  
  const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];

const ResponsiveMenu = ({open, i}) => {

  return (
    <AnimatePresence mode='wait'>
            {
                open && (
                    <motion.div
                        initial={{opacity: 0, y: -100}}
                        animate={{opacity:7, y: 1}}
                        exit={{opacity:0, y: -60}}
                        transition={{duration: 0.3}}
                        
                        className='absolute top-20 left-[-25px] w-screen h-screen  z-20 overflow-hidden'
                    >
                        <div className="text-xl font-semibold uppercase bg-black text-white py-10 m-6 rounded-sm w-full  h-screen ">
                                <ul className='flex flex-col justify-center items-center gap-10'>
                                    <motion.li 
                                      variants={variants}
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 1 }}

                                    className='hover:text-[#EDCF5D]  hover:border-2 hover:px-4 hover:rounded-md'>Shop
                                    </motion.li>

                                    <motion.li 
                                      variants={variants}
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 1 }}

                                    className='hover:text-[#EDCF5D]  hover:border-2 hover:px-4 hover:rounded-md'>Earn
                                    </motion.li>

      
                                    <motion.li 
                                      variants={variants}
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 1 }}

                                    className='hover:text-[#EDCF5D]  hover:border-2 hover:px-4 hover:rounded-md'>Blog
                                    </motion.li>
      
                                    <motion.li 
                                      variants={variants}
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 1 }}

                                    className='hover:text-[#EDCF5D]  hover:border-2 hover:px-4 hover:rounded-md'>About
                                    </motion.li>
                                    
                                    <motion.li 
                                      variants={variants}
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 1 }}
                                    className='hover:text-[#EDCF5D]  hover:border-2 hover:px-4 hover:rounded-md'>Reviews
                                    </motion.li>
                                </ul>
                        </div>
                    </motion.div>
                )
            }
    </AnimatePresence>
  )
}

export default ResponsiveMenu