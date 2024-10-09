import {JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, Suspense, useEffect, useState} from 'react';
import {defer, redirect, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {
  Await,
  Link,
  useLoaderData,
  type MetaFunction,
  type FetcherWithComponents,
} from '@remix-run/react';
import type {
  ProductFragment,
  ProductVariantsQuery,
  ProductVariantFragment,
  SellingPlanFragment,
} from 'storefrontapi.generated';
import {
  Image,
  Money,
  VariantSelector,
  type VariantOption,
  getSelectedProductOptions,
  CartForm,
  type OptimisticCartLine,
  Analytics,
  type CartViewPayload,
  useAnalytics,
} from '@shopify/hydrogen';
import type {CurrencyCode, SelectedOption} from '@shopify/hydrogen/storefront-api-types';
import {getVariantUrl} from '~/lib/variants';
import {useAside} from '~/components/Aside';
import {
  SellingPlanSelector,
  type SellingPlanGroup,
} from '~/components/SellingPlanSelector';
import { ProductProvider, useProduct } from 'public/utils/ProductsContext';
import EvokedBrand from '~/pages/Product-page/EvokedBrand';
import TryFirst from '~/pages/Product-page/TryFirst';
import OtherBrands from '~/pages/Product-page/OtherBrands';
import StartQuiz from '~/pages/Product-page/StartQuiz';
import Footer from '~/pages/Collection-page/Footer';
import AccordionForProduct from '~/pages/Product-page/Accordion';
import ScentCard from '~/pages/Product-page/ScentCard';
import Accordion from '~/components/Accordion';
import Obsessed from '~/pages/Landing-page/Obsessed';
import { useSwipeable } from 'react-swipeable';
export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: `Hydrogen | ${data?.product.title ?? ''}`}];
};

export async function loader({ params, request, context }: LoaderFunctionArgs) {
  const { handle } = params;
  const { storefront } = context;

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  // Fetch the product data using the handle
  const [{ product }] = await Promise.all([
    storefront.query(PRODUCT_QUERY, {
      variables: { handle, selectedOptions: getSelectedProductOptions(request) },
    }),
  ]);

  if (!product?.id) {
    throw new Response(null, { status: 404 });
  }

  const selectedSellingPlanId =
    new URL(request.url).searchParams.get('selling_plan') ?? null;
  const selectedSellingPlan =
    product.sellingPlanGroups.nodes?.[0]?.sellingPlans.nodes?.find(
      (sellingPlan: SellingPlanFragment) =>
        sellingPlan.id === selectedSellingPlanId,
    ) ?? null;

  if (product.sellingPlanGroups.nodes?.length && !selectedSellingPlan) {
    const firstSellingPlanId =
      product.sellingPlanGroups.nodes[0].sellingPlans.nodes[0].id;
    return redirect(
      `/products/${product.handle}?${new URLSearchParams({
        selling_plan: firstSellingPlanId,
      }).toString()}`,
    );
  }

  const firstVariant = product.variants.nodes[0];
  const firstVariantIsDefault = Boolean(
    firstVariant.selectedOptions.find(
      (option: SelectedOption) =>
        option.name === 'Title' && option.value === 'Default Title',
    ),
  );

  if (firstVariantIsDefault) {
    product.selectedVariant = firstVariant;
  } else {
    if (!product.selectedVariant) {
      throw redirectToFirstVariant({ product, request });
    }
  }

  const variants = context.storefront
    .query(VARIANTS_QUERY, {
      variables: { handle: params.handle! },
    })
    .catch((error) => {
      console.error(error);
      return null;
    });

  return defer({
    product,
    variants,
    selectedSellingPlan,
  });
}

interface Product {
  handle: any;
  id: string;
  title: string;
  featuredImage: {
    url: string;
    altText: string;
  };
  variants: {
    nodes: {
      availableForSale: any;
      id: string;
      priceV2: {
        amount: string;
      };
    }[];
  };
}

