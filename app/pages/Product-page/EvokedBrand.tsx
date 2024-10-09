import { useDarkMode } from 'public/utils/DarkModeContext';
import { SelfConfidence, SaveMoney, TwentyFour, SelfConfidenceDark, TwentyFourDark, SaveMoneyDark } from 'public/utils/ThreeReasons';
const EvokedBrand = () => {
  return (
      <section className={`lg:pb-0 pb-[80px] lg:pt-0 pt-[40px] lg:overflow-hidden `}>
       
        
          <div className="bg-evoked bg-cover bg-center lg:mb-0 pb-[0px] lg:pt-[70px] lg:pb-[747px] lg:h-auto h-[496px] ">
              <div className="text-center lg:block hidden ">
            <h2 className="text-white 2xl:text-5xl lg:text-[38px] not-italic font-bold leading-[normal] uppercase">Why choose Evoked?</h2>
            <div className="flex justify-center">
                  <div className="flex justify-center gap-x-[50px] lg:mt-[50px]">
                      <div className="flex flex-col items-center gap-y-[30px]"> <SelfConfidence className={`flex items-start gap-2.5 p-2.5 rounded-[var(--md,8px)] border border-[color:var(--Brand,#28282A)] shadow-[2px_2px_0px_0px_#171717] border-solid bg-white`} color='#171717'/>
                          
                          <p className={`text-white w-[261px] text-center lg:text-[16px] 2xl:text-lg not-italic font-normal leading-[120%]`}>Feel confident. Get compliments. Bring your best self daily.</p>
                      </div>
                      <div className="flex flex-col items-center gap-y-[30px]">
                               <TwentyFour className={`flex items-start gap-2.5 p-2.5 rounded-[var(--md,8px)] border border-[color:var(--Brand,#28282A)] shadow-[2px_2px_0px_0px_#171717] border-solid bg-white`} color='#171717'/>
                          <p className={`text-white w-[261px] text-center lg:text-[16px] 2xl:text-lg not-italic font-normal leading-[120%]`}>Feel confident. Get compliments. Bring your best self daily.</p>
                      </div>
                      <div className="flex flex-col items-center gap-y-[30px]"><SaveMoney className={`flex items-start gap-2.5 p-2.5 rounded-[var(--md,8px)] border border-[color:var(--Brand,#28282A)] shadow-[2px_2px_0px_0px_#171717] border-solid bg-white`} color='#171717'/>
                          
                          <p className={`text-white w-[261px] text-center lg:text-[16px] 2xl:text-lg not-italic font-normal leading-[120%]`}>Feel confident. Get compliments. Bring your best self daily.</p>
                      </div>
                      </div>
                      </div>
            </div>
          </div>
         
    </section>
  )
}

export default EvokedBrand