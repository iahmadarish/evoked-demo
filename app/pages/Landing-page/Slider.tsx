
import React, {useState, useEffect} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Mousewheel, Navigation} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import arrow1 from '/assets/majesticons_arrow-up (1).svg';
import search from '/assets/Search icon.svg';
import arrow2 from '/assets/majesticons_arrow-up.svg';
import {usePricing} from 'public/utils/PricingContext';
import {DownArrow1, Dropdown, Star12} from 'public/utils/Helpers';
import {Product, Collection, CartLineUpdateInput} from '@shopify/hydrogen/storefront-api-types';
import {useCollections} from 'public/utils/CollectionContext';
import addSet from '/assets/addSet.svg'
import { useProduct } from 'public/utils/ProductsContext';
import { AddToCartButton } from '~/routes/products.$handle';
import { useAside } from '~/components/Aside';
import { CartForm, CartViewPayload, OptimisticCart, useAnalytics, useOptimisticCart } from '@shopify/hydrogen';
import { useVariantUrl } from '~/lib/variants';
import { Link } from '@remix-run/react';
import { CartApiQueryFragment } from 'storefrontapi.generated';
import { ClipLoader } from 'react-spinners';

type ProductSliderProps = {
  products: Product[];
};
type CartLine = OptimisticCart<CartApiQueryFragment>['lines']['nodes'][0];
type CartMainProps = {
  cart: CartApiQueryFragment | null;
  layout: 'page' | 'aside';
};

function CartLineQuantity({ line }: { line: CartLine }) {
  if (!line || typeof line?.quantity === 'undefined') return null;

  const { id: lineId, quantity, isOptimistic } = line;
  const prevQuantity = Math.max(0, quantity - 1); // Ensure it doesn't go below 0
  const nextQuantity = quantity + 1;

  // Remove item from cart when quantity reaches 1 and decrement is clicked
  const handleDecrement = () => {
    if (quantity === 0) {
      return (
        <CartLineUpdateButton lines={[{ id: lineId, quantity: 0 }]}>
          <button
            aria-label="Remove from cart"
            disabled={isOptimistic}
            className="remove-button"
          >
            -
          </button>
        </CartLineUpdateButton>
      );
    } else {
      return (
        <CartLineUpdateButton lines={[{ id: lineId, quantity: prevQuantity }]}>
          <button
            aria-label="Decrease quantity"
            disabled={isOptimistic}
          >
            -
          </button>
        </CartLineUpdateButton>
      );
    }
  };

  return (
    <div className="mx-auto">
      <div className="flex justify-center text-center items-center">
        {handleDecrement()}
        <span className='text-[32px] font-medium'>{quantity}</span>
        <CartLineUpdateButton lines={[{ id: lineId, quantity: nextQuantity }]}>
          <button
            aria-label="Increase quantity"
            disabled={isOptimistic}
            className='ml-[10px]'
          >
            +
          </button>
        </CartLineUpdateButton>
      </div>
    </div>
  );
}


// Cart Line Update Button
function CartLineUpdateButton({ children, lines }: { children: React.ReactNode; lines: CartLineUpdateInput[]; }) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesUpdate}
      inputs={{ lines }}
    >
      {children}
    </CartForm>
  );
}

