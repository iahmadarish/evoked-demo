
import React, { useState } from 'react';
import progress from '/assets/progress.svg'
interface ProgressBarImageProps {
    quantity: number;
  }
  
const ProgressBarImage: React.FC<ProgressBarImageProps> = ({ quantity }) => {
  // Calculate gradient height based on quantity
  const calculateGradientHeight = () => {
    switch (quantity) {
      case 1:
        return 'h-[80%]'; // 25% of the image is visible from the top (75% gradient)
      case 2:
        return 'h-[55%]'; // 50% of the image is visible from the top (50% gradient)
      case 3:
        return 'h-[30%]'; // 75% of the image is visible from the top (25% gradient)
      case 4:
        return 'h-[0%]'; // Fully visible (0% gradient)
      default:
        return 'h-[0%]'; // Default to 25% visible
    }
  };

  // Determine border color based on quantity
  const getBorderColor = (minQuantity: number) => {
    return quantity >= minQuantity ? ' h-px opacity-60 bg-gradient-to-r from-[#45d492] to-[#45d492]/0' : 'h-px opacity-40 bg-gradient-to-r from-[#d9d9d9] to-neutral-500/0'; // Green if quantity meets or exceeds the minimum
  };
  const getTextColor = (minQuantity: number, quantity: number) => {
    return quantity >= minQuantity ? 'text-white duration-500' : 'text-white/20 duration-500'; // Full white if quantity meets or exceeds the minimum
  };
  return (
    <div className="relative flex justify-center h-[514px]">

      {/* Discount Information */}
      <div className="absolute left-0 top-[462px] w-full text-center">
        <span className="text-white text-lg font-normal font-['Jost']">
          Since you’re subscribed, 20% off has been already activated for you.
          <br />
        </span>
        <span className="text-white text-lg font-normal font-['Jost'] underline">
          Click here to remove savings and purchase one time only
        </span>
      </div>
<div className="">
   {/* Pricing Image and Gradient Overlay */}
      <div className="relative w-[234.14px] h-[411px]">
        <img className="w-full h-full object-cover" src={progress} alt="Pricing Plan" />
        <div
          className={`absolute top-0 left-0 w-full ${calculateGradientHeight()} bg-gradient-to-t from-black/90 to-black/70 transition-all duration-500`}
        />
      </div>
 {/* Pricing Options and Separators */}
 <div className="">
      <div className="absolute left-[50px] top-[5px]">
        <div className={`w-[469px] ${getBorderColor(4)}`} />
        <span className={`text-base duration-500 font-normal font-['Jost'] mb-[10px] ${getTextColor(4, quantity)}`}>
          Rockstar (Save £85)
        </span>
      </div>
      <div className="absolute left-[50px] top-[125px]">
        <div className={`w-[469px] ${getBorderColor(3)}`} />
        <span className={`text-base duration-500 font-normal font-['Jost'] mb-[10px] ${getTextColor(3, quantity)}`}>
          Saver (Save £80)
        </span>
      </div>
      <div className="absolute left-[50px] top-[225px]">
      <div className={`w-[469px] ${getBorderColor(2)} `} />
        <span className={`text-base duration-500 font-normal font-['Jost'] mb-[10px] ${getTextColor(2, quantity)}`}>
          Economizer (Save £45)
        </span>
        
      </div>
      <div className="absolute left-[50px] top-[327px]">
      <div className={`w-[469px] ${getBorderColor(1)} `} />
      <span className={`text-base duration-500 font-normal font-['Jost'] mb-[10px] ${getTextColor(1, quantity)}`}>
      Stranger (20% Savings)
        </span>
       
      </div>
      </div>
</div>
     

     
      {/* Price Label */}
      <div className="absolute left-[33.74px] top-[304.37px] text-center">
        <div className="text-black text-[15px] font-semibold font-['Josefin Sans'] leading-none">
          £0.04
        </div>
        <div className="text-black text-[10px] font-normal font-['Josefin Sans'] leading-none">
          / Spray
        </div>
      </div>

    
    </div>
  );
};
  
  

  interface CounterProps {
    quantity: number;
    onIncrement: () => void;
    onDecrement: () => void;
  }
  
  const Counter: React.FC<CounterProps> = ({ quantity, onIncrement, onDecrement }) => {
    return (
      <div className="flex flex-col items-center space-y-4">
        <button
          onClick={onDecrement}
          disabled={quantity <= 1} // disable decrement button if quantity is 1
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Decrement
        </button>
        <span className="text-xl font-bold">{quantity}</span>
        <button
          onClick={onIncrement}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Increment
        </button>
      </div>
    );
  };

  const MainPlan: React.FC = () => {
    const [quantity, setQuantity] = useState<number>(1);
  
    const handleIncrement = () => setQuantity(prev => prev + 1);
    const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1)); // Prevent going below 1
  
    return (
      <div className="flex bg-primary flex-col md:flex-row p-4 space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-1 md:w-1/2">
          <Counter
            quantity={quantity}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
          />
        </div>
        <div className="flex-1 md:w-1/2 relative">
          <ProgressBarImage quantity={quantity} />
        </div>
      </div>
    );
  };
  
  
  export default MainPlan;