interface RelatedProductsProps {
  relatedProductIds: string[];
  mainProduct: any
}

const SHOPIFY_API_URL = 'https://beevoked.myshopify.com/api/2024-04/graphql.json'; 
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = '968ca262e023bf49abf2b5e6f279e497'; 
const RELATED_PRODUCTS_FRAGMENT = `#graphql
  fragment RelatedProduct on Product {
    id
    handle
    title
    vendor
    descriptionHtml
    featuredImage {
      url
      altText
    }
    options {
      name
      values
    }
    variants(first: 3) {
      nodes {
        id
        availableForSale
        selectedOptions {
          name
          value
        }
      }
    }
    metafields(
      identifiers: [
        {namespace: "custom", key: "smells_like_"},
        {namespace: "custom", key: "feels_like"},
        {namespace: "custom", key: "top_notes"},
        {namespace: "custom", key: "bottom_notes"},
        {namespace: "custom", key: "competitor_s_retail_price"},
        {namespace: "custom", key: "mix_match"}
      ]
    ) {
      key
      value
      namespace
    }
    sellingPlanGroups(first: 10) {
      nodes {
        name
        sellingPlans(first: 10) {
          nodes {
            id
            name
          }
        }
      }
    }
  }
`;

export function RelatedProducts({ relatedProductIds, mainProduct }: RelatedProductsProps) {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchRelatedProducts() {
      if (relatedProductIds.length === 0) return;

      const query = `#graphql
      query RelatedProducts($ids: [ID!]!) {
        nodes(ids: $ids) {
          ... on Product {
            ...RelatedProduct
          }
        }
      }
      ${RELATED_PRODUCTS_FRAGMENT}
    `;

      const response = await fetch(SHOPIFY_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
        },
        body: JSON.stringify({
          query,
          variables: { ids: relatedProductIds.map(id => `gid://shopify/Product/${id}`) },
        }),
      });

      if (!response.ok) {
        console.error('Error fetching related products:', response.statusText);
        return;
      }

      const { data }: any = await response.json();
      setRelatedProducts(data.nodes);
    }
    console.log(relatedProducts)
    fetchRelatedProducts();
  }, [relatedProductIds]);
  const { open } = useAside();
  const { publish, shop, cart, prevCart } = useAnalytics();
  return (
    <div className="pt-[200px]">
      <div className="flex justify-center items-center gap-10">
        
      <ScentCard relatedProduct={relatedProducts} mainProduct={mainProduct}/>
      </div>
    </div>
  );
}
/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({
  context,
  params,
  request,
}: LoaderFunctionArgs) {
  const {handle} = params;
  const {storefront} = context;

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  const [{product}] = await Promise.all([
    storefront.query(PRODUCT_QUERY, {
      variables: {handle, selectedOptions: getSelectedProductOptions(request)},
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }
  const selectedSellingPlanId = new URL(request.url).searchParams.get('selling_plan') ?? null;
// 3. Get the selected selling plan from the product

const selectedSellingPlan = product.sellingPlanGroups.nodes?.[0]?.sellingPlans.nodes?.find(
    (sellingPlan: SellingPlanFragment) =>
      sellingPlan.id === selectedSellingPlanId,
  ) ?? null;
  if (product.sellingPlanGroups.nodes?.length && !selectedSellingPlan) {
    const firstSellingPlanId =
      product.sellingPlanGroups.nodes[0].sellingPlans.nodes[0].id;
    return redirect(
      `/products/${product.handle}?${new URLSearchParams({
        selling_plan: firstSellingPlanId,
      }).toString()}`,
    );
  }
  const firstVariant = product.variants.nodes[0];
  const firstVariantIsDefault = Boolean(
    firstVariant.selectedOptions.find(
      (option: SelectedOption) =>
        option.name === 'Title' && option.value === 'Default Title',
    ),
  );

  if (firstVariantIsDefault) {
    product.selectedVariant = firstVariant;
  } else {
    // if no selected variant was returned from the selected options,
    // we redirect to the first variant's url with it's selected options applied
    if (!product.selectedVariant) {
      throw redirectToFirstVariant({product, request});
    }
  }

  return {
    product,
    selectedSellingPlan,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context, params}: LoaderFunctionArgs) {
  // In order to show which variants are available in the UI, we need to query
  // all of them. But there might be a *lot*, so instead separate the variants
  // into it's own separate query that is deferred. So there's a brief moment
  // where variant options might show as available when they're not, but after
  // this deffered query resolves, the UI will update.
  const variants = context.storefront
    .query(VARIANTS_QUERY, {
      variables: {handle: params.handle!},
    })
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    variants,
  };
}

function redirectToFirstVariant({
  product,
  request,
}: {
  product: ProductFragment;
  request: Request;
}) {
  const url = new URL(request.url);
  const firstVariant = product.variants.nodes[0];

  return redirect(
    getVariantUrl({
      pathname: url.pathname,
      handle: product.handle,
      selectedOptions: firstVariant.selectedOptions,
      searchParams: new URLSearchParams(url.search),
    }),
    {
      status: 302,
    },
  );
}
export default function ProductAll() {

  return (
    <div>
<Product/>
<ProductDetails/>
    </div>
  );
}
export function Product() {
  const data = useLoaderData<typeof loader>();
  const {product, variants, selectedSellingPlan} = data
  const {selectedVariant} = product;
  const { setProduct } = useProduct();
  const mixMatchMetafield = product.metafields?.[5]?.key === 'mix_match' 
    ? product.metafields[5] 
    : null;

  // Parse the mix_match value and cast to string[] if it exists
  const relatedProductIds: string[] = mixMatchMetafield?.value
    ? (JSON.parse(mixMatchMetafield.value) as string[]).map((gid: string) => gid.split('/').pop() as string)
    : [];
  useEffect(() => {
    console.log("Setting product in context:", product);
    setProduct(product);
  }, [product, setProduct]);
  const images = selectedVariant.product.images?.edges || []
  return (
    <div className='lg:max-w-container w-[90%] 4k:max-w-container2 mx-auto'>
    <div className="flex lg:flex-row flex-col justify-center ">
      <div className="lg:w-1/2 ">
    <ProductImages images={images} />
      </div>
      <div className="lg:w-1/2 ">
      <ProductMain
        selectedVariant={selectedVariant}
        product={product}
        variants={variants}
        selectedSellingPlan={selectedSellingPlan}
      />
      <Analytics.ProductView
        data={{
          products: [
            {
              id: product.id,
              title: product.title,
              price: selectedVariant?.price.amount || '0',
              vendor: product.vendor,
              variantId: selectedVariant?.id || '',
              variantTitle: selectedVariant?.title || '',
              quantity: 1,
            },
          ],
        }}
      />
      </div>
      
    </div>
    {relatedProductIds.length > 0 && (
        <RelatedProducts relatedProductIds={relatedProductIds} mainProduct={product} />
      )}
      
    </div>
  );
}

function ProductDetails() {
return(
  <main>
{/* <EvokedBrand/> */}
      <Obsessed/>
      <TryFirst/>
      <OtherBrands/>
        <StartQuiz/>
        <Accordion/>
        <Footer/>
        </main>
)
}

function ProductImages({ images }: { images: ProductVariantFragment['product']['images']['edges'] }) {
  const [mainImage, setMainImage] = useState(images[0]?.node);
  const [currentPage, setCurrentPage] = useState(0);
  const imagesPerPage = 4; 
  const totalPages = Math.ceil(images.length / imagesPerPage);
  if (!images || images.length === 0) {
    return <div className="product-image">No images available</div>;
  }
  const startIndex = currentPage * imagesPerPage;
  const displayedImages = images.slice(startIndex, startIndex + imagesPerPage);

  // Swipeable configuration
  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    trackTouch: true,
  });

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageChange = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };
  return (
    <div className="flex lg:flex-row flex-col-reverse lg:gap-x-[100px] gap-[50px] justify-center items-center">
    <div className="flex lg:flex-col gap-6 justify-center">
      <div className="lg:hidden block">
          <div {...handlers} className="flex gap-2 overflow-hidden ">
            {displayedImages.map(({ node: image }: any) => (
              <img
                key={image.id}
                src={image.url}
                alt={image.altText || 'Thumbnail Image'}
                className={`w-[71px] h-[71px] rounded-lg cursor-pointer transition duration-200 ${
                  image.id === mainImage?.id ? 'border-2 border-black' : 'border-transparent'
                }`}
                onClick={() => setMainImage(image)}
              />
            ))}
          </div>
          
          {/* Pagination bullets */}
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }).map((_, pageIndex) => (
              <button
                key={pageIndex}
                onClick={() => handlePageChange(pageIndex)}
                className={`w-3 h-3 mx-1 rounded-full transition duration-200 ${
                  currentPage === pageIndex ? 'bg-[#010101B2]' : 'bg-[#0E0E0E33]'
                }`}
              />
            ))}
          </div>
        </div>
      <div className="hidden lg:block">
        {images.map(({ node: image }: any) => (
          <img
            key={image.id}
            src={image.url}
            alt={image.altText || 'Thumbnail Image'}
            className={`w-[121px] h-[121px] object-cover rounded-lg cursor-pointer transition duration-200 ${image.id === mainImage?.id ? 'border-2 border-black' : 'border-transparent'}`}
            onClick={() => setMainImage(image)} // Set clicked image as main image
          />
        ))}
      </div>
      </div>

      {/* Main Image Section */}
      <div className="flex justify-center items-center lg:w-[328px] h-[580px] shadow-md">
        <img
          src={mainImage?.url}
          alt={mainImage?.altText || 'Product Image'}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </div>
  );
}


