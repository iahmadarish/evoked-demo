import { Link } from '@remix-run/react';
import { CartViewPayload, useAnalytics } from '@shopify/hydrogen';
import React, { useEffect, useState } from 'react';
import { useAside } from '~/components/Aside';
import { AddToCartButton } from '~/routes/products.$handle';
import { useSwipeable } from 'react-swipeable';
import arrow1 from '/assets/majesticons_arrow-up (1).svg';
import arrow2 from '/assets/majesticons_arrow-up.svg';
interface ScentCardProps {
  relatedProduct: any,
  mainProduct: any
}

const ScentCard: React.FC<ScentCardProps> = ({relatedProduct, mainProduct}) => {
    const [visibleSection, setVisibleSection] = useState<string | null>('About this perfume');
    const [visiblePerfectFit, setVisiblePerfectFit] = useState<string | null>('Season');
    const [currentPage, setCurrentPage] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    
    // Adjust based on screen size: 1 product for mobile, 3 for larger screens
    const productsPerPage = isMobile ? 1 : 3; 
    const totalPages = Math.ceil(relatedProduct.length / productsPerPage);
    const handlers = useSwipeable({
      onSwipedLeft: () => handleNext(),
      onSwipedRight: () => handlePrev(),
      trackTouch: true, // Tracks touch events
      trackMouse: true, // Tracks mouse events (for desktop)
    });
    // Determine screen size (mobile or desktop)
    useEffect(() => {
      const updateIsMobile = () => setIsMobile(window.innerWidth <= 768); // 768px breakpoint for mobile
      updateIsMobile();
      window.addEventListener('resize', updateIsMobile);
      return () => window.removeEventListener('resize', updateIsMobile);
    }, []);
  
    // Get the visible products for the current page
    const startIndex = currentPage * productsPerPage;
    const displayedProducts = relatedProduct.slice(startIndex, startIndex + productsPerPage);
  
    const handleNext = () => {
      setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0)); // Loop back to the start
    };
  
    const handlePrev = () => {
      setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1)); // Loop back to the last
    };
  
    // Hide navigation if there are fewer than 3 products
    const showNavigation = relatedProduct.length > 3 || isMobile;
    const toggleSection = (section: string) => {
        setVisibleSection(visibleSection === section ? section : section);
    };
    const togglePerfectFit = (perfectFitData: string) => {
        setVisiblePerfectFit(visiblePerfectFit === perfectFitData ? perfectFitData : perfectFitData);
    };
  
    const sections = ["About this perfume", "Notes & Ingredients", "Perfect For", "Mix & Match"];
    const perfectFit = ["Season", "Occasions"];
    const { open } = useAside();
    const { publish, shop, cart, prevCart } = useAnalytics();
    console.log(relatedProduct, mainProduct)
    return (
        <div className="">
        <div className="flex flex-col justify-start items-center lg:gap-16 md:px-8 lg:px-10">
            <div className="flex flex-wrap lg:justify-start justify-center items-center gap-5 lg:gap-8">
                {sections.map((title) => (
                    <div
                        key={title}
                        className={`lg:px-6 lg:py-3 py-[5px] px-[10px] rounded-lg flex justify-center items-center cursor-pointer ${visibleSection === title ? 'bg-[#edcf5d]' : 'bg-[#f4f4f4]'}`}
                        onClick={() => toggleSection(title)}
                    >
                        <div className="text-center text-[#010101] text-sm lg:text-xl md:text-2xl font-medium leading-7">{title}</div>
                    </div>
                ))}
            </div>

            {visibleSection === "About this perfume" && (
                <div className="flex flex-col-reverse md:flex-row justify-start items-center gap-8 py-10">
                <div className="flex-grow flex flex-col justify-start items-start gap-4">
                <div className="text-black text-3xl md:text-4xl font-bold font-['Satoshi']">About this perfume</div>
                <div className="text-[#010101]/70 text-xl md:text-2xl font-normal font-['Satoshi'] leading-9">Borem ipsum dolor sit amet consectetur. Turpis tristique nulla posuere et amet arcu dictum ultricies convallis.<br/>Borem ipsum dolor sit amet consectetur. Turpis tristique nulla posuere et amet arcu dictum ultricies convallis.</div>
                </div>
                <div className="w-full md:w-[704px] h-[194px] md:h-[608px] bg-[#d9d9d9] rounded-2xl" />
                </div>
            )}

            {visibleSection === "Notes & Ingredients" && (
                <div className="bg-white rounded-2xl lg:mt-0 mt-[40px] justify-start items-center gap-[30px] lg:gap-[80px] 4k:gap-[150px] flex lg:flex-row flex-col">
                <div className="flex-col justify-start items-start lg:gap-[70px] gap-[20px] inline-flex">
                    <div className="flex-col justify-start items-start lg:gap-[50px] gap-[10px] flex">
                        <div className="text-center text-[#010101] text-lg lg:text-[42px] font-bold font-['Satoshi'] leading-7">Top Notes</div>
                        <div className="justify-start items-center gap-[15px] lg:gap-10 inline-flex">
                            <div className="flex-col justify-start items-center inline-flex">
                                <div className="4k:w-[180px] lg:w-[140px] lg:h-[140px] w-[95px] 4k:h-[180px] h-[115px] bg-[#d9d9d9] lg:rounded-xl rounded-lg" />
                                <div className="text-center text-black/80 text-[10px] lg:text-xl font-medium font-['Satoshi'] leading-normal">Vanilla Orchid</div>
                            </div>
                            <div className="flex-col justify-start items-center inline-flex">
                                <div className="4k:w-[180px] lg:w-[140px] lg:h-[140px] w-[95px] 4k:h-[180px] h-[115px] bg-[#d9d9d9] lg:rounded-xl rounded-lg" />
                                <div className="text-center text-black/80 text-[10px] lg:text-xl font-medium font-['Satoshi'] leading-normal">Sandalwood</div>
                            </div>
                            <div className="flex-col justify-start items-center inline-flex">
                                <div className="4k:w-[180px] lg:w-[140px] lg:h-[140px] w-[95px] 4k:h-[180px] h-[115px] bg-[#d9d9d9] lg:rounded-xl rounded-lg" />
                                <div className="text-center text-black/80 text-[10px] lg:text-xl font-medium font-['Satoshi'] leading-normal">Clementine</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-col justify-start items-start lg:gap-[50px] gap-[10px] flex">
                        <div className="text-center text-[#010101] text-lg lg:text-[42px] font-bold font-['Satoshi'] leading-7">Middle Notes</div>
                        <div className="justify-start items-center gap-[15px] lg:gap-10 inline-flex">
                            <div className="flex-col justify-start items-center inline-flex">
                                <div className="4k:w-[180px] lg:w-[140px] lg:h-[140px] w-[95px] 4k:h-[180px] h-[115px] bg-[#d9d9d9] lg:rounded-xl rounded-lg" />
                                <div className="text-center text-black/80 text-[10px] lg:text-xl font-medium font-['Satoshi'] leading-normal">Vanilla Orchid</div>
                            </div>
                            <div className="flex-col justify-start items-center inline-flex">
                                <div className="4k:w-[180px] lg:w-[140px] lg:h-[140px] w-[95px] 4k:h-[180px] h-[115px] bg-[#d9d9d9] lg:rounded-xl rounded-lg" />
                                <div className="text-center text-black/80 text-[10px] lg:text-xl font-medium font-['Satoshi'] leading-normal">Sandalwood</div>
                            </div>
                            <div className="flex-col justify-start items-center inline-flex">
                                <div className="4k:w-[180px] lg:w-[140px] lg:h-[140px] w-[95px] 4k:h-[180px] h-[115px] bg-[#d9d9d9] lg:rounded-xl rounded-lg" />
                                <div className="text-center text-black/80 text-[10px] lg:text-xl font-medium font-['Satoshi'] leading-normal">Clementine</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-col justify-start items-start lg:gap-[50px] gap-[10px] flex">
                        <div className="text-center text-[#010101] text-lg lg:text-[42px] font-bold font-['Satoshi'] leading-7">Bottom Notes</div>
                        <div className="justify-start items-center gap-[15px] lg:gap-10 inline-flex">
                            <div className="flex-col justify-start items-center inline-flex">
                                <div className="4k:w-[180px] lg:w-[140px] lg:h-[140px] w-[95px] 4k:h-[180px] h-[115px] bg-[#d9d9d9] lg:rounded-xl rounded-lg" />
                                <div className="text-center text-black/80 text-[10px] lg:text-xl font-medium font-['Satoshi'] leading-normal">Vanilla Orchid</div>
                            </div>
                            <div className="flex-col justify-start items-center inline-flex">
                                <div className="4k:w-[180px] lg:w-[140px] lg:h-[140px] w-[95px] 4k:h-[180px] h-[115px] bg-[#d9d9d9] lg:rounded-xl rounded-lg" />
                                <div className="text-center text-black/80 text-[10px] lg:text-xl font-medium font-['Satoshi'] leading-normal">Sandalwood</div>
                            </div>
                            <div className="flex-col justify-start items-center inline-flex">
                                <div className="4k:w-[180px] lg:w-[140px] lg:h-[140px] w-[95px] 4k:h-[180px] h-[115px] bg-[#d9d9d9] lg:rounded-xl rounded-lg" />
                                <div className="text-center text-black/80 text-[10px] lg:text-xl font-medium font-['Satoshi'] leading-normal">Clementine</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="4k:w-[654px] lg:w-[480px] self-stretch bg-[#d9d9d9] rounded-2xl flex-col justify-end items-center gap-[70px] inline-flex">
                    <div className="px-[20px] lg:px-[50px] lg:pt-0 pt-[200px] pb-[20px] lg:pb-[50px] flex-col justify-end items-start gap-[10px] lg:gap-[50px] flex">
                        <div className="text-center text-[#010101] text-lg lg:text-[42px] font-bold font-['Satoshi'] leading-7">Ingredients</div>
                        <div className="4k:w-[546px] text-[#010101]/60 text-xs lg:text-[16px] 4k:text-xl font-normal  leading-7">Torem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. </div>
                    </div>
                </div>
            </div>
            )}

            {visibleSection === "Perfect For" && (
              <div className="flex flex-col justify-start items-start lg:mt-0 mt-[30px]">

<div className=" justify-start items-start inline-flex">
                    <div className="flex-col justify-center items-start gap-6 inline-flex">
                        <div className="flex-col justify-start items-start gap-[20px] 4k:gap-[50px] flex">
                            <div className="text-center"><span className="text-[#010101] 4k:text-[64px] lg:text-[42px] text-[22px] font-bold font-['Satoshi'] 4k:leading-[76.80px]">{mainProduct.title.charAt(0).toUpperCase() + mainProduct.title.slice(1).toLowerCase()} <span className="text-[#edcf5d]">is a perfect fit</span> for these moments in life...</span></div>
                            <div className="flex flex-wrap lg:justify-start justify-center items-center gap-5 lg:gap-8">
            </div>
                            <div className="px-5 py-2.5 bg-[#f4f4f4] rounded-lg justify-start items-center gap-2.5 inline-flex">
                            {perfectFit.map((title) => (
                    <div
                        key={title}
                        className={`lg:px-6 lg:py-3 py-[5px] px-[10px] rounded-lg flex justify-center items-center cursor-pointer ${visiblePerfectFit === title ? 'bg-[#010101] text-white' : 'bg-[#f4f4f4] text-[#010101]'}`}
                        onClick={() => togglePerfectFit(title)}
                    >
                        <div className="text-center  text-sm lg:text-xl md:text-2xl font-medium leading-7">{title}</div>
                    </div>
                ))}
                            </div>
                        </div>
                    </div>
                </div>
                
               {
                 visiblePerfectFit === "Season" ? 
                 (<>
                 {/* For Season */}
                <div className="">
                <div className="h-[360px] bg-gradient-to-b from-white to-black rounded-xl" >
                </div>
                </div>
                 </>)
                 :
                 <div className=""></div>
               }

              </div>
                
            )}

            {visibleSection === "Mix & Match" && (
                <div className="flex flex-col justify-center items-center text-center gap-10 py-10">
                <div className="flex flex-col md:flex-row justify-between items-start">
                <div className="flex flex-col justify-center items-start gap-5">
                <div className="text-center text-[#010101] text-3xl md:text-4xl font-bold font-['Satoshi']">Mix & Match</div>
                </div>
                </div>
                <div className="flex flex-col justify-center items-start gap-10">
                <div className="">
                  <div className="hidden lg:flex flex-wrap justify-center gap-6">
                {relatedProduct.map((product: any) => {
  // Safely access the variant at index 2
  const variant = product.variants?.nodes?.[2]; // Ensure the product has a third variant
  const firstVariant = product.variants?.nodes?.[0]; // Also ensure the first variant exists
  const variantId = variant?.id; // Safely access variant ID
  const isAvailable = variant?.availableForSale;
  const productUrl = firstVariant ? `/products/${product.handle}` : '#';
  return (
    <div key={product.id} className="w-full lg:w-[400px] bg-[#f4f4f4] rounded-2xl px-4 py-10 flex flex-col justify-center items-center gap-5">
    <div className="w-full flex justify-between items-start">
    <div className="w-10 h-10 relative" />
    <div className="flex flex-col justify-start items-end gap-2.5">
    <div>
    <span className="text-[#010101] text-lg md:text-xl font-normal font-['Satoshi'] line-through">£45</span>
    <span className="text-[#010101] text-3xl font-bold font-['Satoshi']">£40</span>
    </div>
    <div className="px-2.5 py-2 rounded-lg border border-[#a4a4a4] flex justify-center items-center">
    <div className="text-center">
    <span className="text-[#010101] text-sm font-normal font-['Satoshi'] leading-[16.80px]">Retail Price: £{product.metafields?.[4]?.value ? Math.floor(Number(product.metafields[4].value)) 
    : 0}</span>
    </div>
    </div>
    </div>
    </div>
    <Link className="flex flex-col gap-6 items-center justify-center" to={firstVariant ? productUrl : '#'} prefetch="intent">
            <img src={product.featuredImage.url} alt={product.featuredImage.altText || product.title} />
            <p>{product.title}</p>
    <span className="text-[#010101]/80  4k:h-auto h-[50px] text-lg font-normal font-['Satoshi'] leading-snug">Smells Like: {product.metafields[0]?.value.replace('[' ,'').replace(']', '').replace('"', '').replace('"', '')}</span>
    <div className="p-2.5 bg-[#ece8dd] rounded-lg justify-center items-center gap-2.5 inline-flex">
    <div className="text-center"><span className="text-[#010101]/80 text-sm font-semibold font-['Poppins'] leading-tight">Mix <span className="text-[#975000] text-sm font-semibold font-['Poppins'] leading-tight"> {mainProduct.title.charAt(0).toUpperCase() + mainProduct.title.slice(1).toLowerCase()}</span></span><span className="text-[#010101]/80 text-sm font-normal font-['Poppins'] leading-tight"> with </span><span className="text-[#975000] text-sm font-semibold font-['Poppins'] leading-tight">{product.title.charAt(0).toUpperCase() + product.title.slice(1).toLowerCase()}</span><span className="text-[#010101]/80 text-sm font-normal font-['Poppins'] leading-tight"> to create <br/>a “aquatic, cherry” perfume</span></div>
</div>
            </Link>
    <div className="flex flex-col justify-center items-center gap-2.5">
    <div className="text-center">
    </div>
    <div className="">
    {variant ? (
            <AddToCartButton
              className={`text-center px-[30px] py-[15px]  bg-[#010101] rounded flex justify-center items-center gap-2.5  text-white text-[22px] font-medium font-['Sofia Pro'] leading-tight`}
              disabled={!isAvailable}
              onClick={() => {
                open('cart');
                publish('cart_viewed', {
                  cart,
                  prevCart,
                  shop,
                  url: window.location.href || '',
                } as CartViewPayload);
              }}
              lines={variantId ? [{ merchandiseId: variantId, quantity: 1 }] : []}
            >
              {isAvailable ? 'Add to cart' : 'Sold out'}
            </AddToCartButton>
          ) : (
            <span className="text-center text-[16px] lg:text-2xl not-italic font-medium leading-[120%] mt-[25px]">
              Variant not available
            </span>
          )}
    <div className="w-5 h-5 relative" />
    </div>
    </div>
    </div>
          
        );
      })}
      </div>
                <div {...handlers} className="flex gap-4 overflow-hidden lg:hidden relative">
        {displayedProducts.map((product: any) => {
          const variant = product.variants?.nodes?.[2]; // Ensure there's a third variant
          const firstVariant = product.variants?.nodes?.[0]; // Ensure first variant exists
          const variantId = variant?.id; // Safely access variant ID
          const isAvailable = variant?.availableForSale;
          const productUrl = firstVariant ? `/products/${product.handle}` : '#';

          return (
            <div key={product.id} className="w-full lg:w-[400px] bg-[#f4f4f4] rounded-2xl px-4 py-10 flex flex-col justify-center items-center gap-5">
              <div className="w-full flex justify-between items-start">
                <div className="w-10 h-10 relative" />
                <div className="flex flex-col justify-start items-end gap-2.5">
                  <div>
                    <span className="text-[#010101] text-lg md:text-xl font-normal font-['Satoshi'] line-through">£45</span>
                    <span className="text-[#010101] text-3xl font-bold font-['Satoshi']">£40</span>
                  </div>
                  <div className="px-2.5 py-2 rounded-lg border border-[#a4a4a4] flex justify-center items-center">
                    <div className="text-center">
                      <span className="text-[#010101] text-sm font-normal">Retail Price: £{product.metafields?.[4]?.value ? Math.floor(Number(product.metafields[4].value)) : 0}</span>
                    </div>
                  </div>
                </div>
              </div>

              <Link className="flex flex-col gap-6 items-center justify-center" to={firstVariant ? productUrl : '#'}>
                <img src={product.featuredImage.url} alt={product.featuredImage.altText || product.title} />
                <p>{product.title}</p>
                <span className="text-[#010101]/80 text-lg">Smells Like: {product.metafields[0]?.value.replace('[', '').replace(']', '').replace('"', '').replace('"', '')}</span>
                <div className="p-2.5 bg-[#ece8dd] rounded-lg justify-center items-center gap-2.5 inline-flex">
    <div className="text-center"><span className="text-[#010101]/80 text-sm font-semibold font-['Poppins'] leading-tight">Mix <span className="text-[#975000] text-sm font-semibold font-['Poppins'] leading-tight"> {mainProduct.title.charAt(0).toUpperCase() + mainProduct.title.slice(1).toLowerCase()}</span></span><span className="text-[#010101]/80 text-sm font-normal font-['Poppins'] leading-tight"> with </span><span className="text-[#975000] text-sm font-semibold font-['Poppins'] leading-tight">{product.title.charAt(0).toUpperCase() + product.title.slice(1).toLowerCase()}</span><span className="text-[#010101]/80 text-sm font-normal font-['Poppins'] leading-tight"> to create <br/>a “aquatic, cherry” perfume</span></div>
</div>
              </Link>

              <div className="flex flex-col justify-center items-center gap-2.5">
                {variant ? (
                  <AddToCartButton
                    className="text-center px-[30px] py-[15px] bg-[#010101] rounded text-white text-[22px] font-medium"
                    disabled={!isAvailable}
                    lines={variantId ? [{ merchandiseId: variantId, quantity: 1 }] : []}
                  >
                    {isAvailable ? 'Add to cart' : 'Sold out'}
                  </AddToCartButton>
                ) : (
                  <span className="text-center text-[16px] lg:text-2xl font-medium mt-[25px]">Variant not available</span>
                )}
              </div>
               {/* Navigation buttons */}
      {showNavigation && (
        <div className="flex justify-between w-full mt-4">
          <button
            onClick={handlePrev}
            className={` absolute top-[50%] left-0 z-[1] `}
          >
            <img src={arrow1} alt="Arrow" />
          </button>
          <button
            onClick={handleNext}
            className={` absolute top-[50%] right-0 z-[1] `}
          >
            <img src={arrow2} alt="Arrow" />
          </button>
        </div>
      )}
            </div>
          );
        })}
      </div>

     
                </div>
                </div>
                </div>
            )}
        </div>
        </div>
    );
};

export default ScentCard;
