import arrow from '/assets/Arrow 2 (3).svg';
import arrowDown from '/assets/Arrow 2 (4).svg';
import checkmart from '@/public/assets/checkmart.svg';
import CheckMart from 'public/utils/CheckMart';
import ArrowRight from 'public/utils/ArrowRight';

const Hero = () => {
  return (
    <section className={`relative lg:pb-0 bg-[#010101] pt-[120px]`}> {/* Adjusted top padding */}
      <div className='4k:pt-[80px] 4k:pb-[477px] pt-[50px] pb-[300px] lg:pb-[318px]'>
        <div className="max-w-container 4k:max-w-container2 mx-auto">
          <div className="flex-col justify-start items-center gap-[50px] flex">
            <div className="flex-col justify-start items-center gap-[25px] flex">
              <div className="text-center">
                <span className="text-white 4k:text-[74px] lg:text-[64px] text-[28px] font-bold font-['Satoshi'] lg:leading-[88.80px]">Perfumes & AI<br/>for </span>
                <span className="4k:text-[74px] lg:text-[64px] text-[28px] bg-gradient-text bg-clip-text text-transparent font-bold font-['Satoshi'] lg:leading-[88.80px]">building confidence</span>
              </div>
              <p className="text-center text-white/80 lg:text-2xl text-[16px] font-normal font-['Satoshi'] lg:leading-9">Welcome to a better way to unlock the best you. Start with perfumes, continue with AI app.</p>
            </div>
            <div className="justify-end items-center gap-10 inline-flex">
              <button className="lg:px-10 lg:py-5 px-5 py-3 bg-white rounded-lg justify-center items-center gap-[15px] flex">
                <span className="text-[#1f1f1f] lg:text-[28px] text-lg font-bold font-['Satoshi']">Get started</span>
                <img src={arrow} alt='Arrow'/>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-70 justify-center text-center mx-auto items-center gap-2.5 lg:gap-5 flex pb-[50px]">
    <span className="text-white justify-center text-center mx-auto items-center gap-2.5 lg:gap-5 flex text-xs font-normal  leading-[18px] lg:text-2xl  lg:leading-[31.20px]">How It works <img className='lg:h-auto h-[11px]' src={arrowDown} alt='Arrow'/></span>
</div>
    </section>
  );
};

export default Hero;