function ProductMain({
  selectedVariant,
  product,
  variants,
  selectedSellingPlan,
}: {
  product: ProductFragment;
  selectedVariant: ProductFragment['selectedVariant'];
  variants: Promise<ProductVariantsQuery | null>;
  selectedSellingPlan: SellingPlanFragment | null;
}) {
  const {title, descriptionHtml, sellingPlanGroups,} = product;
  return (
    <div className="product-main">
      <h1>{title}</h1>
      <ProductPrice selectedVariant={selectedVariant} selectedSellingPlan={selectedSellingPlan} />
      <br />
      <Suspense
        fallback={
          <ProductForm
            product={product}
            selectedVariant={selectedVariant}
            variants={[]}
            selectedSellingPlan={selectedSellingPlan}
            sellingPlanGroups={sellingPlanGroups}
          />
        }
      >
        <Await
          errorElement="There was a problem loading product variants"
          resolve={variants}
        >
          {(data) => (
            <ProductForm
              product={product}
              selectedVariant={selectedVariant}
              variants={data?.product?.variants.nodes || []}
              selectedSellingPlan={selectedSellingPlan}
              sellingPlanGroups={sellingPlanGroups}
            />
          )}
        </Await>
      </Suspense>
      <br />
      <br />
      <p>
        <strong>Description</strong>
      </p>
      <br />
      <div dangerouslySetInnerHTML={{__html: descriptionHtml}} />
      <br />
    </div>
  );
}