const ProductSlider: React.FC<ProductSliderProps> = () => {
  const { product } = useProduct();
  const [isBeginning, setIsBeginning] = useState<boolean>(true);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
  useEffect(() => {
    console.log("Product in ProductSlider:", product);
  }, [product]);
  console.log(product)
  
  const collections: Collection[] = useCollections();
  const {
    selectedButton,
    setSelectedButton,
  } = usePricing();

  const [dropdownOpen1, setDropdownOpen1] = useState<Record<number, boolean>>(
    {},
  );
  const [dropdownOpen2, setDropdownOpen2] = useState<Record<number, boolean>>(
    {},
  );
  const [initCollection, setInitCollection] =
    useState<string>("All Perfume");
  const [listProducts, setListProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');


  const handleButtonClick = (button: number, collectionTitle: string) => {
    setSelectedButton(button);
    setInitCollection(collectionTitle);
  };

  // useEffect(() => {
  //   const filteredCollection = collections.find(
  //     (collection) => collection.title === initCollection,
  //   );
  //   if (filteredCollection) {
  //     setListProducts(filteredCollection.products.nodes); 
  //   }
  // }, [initCollection, collections]);
  useEffect(() => {
    if (selectedButton === 1) {
      // Show all products when "All" is selected
      setListProducts(
        collections.flatMap((collection) => collection.products.nodes)
      );
    } else {
      // Mapping selected button to collection titles
      const collectionTitles = ["Men's Perfumes", "Women's Perfumes", 'Unisex Perfumes'];
      const collectionTitle = collectionTitles[selectedButton - 2]; // Adjust index to match collection
      const filteredCollection = collections.find(
        (collection) => collection.title === collectionTitle
      );
      if (filteredCollection) {
        setListProducts(filteredCollection.products.nodes);
      }
    }
  }, [selectedButton, collections]);

const listData = listProducts.map((data)=>data.variants.nodes[0].id)
console.log(listData)
const listDataMain = listData.join()
  const add = {
    selectedVariant: {
      id: listDataMain, 
      availableForSale: true,
    },
    quantity: 1, 
  };
  useEffect(() => {
    console.log("Setting product in context:", listProducts);
    const listData = listProducts.map((data)=>data.variants.nodes[0].id)

  console.log(listData, 'List-Data')
  }, [listProducts]);
  const filteredProducts = listProducts.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const { open } = useAside();
  const { publish, shop, cart, prevCart } = useAnalytics();
  const handleAddToCart = async (variantId: string) => {
    // Set loading state to true for this variant
    setIsLoading((prev) => ({ ...prev, [variantId]: true }));

    try {
      // Simulate the process of adding to cart
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Replace with actual add to cart logic
    } finally {
      // Set loading state to false for this variant
      setIsLoading((prev) => ({ ...prev, [variantId]: false }));
    }
  };
  return (
    <div className={``}>
      <div className="lg:max-w-container w-[90%] mx-auto text-center lg:pt-[60px] pt-[30px] lg:pb-[60px]">
        <div className="flex justify-center">
        {/* <DownArrow1 className={`lg:h-auto h-[55px] stroke-[2px] ${isDarkMode ? 'stroke-white' : 'stroke-primary'}`} color={isDarkMode ? 'white' : '#171717'}/> */}
        </div>
      
        </div>
      <div
        className={`lg:pt-[70px] pt-[30px] lg:border-t-[1px] border-opacity-[0.4] lg:border-b-[1px]`}
      >
        {/* <input
          type="text"
          placeholder="Search for perfumes..."
          value={searchTerm}
          onChange={handleSearch}
          className="mb-4 p-2 border rounded-lg w-full lg:w-1/2"
        /> */}
     
        <div
          className={`2xl:max-w-container relative lg:w-[90%] w-[100%] mx-auto md:py-[30px] py-[30px] lg:py-[50px]`}
        >

<div className="mb-4 p-2 w-full xl:w-[560px] relative">
    <input 
        type="text"
        placeholder="Type your perfume name"
        value={searchTerm}
        onChange={handleSearch}
        className="p-2 border rounded-lg w-full pl-10 pr-4 text-base md:text-lg lg:text-xl"
    />
    <div className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6">
        <img className="w-full h-full" src={search} alt="Search Icon" />
    </div>
</div>
          <div className="flex lg:flex-row flex-col items-center justify-between">
          <div className="lg:block flex justify-center">
            <span
              className={`4k:ml-0 ml-0 gap-x-[10px] inline-flex items-start gap-2.5 px-2.5 py-2 rounded-[8px] bg-[#F4F4F4]`}
            >
              <button
                onClick={() => handleButtonClick(1, "All Perfume")}
                className={`${
                  selectedButton === 1
                    ? ` flex capitalize justify-center items-center gap-2.5 px-5 py-2.5 rounded-lg text-[12px] lg:text-[16px] bg-[#171717] text-white 2xl:text-lg not-italic font-normal leading-[normal] `
                    : ` flex justify-center items-center gap-2.5 px-5 py-2.5 rounded-lg capitalize text-[12px] bg-transparent text-[#28282A] lg:text-[16px] 2xl:text-lg not-italic font-normal leading-[normal] `
                }`}
              >
                All
              </button>
              <button
                onClick={() => handleButtonClick(2, "Men's Perfumes")}
                className={`${
                  selectedButton === 2
                    ? ` flex capitalize justify-center items-center gap-2.5 px-5 py-2.5 rounded-lg text-[12px] lg:text-[16px] bg-[#171717] text-white 2xl:text-lg not-italic font-normal leading-[normal] `
                    : ` flex justify-center items-center gap-2.5 px-5 py-2.5 rounded-lg capitalize text-[12px] bg-transparent text-[#28282A] lg:text-[16px] 2xl:text-lg not-italic font-normal leading-[normal] `
                }`}
              >
                Men
              </button>

              <button
                onClick={() => handleButtonClick(3, "Women's Perfumes")}
                className={`${
                  selectedButton === 3
                    ? ` flex capitalize justify-center items-center gap-2.5 px-5 py-2.5 rounded-lg text-[12px] bg-[#171717] text-white lg:text-[16px] 2xl:text-lg not-italic font-normal leading-[normal] `
                    : ` flex justify-center items-center gap-2.5 px-5 py-2.5 rounded-lg capitalize text-[12px] bg-transparent text-[#28282A] lg:text-[16px] 2xl:text-lg not-italic font-normal leading-[normal] `
                }`}
              >
                Women
              </button>
              <button
                onClick={() => handleButtonClick(4, 'Unisex Perfumes')}
                className={`${
                  selectedButton === 4
                    ? ` flex capitalize justify-center items-center gap-2.5 px-5 py-2.5 rounded-lg text-[12px] bg-[#171717] text-white lg:text-[16px] 2xl:text-lg not-italic font-normal leading-[normal] `
                    : ` flex justify-center items-center gap-2.5 px-5 py-2.5 rounded-lg capitalize text-[12px] bg-transparent text-[#28282A] lg:text-[16px] 2xl:text-lg not-italic font-normal leading-[normal] `
                }`}
              >
                Unisex
              </button>
            </span>
          </div>
{/* Swiper Button */}
<div className="lg:relative lg:z-[1] z-[999]">
                  <button
        className={`custom-prev lg:static absolute top-[55%] left-0 z-[1] ${isBeginning ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isBeginning}
      >
      <img src={arrow1} alt="Arrow" />
      </button>
      <button
        className={`custom-next lg:static absolute top-[55%] right-0 z-[1]  ${isEnd ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isEnd}
      >
        <img src={arrow2} alt="Arrow" />
      </button>
                  </div>
          </div>
          <div className="lg:w-auto md:w-[100%] sm:w-[100%] w-[95%] lg:mx-0 mx-auto">
            {(selectedButton === 1 ||
              selectedButton === 2 ||
              selectedButton === 3 ||
              selectedButton === 4) && (
              <div className="lg:mt-[80px] mt-[20px]">
                <Swiper
                  modules={[Navigation, Mousewheel]}
                  navigation={{
                    nextEl: '.custom-next',
                    prevEl: '.custom-prev',
                  }}
                  spaceBetween={30}
                  slidesPerView="auto"
                  loop={false}
                  allowTouchMove={true}
                  mousewheel={true}
                  className="w-full h-full"
                  onSlideChange={(swiper) => {
                    setIsBeginning(swiper.isBeginning);
                    setIsEnd(swiper.isEnd);
                  }}
                  breakpoints={{
                    640: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    },

                    768: {
                      slidesPerView: 3,
                      spaceBetween: 20,
                    },

                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 20,
                    },
                    1920: {
                      slidesPerView: 3,
                      spaceBetween: 20,
                    },
                  }}
                > 
                  {filteredProducts.map((product, index) => {
  // Safely access the variant at index 2
  const variant = product.variants?.nodes?.[2]; // Ensure the product has a third variant
  const firstVariant = product.variants?.nodes?.[0]; // Also ensure the first variant exists
  const variantId = variant?.id; // Safely access variant ID
  const isAvailable = variant?.availableForSale;
  const productInCart = cart?.lines?.nodes?.find((line) => line.merchandise.id === variantId);
  // Check if firstVariant exists to use in the Link
  const productUrl = firstVariant ? `/products/${product.handle}` : '#';
  return (
                    <SwiperSlide
                      key={product.id}
                      className={`lg:w-full px-20 py-[50px] bg-[#f4f4f4] rounded-2xl`}
                    >
                      <div
                        className={`flex relative flex-col select-none items-center rounded-[var(--md,8px)]`}
                      >
                      <div className="flex flex-col justify-center">
                      <Link 
                      className="flex flex-col items-center justify-center"
                      to={firstVariant ? productUrl : '#'} 
                      prefetch="intent">
                        <img
                          src={
                            product.featuredImage?.url ||
                            '/assets/perfumeCollect.png'
                          }
                          width={300}
                          height={350}
                          alt={product.title}
                          className={``}
                        />
                          <span
                            className={`text-center text-brand mt-[50px] text-[20px]  lg:text-[28px] not-italic font-bold leading-[120%]`}
                          >
                            {product.title}
                          </span>
                          <div className="text-center mt-[15px]"><span className="text-[#010101] text-base font-normal font-['Satoshi'] leading-tight">Retailer Price: £</span><span className="text-[#010101] text-base font-medium font-['Satoshi'] leading-tight">{product.metafields?.[4]?.value ? Math.floor(Number(product.metafields[4].value)) 
    : 0}</span></div>
<div className="flex-col justify-center items-center gap-[25px] flex">
<div className="text-center 4k:h-auto h-[50px] mt-[15px]"><span className="text-[#010101]/80 text-lg font-normal font-['Satoshi'] leading-snug">Smells Like: </span><span className="text-[#010101] text-lg font-medium font-['Satoshi'] leading-snug">{product.metafields[0]?.value.replace('[' ,'').replace(']', '').replace('"', '').replace('"', '')}</span></div>
</div>
</Link>
                          
                          <span className="flex flex-col justify-center">
                            
                          {productInCart ? (
                            isLoading[variantId] ? <ClipLoader color="#000" loading={true} size={24} /> :
                  <CartLineQuantity line={productInCart as CartLine} />
                )
                              :
                              variant ? (
                                isLoading[variantId] ? 
                                  <ClipLoader color="#000" loading={true} size={24} />:
                                <AddToCartButton
                                  className={`w-[220px] flex mx-auto items-center justify-center gap-2.5 text-center text-[16px] lg:text-2xl not-italic font-medium leading-[120%] px-5 py-[10px] rounded-[var(--sm,4px)] mt-[25px] bg-primary text-white`}
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
                            
                                
                          </span>
                        </div>
                      </div>
                      
                    </SwiperSlide>
                   );
                  })}
                 {/* <div className="lg:hidden block">
                  <button
        className={`custom-prev absolute top-[50%] tranlate-y-[-50%] left-0 z-[99999] text-8xl ${isBeginning ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isBeginning}
      >
      <img src={arrow1} alt="Arrow" />
      </button>
      <button
        className={`custom-next absolute top-[50%] tranlate-y-[-50%] right-0 z-[99999] text-8xl ${isEnd ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isEnd}
      >
        <img src={arrow2} alt="Arrow" />
      </button>
                  </div> */}
                </Swiper>
              
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;
