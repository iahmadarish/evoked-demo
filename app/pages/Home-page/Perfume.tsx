import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useGlobal } from "public/utils/GlobalContext";
import { CartViewPayload, Image, useAnalytics } from "@shopify/hydrogen";
import { Link } from "@remix-run/react";
import { Star12, Dropdown, AddToSet } from "public/utils/Helpers";
import { AddToCartButton } from "~/routes/products.$handle";
import { useAside } from "~/components/Aside";
import { useVariantUrl } from "~/lib/variants";

interface ProductProps {
  products: any;
  variants: any;
  carts: any;
}
interface DropdownState {
  ingredients: boolean;
  notes: boolean;
}
const Perfume: React.FC<ProductProps> = ({
  carts,
  products,
  variants,
}) => {
  const { quantities, setQuantities } = useGlobal();
console.log(variants)
console.log(products)
  const [dropdownStates, setDropdownStates] = useState<DropdownState>({
    ingredients: false,
    notes: false,
  });

  const toggleDropdown = (type: keyof DropdownState) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [type]: !prevState[type],
    }));
  };
  const { open } = useAside();
  const { publish, shop, cart, prevCart } = useAnalytics();
  const productVariants = products?.variants?.nodes;
  const thirdVariant = productVariants?.[2];

  const isAvailableForSale = thirdVariant?.availableForSale;
  const hasSelectedOptions = thirdVariant?.selectedOptions;
  const variant = products.variants.nodes[0];
  const variantUrl = useVariantUrl(products.handle, variant.selectedOptions);
console.log(products)
console.log(productVariants)
  return (
      <div
        className={`flex flex-col items-center justify-center select-none`}
      >
          <Link to={variantUrl} key={products.id} prefetch="intent">
          <div>
        
        <Image data={products.images.nodes[0]} alt={products.handle} width={250} height={200} />
          </div>
          </Link>
        <span className={`text-center mt-2 text-brand`}>
          {products.title}
        </span>
        <div className="flex items-end mt-[10px] justify-center">
          <div className="flex items-center">
            <Star12 color={"#28282A"} />
            <Star12 color={"#28282A"} />
            <Star12 color={"#28282A"} />
            <Star12 color={"#28282A"} />
            <Star12 color={"#28282A"} />
          </div>
          <span
            className={`text-center ml-[5px] text-base leading-[75%] not-italic font-medium text-[color:var(--Brand,#28282A)]`}
          >
            (123)
          </span>
        </div>
        <div className=" mx-auto mt-[25px] flex flex-col justify-center">
        <h6 className={` text-center lg:h-[50px] text-[14px] lg:text-lg not-italic font-normal leading-[120%] text-[color:var(--Brand,#28282A)]`}>
        {'Smells like:'+ ' '}
        <span className={` text-center text-[12px] lg:text-[16px] xl:text-[18px] not-italic font-light leading-[120%] text-[color:var(--Brand,#28282A)]`}>{products.metafields[0]?.value.replace('[' ,'').replace(']', '').replace('"', '').replace('"', '')}</span>
                      </h6>
        
          <div
            className={`inline-flex mt-[10px] mx-auto flex-col justify-center items-center px-2.5 py-[5px] rounded-[var(--sm,4px)] border border-solid text-[#28282A] border-[color:var(--Brand,#28282A)]`}
          >
            <button
              className={`flex w-48 justify-between items-center text-[#28282A] text-center text-[14px] lg:text-lg not-italic leading-[120%]`}
              onClick={() => toggleDropdown("ingredients")}
            >
              Ingredients <Dropdown color={"#28282A"} />
            </button>
            {dropdownStates.ingredients && (
              <div
                className={`flex w-48 lg:text-[14px] text-[12px] mt-[10px] items-center text-[#28282A] text-start`}
              >
                {products.ingredients}
              </div>
            )}
            <div className="w-[192px] h-[1px] bg-[#28282A] mx-auto my-[10px] "></div>

            {/* Notes Button */}
            <button
              className={`flex w-48 justify-between items-center text-[#28282A] text-center text-[14px] lg:text-lg not-italic leading-[120%]`}
              onClick={() => toggleDropdown("notes")}
            >
              Notes <Dropdown color={"#28282A"} />
            </button>
            {dropdownStates.notes && (
              <div
                className={`flex w-48 lg:text-[14px] text-[12px] mt-[10px] items-center text-[#28282A] text-start`}
              >
                {products.notes}
              </div>
            )}
          </div>
          <AddToCartButton
  className={`w-[220px] flex  mx-auto items-center justify-center gap-2.5  text-center text-[16px] lg:text-2xl not-italic font-medium leading-[120%] px-5 py-[10px] rounded-[var(--sm,4px)] bg-primary text-white mt-[25px] `}
  disabled={!hasSelectedOptions || !isAvailableForSale}
  onClick={() => {
    open('cart');
    publish('cart_viewed', {
      cart,
      prevCart,
      shop,
      url: window.location.href || '',
    } as CartViewPayload);
  }}
  lines={
    hasSelectedOptions
      ? [
          {
            merchandiseId: thirdVariant.id,
            quantity: 1,
          },
        ]
      : []
  }
>
  {isAvailableForSale ? 'Add to cart' : 'Sold out'}
</AddToCartButton>
         
          
        </div>
      </div>
  );
};

export default Perfume;

