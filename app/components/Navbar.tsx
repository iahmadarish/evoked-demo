
import logo from '/assets/whiteLogo.svg'
import ArrowRight from 'public/utils/ArrowRight'
import { Link } from '@remix-run/react'
const Navbar = () => {
  return (
      <nav className='w-full lg:py-[40px] py-[20px] lg:bg-primary lg:border-b-2 lg:border-b-white lg:border-solid lg:static absolute top-0 left-0 z-10 '>
         
          <div className="lg:max-w-container w-[90%] mx-auto flex lg:justify-between justify-center items-center">
              <div className="">
                  <img className='lg:block hidden' src={logo} alt='Logo' /> 
                  <img className='lg:hidden block w-[150px] h-[55px]' src={logo} alt='Logo' /> 
              </div>
              <div className="lg:flex hidden items-center gap-x-[30px]">
                  <Link to='/collections'>
                  <button className='flex justify-center items-center gap-2.5 px-5 py-[12px] bg-white rounded-[var(--md,8px)] border-[color:var(--Brand,#28282A)] shadow-[2px_2px_0px_0px_#FFF] border-[1.5px] border-solid text-[color:var(--Brand,#28282A)] text-[10px] lg:text-base not-italic font-semibold leading-[normal]'> Build Your Set & Save <ArrowRight color={'#171717'} /></button>
                  </Link>           
              </div>
          </div>
    </nav>
  )
}

export default Navbar