function ProductPrice({
  selectedVariant,
  selectedSellingPlan,
}: {
  selectedVariant: ProductFragment['selectedVariant'];
  selectedSellingPlan: SellingPlanFragment | null;
}) {
  if (selectedSellingPlan) {
    return (
      <SellingPlanPrice
        selectedSellingPlan={selectedSellingPlan}
        selectedVariant={selectedVariant}
      />
    );
  }

  return (
    <div className="product-price">
      {selectedVariant?.price && <Money data={selectedVariant.price} />}
      {selectedVariant?.price?.amount} {selectedVariant?.price?.currencyCode}
    </div>
  );
}

type SellingPlanPrice = {
  amount: number;
  currencyCode: CurrencyCode;
};
function SellingPlanPrice({
  selectedSellingPlan,
  selectedVariant,
}: {
  selectedSellingPlan: SellingPlanFragment;
  selectedVariant: ProductFragment['selectedVariant'];
}) {
  if (!selectedVariant) {
    return null;
  }

  const sellingPlanPriceAdjustments = selectedSellingPlan?.priceAdjustments;

  if (!sellingPlanPriceAdjustments?.length) {
    return <Money data={selectedVariant.price} />;
  }

  const selectedVariantPrice: SellingPlanPrice = {
    amount: parseFloat(selectedVariant.price.amount),
    currencyCode: selectedVariant.price.currencyCode,
  };

  const sellingPlanPrice: SellingPlanPrice = sellingPlanPriceAdjustments.reduce(
    (acc, adjustment) => {
      console.log('Adjustment being applied:', adjustment);

      switch (adjustment.adjustmentValue.__typename) {
        case 'SellingPlanFixedAmountPriceAdjustment':
          return {
            amount: acc.amount + parseFloat(adjustment.adjustmentValue.adjustmentAmount.amount),
            currencyCode: acc.currencyCode,
          };
        case 'SellingPlanFixedPriceAdjustment':
          return {
            amount: parseFloat(adjustment.adjustmentValue.price.amount),
            currencyCode: adjustment.adjustmentValue.price.currencyCode,
          };
        case 'SellingPlanPercentagePriceAdjustment':
          return {
            amount: acc.amount * (1 - adjustment.adjustmentValue.adjustmentPercentage / 100),
            currencyCode: acc.currencyCode,
          };
        default:
          return acc;
      }
    },
    selectedVariantPrice
  );

  console.log('Final calculated price:', sellingPlanPrice.amount);

  return (
    <div className="selling-plan-price">
      <Money
        data={{
          amount: `${sellingPlanPrice.amount}`,
          currencyCode: sellingPlanPrice.currencyCode,
        }}
      />
    </div>
  );
}


