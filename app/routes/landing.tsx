
import Review from '~/components/Review';
import Accordion from '~/components/Accordion';
import MetaTags from '~/components/MetaTags';
import Navbar from '~/pages/Landing-page/Navbar';
import Hero from '~/pages/Landing-page/Hero';
import EvokedBrand from '~/pages/Product-page/EvokedBrand';
import ThreeMore from '~/pages/Landing-page/ThreeMore';
import OtherBrands from '~/pages/Product-page/OtherBrands';
import Footer from '~/pages/Collection-page/Footer';
import ProductSlider from '~/pages/Landing-page/Slider';
import { PricingProvider } from 'public/utils/PricingContext';
import type { LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { fetchCollectionsData } from 'public/utils/fetchCollections';
import { useLoaderData } from '@remix-run/react';
import { CollectionProvider } from 'public/utils/CollectionContext';
import Pricing from '~/pages/Landing-page/Pricing';
import SubscribeAndSave from '~/pages/Landing-page/Subscription';
import OneTimePurchase from '~/pages/Landing-page/OneTimePurchase';
import MainPlan from '~/pages/Landing-page/ProgressBar';
import LuxuryPerfume from '~/pages/Landing-page/LuxuryPerfumes';
import Confidence from '~/pages/Landing-page/Confidence';
import Obsessed from '~/pages/Landing-page/Obsessed';
import MarqueeDynamic from '~/pages/Landing-page/Marquee';

type Props = {};

const COLLECTION_HANDLES = ['men', 'unisex-perfumes', 'women'];

export const loader = async (args: LoaderFunctionArgs) => {
  const criticalData = await fetchCollectionsData(args, COLLECTION_HANDLES);
  return { ...criticalData };
};

export default function Landing({}: Props) {
    const title = 'Landing | Page';
    const description = 'Description of your Landing page';
    const imageUrl = '/path/to/home-image.jpg';
    const data = useLoaderData<typeof loader>();

    console.log('Loader data:', data);

    // Combine products from all collections
    const products = data.collections.flatMap(collection => collection.products.nodes);

    return (
          <CollectionProvider collections={data.collections}>
            <MetaTags
                title={title}
                description={description}
                image={imageUrl}
            />
            {/* <Navbar navLink='/landing-page' name='TRY DISCOVERY SET' link='/discovery-kit'/> */}
            <Hero/>
            <LuxuryPerfume/>
              <Confidence/>
            {/* <MainPlan/> */}
            {/* <EvokedBrand/> */}
            {/* <ThreeMore/> */}
            <MarqueeDynamic/>
            <PricingProvider>
              {/* <Pricing/>
              <SubscribeAndSave/>
              <OneTimePurchase/> */}
                <ProductSlider products={products} />
            </PricingProvider>
            <Obsessed/>
            <OtherBrands/>
            <Accordion/>
            <Footer/>
          </CollectionProvider>
    );
}
