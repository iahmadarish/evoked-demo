
import frame1 from '/assets/frame1.png'
import frame2 from '/assets/frame2.png'
import frame3 from '/assets/frame3.png'
const TryFirst = () => {
  	return (
<section className={`lg:pt-[100px] overflow-x-hidden`}>
        <div className="2xl:max-w-container w-[90%] mx-auto ">
            <div className={`rounded-lg lg:p-[50px] lg:border-neutral-900 lg:border-opacity-[0.4] lg:border-solid lg:border  flex flex-col items-center gap-[50px] justify-center ` }>
            <h2 className={` text-zinc-800 text-[26px] lg:text-5xl font-bold `}>Try first, then decide</h2>
    		<div className='justify-center mx-auto items-center gap-[30px] inline-flex lg:flex-row flex-col'>
      			<div className={`flex-col justify-center items-center gap-[30px] inline-flex`}>
        				<img className={``} alt="Frame" src={frame1} />
        				<div className={`flex-col justify-start items-center gap-5 flex `}>
          					<b className={` text-zinc-800 text-2xl font-bold `}>Order</b>
          					<p className={`xxl:w-[508px]  text-center  text-zinc-800 text-xl font-normal  leading-normal`}>Order up to 1 scents at a time. Shipping is always free for 2 bottles or more.</p>
        				</div>
      			</div>

      			<div className={`justify-center  hidden items-center gap-[30px] lg:inline-flex border-t border-b border border-black h-[347px] border-opacity-[0.3]`} />
      			<div className={`flex-col justify-center items-center gap-[30px] inline-flex`}>
        				<img className={``} alt="Frame" src={frame2} />
        				<div className={`flex-col justify-start items-center gap-5 flex `}>
          					<b className={` text-zinc-800 text-2xl font-bold `}>Try.</b>
          					<p className={`xxl:w-[508px] text-zinc-800 text-center  text-xl font-normal  leading-normal`}>All orders are always risk-free and returnable, with or without a 5ml sample. If no sample is included, simply</p>
        				</div>
      			</div>
      			<div className={`justify-center hidden items-center gap-[30px] lg:inline-flex border-t border-b border border-black h-[347px] border-opacity-[0.3]`} />
      			<div className={`flex-col justify-center items-center gap-[30px] inline-flex`}>
        				<img className={``} alt="Frame" src={frame3} />
        				<div className={`flex-col justify-start items-center gap-5 flex `}>
          					<b className={`text-zinc-800 text-2xl font-bold `}>Decide</b>
          					<p className={`xxl:w-[508px]  text-center text-zinc-800 text-xl font-normal  leading-normal`}>Return any bottles you choose not to keep within 30 days, no questions asked.</p>
        				</div>
      			</div>
    		</div>
            </div>
        </div>
</section>
            );
};

export default TryFirst;