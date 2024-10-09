import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link, type MetaFunction} from '@remix-run/react';
import {Suspense} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import {Image, Money} from '@shopify/hydrogen';
import type {
  FeaturedCollectionFragment,
  RecommendedProductsQuery,
} from 'storefrontapi.generated';
import { GlobalProvider } from 'public/utils/GlobalContext';
import {
  CartForm,
  useOptimisticCart,
  type OptimisticCart,
} from '@shopify/hydrogen';
import type {CartLineUpdateInput} from '@shopify/hydrogen/storefront-api-types';
import type {CartApiQueryFragment} from 'storefrontapi.generated';
import {useVariantUrl} from '~/lib/variants';
import { CART_QUERY_FRAGMENT } from '~/lib/fragments';
export const meta: MetaFunction = () => {
  return [{title: 'Hydrogen | Home'}];
};
type CartLine = OptimisticCart<CartApiQueryFragment>['lines']['nodes'][0];

type CartMainProps = {
  cart: CartApiQueryFragment | null;
  layout: 'page' | 'aside';
};
export async function loader(args: LoaderFunctionArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return defer({...deferredData, ...criticalData});
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context}: LoaderFunctionArgs) {
  const {cart} = context;
  const [{collections}] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {
    featuredCollection: collections.nodes[0],
    cart: cart.get(),
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: LoaderFunctionArgs) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();
  console.log(data)
  // const cart = data.cart
  return (
     <GlobalProvider>
      <div className="">
        <div className="max-w-container mx-auto">

    <Hero/>
{/* <Pricing/>
<SubscribeAndSave/>
              <OneTimePurchase/> */}
    <Await resolve={data.cart}>
        
      {/* <FeaturedCollection collection={data.featuredCollection} /> */}
      <RecommendedProducts products={data.recommendedProducts} cart={data.cart} />
        </Await>
    </div>
    <Main/>
        </div>
    </GlobalProvider>
  );
}

function FeaturedCollection({
  collection,
}: {
  collection: FeaturedCollectionFragment;
}) {
  if (!collection) return null;
  const image = collection?.image;
  return (
    <Link
      className="featured-collection"
      to={`/collections/${collection.handle}`}
    >
      {image && (
        <div className="featured-collection-image">
          <Image data={image} sizes="100vw" />
        </div>
      )}
      <h1>{collection.title}</h1>
    </Link>
  );
}

import { useState, useEffect } from 'react';
import Footer from '~/pages/Home-page/Footer';
import Main from '~/pages/Home-page/Main';
import Product from '~/pages/Home-page/Products';
import Hero from '~/components/Hero';
import Perfume from '~/pages/Home-page/Perfume';
import Pricing from '~/pages/Landing-page/Pricing';
import SubscribeAndSave from '~/pages/Landing-page/Subscription';
import OneTimePurchase from '~/pages/Landing-page/OneTimePurchase';


function RecommendedProducts({ products, cart }: { products: Promise<RecommendedProductsQuery | null>; cart: Promise<CartApiQueryFragment | null>; }) {
  const [cartResolved, setCartResolved] = useState(false);
  const [resolvedCart, setResolvedCart] = useState<CartApiQueryFragment | null>(null);
  const [isBeginning, setIsBeginning] = useState<boolean>(true);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  useEffect(() => {
    cart.then(cartData => {
      setResolvedCart(cartData);
      setCartResolved(true);
    });
  }, [cart]);

  return (
    <div className={` `}>
      <div className={`lg:justify-between border-[color:var(--black,#171717)] lg:items-center px-[20px] items-start flex lg:flex-row flex-col mb-[50px]  `}>
        <div className="flex-col justify-start items-start lg:gap-2.5 inline-flex">
          <div className={`text-zinc-800 2xl:text-5xl lg:text-[38px] text-[20px] font-bold leading-[72px]`}>Best-sellers</div>
          <div className={`text-zinc-800 2xl:text-[22px] lg:text-[18px] text-[12px] font-normal lg:leading-[33px]`}>Shop popular designer-like scents from Collection 1.</div>
        </div>
        <div className="justify-start items-center gap-2.5 mt-[10px] lg:mt-0 flex">
          <Link to='/collections' className='inline-block'>
            <button className={`text-zinc-800 2xl:text-[22px] lg:text-[18px] text-[12px] font-semibold underline lg:leading-[33px]`}>View Collection 1</button>
          </Link>
        </div>
      </div>
      <Await resolve={products}>
        {(response: RecommendedProductsQuery | null) => {
          if (!response || !response.products || !response.products.nodes.length) {
            return <div>No products available</div>;
          }

          return (
            <div className={`flex flex-wrap`}>
              <Swiper
                modules={[Navigation]}
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
                    slidesPerView: 4,
                    spaceBetween: 20,
                  },
                  1920: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                  },
                }}
              >
                {response.products.nodes.map((product) => (
                  <SwiperSlide
                    key={product.id}
                    className={`lg:w-full border border-primary py-[40px] rounded-[8px]`}
                  >
                    <Perfume
                      products={product}
                      key={product.id}
                      carts={cartResolved ? resolvedCart : null}
                      variants={product.variants}
                    />
                  </SwiperSlide>
                ))}
              <button
                className={`custom-prev absolute top-[50%] translate-y-[-50%] left-0 z-[999] text-8xl ${isBeginning ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isBeginning}
              >
                {'<'}
              </button>
              <button
                className={`custom-next absolute top-[50%] translate-y-[-50%] right-0 z-[999] text-8xl ${isEnd ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isEnd}
              >
                {'>'}
              </button>
              </Swiper>
            </div>
          );
        }}
      </Await>
      <br />
    </div>
  );
}





const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
` as const;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
     metafields(
              identifiers: [
                {namespace: "custom", key: "smells_like_"},
          {namespace: "custom", key: "feels_like"},
          {namespace: "custom", key: "top_notes"},
          {namespace: "custom", key: "bottom_notes"},
          {namespace: "custom", key: "competitor_s_retail_price"}
          {namespace: "custom", key: "mix_match"}
              ]
            ) {
              key
              value
              namespace
            }
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
      sellingPlanGroups(first: 10) {
      edges {
        node {
          name
          sellingPlans(first: 10) {
            edges {
              node {
                id
                name
              }
            }
          }
        }
      }
    }
    variants(first: 3) {
      nodes {
        selectedOptions {
          name
          value
        }
          id
          availableForSale
      }
    }
    images(first: 1) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 50, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
` as const;
