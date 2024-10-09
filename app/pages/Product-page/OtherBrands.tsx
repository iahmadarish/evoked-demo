
import evoked from '/assets/evokedVsother.svg'
import black from '/assets/blackPerfume.png'
import scent from '/assets/scent.png'

const OtherBrands = () => {
  return (
      <section className={`4k:py-[150px] py-[100px]`}>
        <div className="max-w-container 4k:max-w-container2 mx-auto">
          <div className="flex-col justify-start items-center gap-[70px] flex">
    <div className="self-stretch p-2.5 justify-center items-center gap-2.5 inline-flex">
        <div className="text-center text-[#010101] lg:text-[64px] text-[28px] font-bold font-['Satoshi'] lg:leading-[80px]">Be Evoked. Do Better.</div>
    </div>
          <img className='' src={evoked} alt='Lists'/>
</div>
        </div>
    </section>
  )
}

export default OtherBrands