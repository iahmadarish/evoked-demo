
import searchIcon from "/assets/ic_outline-search.svg";
import ArrowSearch from "/assets/ArrowSearch.svg";
import { useDarkMode } from "public/utils/DarkModeContext";
import { Link } from "@remix-run/react";

const TopHeader = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <section className={`${isDarkMode ? 'bg-primary' : 'bg-white'} pb-[10px] overflow-x-hidden
    `}>
      <div className="bg-collection bg-cover bg-center">
        <div className="lg:max-w-container w-[90%]  mx-auto">
          <div className="text-white text-base lg:mt-[35px] mt-[80px] font-medium inline-block cursor-pointer">
            <Link to='/' className="inline-block">Home</Link>/ Perfumes
          </div>
          <div className="flex lg:pt-[195px] pb-[60px] justify-center items-center">
            <div className="flex-col items-start inline-flex mx-auto justify-center">
              <h3 className="text-white text-center lg:text-5xl text-[26px] font-bold font-['Josefin Sans'] uppercase leading-[57.60px]">
                Find Your Scents
              </h3>
              <p className="text-white mt-[40px] lg:text-2xl text-[18px] font-semibold font-['Josefin Sans'] leading-[28.80px]">
                Search by perfume
              </p>
              <div className="lg:w-[464px] relative lg:mt-[20px] border-b border-solid border-white justify-between gap-2.5 items-center inline-flex">
                <img src={searchIcon} alt="Search-icon" className="w-[9%]" />
                <input
                  type="text"
                  className="w-[86%] outline-none bg-transparent text-white text-[24px]"
                />
                <img src={ArrowSearch} alt="Explore-arrow" className="w-[9%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${isDarkMode ? "bg-primary" : "bg-white"}`}>
      </div>
    </section>
  );
};
export default TopHeader;