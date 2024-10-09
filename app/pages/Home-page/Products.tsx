import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useGlobal } from "public/utils/GlobalContext";
import { CartViewPayload, Image, useAnalytics } from "@shopify/hydrogen";
import { Link } from "@remix-run/react";
import { Star12, Dropdown, AddToSet } from "public/utils/Helpers";
import { AddToCartButton } from "~/routes/products.$handle";
import { useAside } from "~/components/Aside";

interface ProductProps {
  products: any;
  variants: any;
  isDiscoveryKit?: boolean; 
}

interface DropdownState {
  ingredients: boolean;
  notes: boolean;
}

const Product: React.FC<ProductProps> = ({
  products,
  variants,
  isDiscoveryKit = false, // Default to false if not provided
}) => {
  const { quantities, setQuantities } = useGlobal();

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

  // const productVariants = products?.variants?.nodes || [];
  // console.log("All product variants:", productVariants);

  // productVariants.forEach((variant: any) => {
  //   console.log("Variant ID:", variant.id);
  //   console.log("Selected Options:", variant.selectedOptions);
  // });

  // const selectedVariant = isDiscoveryKit 
  //   ? productVariants.find((variant: any) => {
  //       console.log("Checking 5ml variant:", variant.selectedOptions);
  //       return variant.selectedOptions.some((opt: any) => opt.name === 'Size' && opt.value === '5ml');
  //     })
  //   : productVariants.find((variant: any) => {
  //       console.log("Checking 100ml or 50ml variant:", variant.selectedOptions);
  //       return variant.selectedOptions.some((opt: any) => opt.name === 'Size' && (opt.value === '100ml' || opt.value === '50ml'));
  //     });

  // if (!selectedVariant) {
  //   console.error("Variant not found for the given size.");
  // } else {
  //   console.log("Selected Variant:", selectedVariant);
  // }

  // const hasSelectedOptions = selectedVariant?.selectedOptions?.length > 0;
  // const isAvailableForSale = selectedVariant?.availableForSale ?? true;
  // console.log("Available for Sale:", isAvailableForSale);

  const { open } = useAside();
  const { publish, shop, cart, prevCart } = useAnalytics();

  return (
    <div
      className={`inline-flex p-5 lg:w-[372px] mx-auto justify-center flex-col select-none items-center gap-[25px] rounded-[var(--md,8px)] border border-[color:var(--black,#171717)] border-solid`}
    >
      <Link to={variants} key={products.id} prefetch="intent">
        <div>
          {products.featuredImage && (
            <Image
              alt={products.featuredImage.altText || products.title}
              width={180}
              data={products.featuredImage}
            />
          )}
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
      <div className="w-[300px] mx-auto mt-[25px] flex flex-col justify-center">
        <h6
          className={`text-center text-[14px] lg:text-lg not-italic font-normal leading-[120%] text-[color:var(--Brand,#28282A)]`}
        >
          {products.title}
        </h6>
        <div
          className={`inline-flex mt-[10px] mx-auto flex-col justify-center items-center px-2.5 py-[5px] rounded-[var(--sm,4px)] border border-solid text-[#28282A] border-[color:var(--Brand,#28282A)]`}
        >
          {/* Ingredients Button */}
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
        className={`w-[220px] flex mx-auto items-center justify-center gap-2.5 text-center text-[16px] lg:text-2xl not-italic font-medium leading-[120%] px-5 py-[10px] rounded-[var(--sm,4px)] mt-[25px] bg-primary text-white`}
        disabled={!products.variants.nodes[0].selectedOptions || !products.variants.nodes[0].availableForSale}
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
          products.variants.nodes[0].selectedOptions
            ? [
                {
                  merchandiseId: products.variants.nodes[0].id,
                  quantity: 1,
                },
              ]
            : []
        }
      >
        {products.variants.nodes[0]?.availableForSale ? 'Add to cart' : 'Sold out'}
      </AddToCartButton>
      </div>
    </div>
  );
};

export default Product;