function SellingPlanGroup({
  sellingPlanGroup,
}: {
  sellingPlanGroup: SellingPlanGroup;
}) {
  return (
    <div key={sellingPlanGroup.name}>
      <p className="mb-2">
        <strong>{sellingPlanGroup.name}:</strong>
      </p>
      {sellingPlanGroup.sellingPlans.nodes.map((sellingPlan) => {
        return (
          <Link
            key={sellingPlan.id}
            prefetch="intent"
            to={sellingPlan.url}
            className={`selling-plan ${
              sellingPlan.isSelected ? 'selected' : 'unselected'
            }`}
            preventScrollReset
            replace
          >
            <p>
              {sellingPlan.options.map(
                (option) => `${option.name} ${option.value}`,
              )}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
function ProductForm({
  product,
  selectedVariant,
  variants,
  selectedSellingPlan,
  sellingPlanGroups,
}: {
  product: ProductFragment;
  selectedVariant: ProductFragment['selectedVariant'];
  variants: Array<ProductVariantFragment>;
  selectedSellingPlan: SellingPlanFragment | null;
  sellingPlanGroups: ProductFragment['sellingPlanGroups'];
}) {
  const { open } = useAside();
  const { publish, shop, cart, prevCart } = useAnalytics();

  const handleAddToCartOrSubscribe = () => {
    const lines = selectedVariant
      ? [
          {
            merchandiseId: selectedVariant.id,
            sellingPlanId: selectedSellingPlan?.id,
            quantity: 1,
          },
        ]
      : [];

    // Check for quantity limits and handle them accordingly
    open('cart');
    publish('cart_viewed', {
      cart,
      prevCart,
      shop,
      url: window.location.href || '',
    } as CartViewPayload);
  };

  const handleAddToCart = () => {
    const lines = selectedVariant
      ? [
          {
            merchandiseId: selectedVariant.id,
            quantity: 1,
            selectedVariant,
          },
        ]
      : [];

    // Open cart and publish analytics
    open('cart');
    publish('cart_viewed', {
      cart,
      prevCart,
      shop,
      url: window.location.href || '',
    } as CartViewPayload);
  };

  const buttonText = sellingPlanGroups.nodes
    ? selectedSellingPlan
      ? 'Subscriptions'
      : 'Select a subscription'
    : selectedVariant?.availableForSale
    ? 'Add to cart'
    : 'Sold out';

  return (
    <div className="product-form">
      <SellingPlanSelector
        sellingPlanGroups={sellingPlanGroups}
        selectedSellingPlan={selectedSellingPlan}
      >
        {({ sellingPlanGroup }) => (
          <SellingPlanGroup
            key={sellingPlanGroup.name}
            sellingPlanGroup={sellingPlanGroup}
          />
        )}
      </SellingPlanSelector>
      <br />
      <br />
      {/* Subscription Button */}
      <AddToCartButton
        className={`w-[220px] flex mx-auto items-center justify-center gap-2.5 text-center text-[16px] lg:text-2xl not-italic font-medium leading-[120%] px-5 py-[10px] rounded-[var(--sm,4px)] mt-[25px] bg-primary text-white`}
        disabled={!selectedVariant || !selectedVariant.availableForSale}
        onClick={handleAddToCartOrSubscribe}
        lines={
          selectedVariant
            ? [
                {
                  merchandiseId: selectedVariant.id,
                  sellingPlanId: selectedSellingPlan?.id,
                  quantity: 1,
                },
              ]
            : []
        }
      >
        {buttonText}
      </AddToCartButton>
      <br />
      <VariantSelector
        handle={product.handle}
        options={product.options}
        variants={variants}
      >
        {({ option }) => <ProductOptions key={option.name} option={option} />}
      </VariantSelector>
      {/* Add to Cart Button for one-time purchase */}
      <AddToCartButton
        className={`w-[220px] flex mx-auto items-center justify-center gap-2.5 text-center text-[16px] lg:text-2xl not-italic font-medium leading-[120%] px-5 py-[10px] rounded-[var(--sm,4px)] mt-[25px] bg-primary text-white`}
        disabled={!selectedVariant || !selectedVariant.availableForSale}
        onClick={handleAddToCart}
        lines={
          selectedVariant
            ? [
                {
                  merchandiseId: selectedVariant.id,
                  quantity: 1,
                  selectedVariant,
                },
              ]
            : []
        }
      >
        {selectedVariant?.availableForSale ? 'Add to cart' : 'Sold out'}
      </AddToCartButton>
      <BuyNow lines={
        selectedVariant
          ? [
              {
                merchandiseId: selectedVariant.id,
                quantity: 1,
                selectedVariant,
              },
            ]
          : []
      }/>
    </div>
  );
}



function ProductOptions({option}: {option: VariantOption}) {
  return (
    <div className="product-options" key={option.name}>
      <h5>{option.name}</h5>
      <div className="product-options-grid">
        {option.values.map(({value, isAvailable, isActive, to}) => {
          return (
            <Link
              className="product-options-item"
              key={option.name + value}
              prefetch="intent"
              preventScrollReset
              replace
              to={to}
              style={{
                border: isActive ? '1px solid black' : '1px solid transparent',
                opacity: isAvailable ? 1 : 0.3,
              }}
            >
              {value}
            </Link>
          );
        })}
      </div>
      <br />
    </div>
  );
}

export function AddToCartButton({
  analytics,
  children,
  disabled,
  lines,
  onClick,
  className
}: {
  analytics?: unknown;
  children: React.ReactNode;
  disabled?: boolean;
  className:string;
  lines: Array<OptimisticCartLine>;
  onClick?: () => void;
}) {
  return (
    <>
    <CartForm route="/cart" inputs={{lines}} action={CartForm.ACTIONS.LinesAdd}>
      {(fetcher: FetcherWithComponents<any>) => (
        <>
          <input
            name="analytics"
            type="hidden"
            value={JSON.stringify(analytics)}
          />
          <button
            type="submit"
            onClick={onClick}
            disabled={disabled ?? fetcher.state !== 'idle'}
            className={className}
          >
            {children}
          </button>
        </>
      )}
    </CartForm>
 
    </>
  );
}
function BuyNow({
  lines,
}: {
  lines: Array<OptimisticCartLine>;
}) {
  return (
    <>
    <CartForm
        route="/cart"
        action={CartForm.ACTIONS.LinesAdd}
        inputs={{
          lines,
         redirectToCheckout: true,
        }}
      >
        <button>
          Buy Now
        </button>
      </CartForm>
    </>
  );
}

export const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
       images(first: 10) {
      edges {
        node {
          id
          width
          url
          height
          altText
        }
      }
    }
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }
` as const;
export const SELLING_PLAN_FRAGMENT = `#graphql
  fragment SellingPlanMoney on MoneyV2 {
    amount
    currencyCode
  }
  fragment SellingPlan on SellingPlan {
    id
    options {
      name
      value
    }
    priceAdjustments {
      adjustmentValue {
        ... on SellingPlanFixedAmountPriceAdjustment {
          __typename
          adjustmentAmount {
            ... on MoneyV2 {
               ...SellingPlanMoney
            }
          }
        }
        ... on SellingPlanFixedPriceAdjustment {
          __typename
          price {
            ... on MoneyV2 {
              ...SellingPlanMoney
            }
          }
        }
        ... on SellingPlanPercentagePriceAdjustment {
          __typename
          adjustmentPercentage
        }
      }
      orderCount
    }
    recurringDeliveries
    checkoutCharge {
      type
      value {
        ... on MoneyV2 {
          ...SellingPlanMoney
        }
        ... on SellingPlanCheckoutChargePercentageValue {
          percentage
        }
      }
    }
 }
` as const;

//  8. Add the SellingPlanGroup fragment to the Product fragment
export const SELLING_PLAN_GROUP_FRAGMENT = `#graphql
  fragment SellingPlanGroup on SellingPlanGroup {
    name
    options {
      name
      values
    }
    sellingPlans(first:10) {
      nodes {
        ...SellingPlan
      }
    }
  }
  ${SELLING_PLAN_FRAGMENT}
` as const;
export const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    metafields(
              identifiers: [
                {namespace: "custom", key: "smells_like_"},
          {namespace: "custom", key: "feels_like"},
          {namespace: "custom", key: "top_notes"},
          {namespace: "custom", key: "bottom_notes"},
          {namespace: "custom", key: "competitor_s_retail_price"},
          {namespace: "custom", key: "mix_match"},
          {namespace: "custom", key: "season"},
              ]
            ) {
              key
              value
              namespace
            }
    vendor
    handle
    descriptionHtml
    description
    options {
      name
      values
    }
    selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    variants(first: 1) {
      nodes {
        ...ProductVariant
      }
    }
    seo {
      description
      title
    }
       sellingPlanGroups(first:10) {
      nodes {
        ...SellingPlanGroup
      }
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
  ${SELLING_PLAN_GROUP_FRAGMENT}
` as const;

export const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
` as const;

export const PRODUCT_VARIANTS_FRAGMENT = `#graphql
  fragment ProductVariants on Product {
    variants(first: 250) {
      nodes {
        ...ProductVariant
      }
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
` as const;

export const VARIANTS_QUERY = `#graphql
  ${PRODUCT_VARIANTS_FRAGMENT}
  query ProductVariants(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...ProductVariants
    }
  }
` as const;
