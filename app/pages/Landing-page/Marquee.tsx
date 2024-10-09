import Marquee from "react-fast-marquee";

type Props = {}

export default function MarqueeDynamic({}: Props) {
  return (
    <div className="bg-[#010101]">
      <Marquee 
        speed={50} 
        gradient={false} 
        className="lg:py-10 py-5"
        loop={0}
      >
        <div className="flex items-center">
          {["Let’s get started", "Explore now", "Unleash creativity", "Transform your business", "Let’s get started", "Explore now", "Unleash creativity", "Transform your business"].map((text, index) => (
            <span
              key={index}
              className="text-white text-2xl lg:text-4xl 4k:text-5xl font-bold font-['Satoshi'] leading-[1.1] whitespace-nowrap mx-10" // Adjusted margin
            >
              {text}
            </span>
          ))}
        </div>
      </Marquee>
    </div>
  );
}
