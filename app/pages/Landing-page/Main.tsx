
import Footer from '../Collection-page/Footer'
import Carousel from '~/components/Carousel'
import OtherBrands from '../Product-page/OtherBrands'
import Review from '~/components/Review'
import EvokedBrand from '../Product-page/EvokedBrand'
import Navbar from './Navbar'
import ThreeMore from './ThreeMore'
import Hero from './Hero'
import Accordion from '~/components/Accordion'
import MetaTags from '~/components/MetaTags'
import LuxuryPerfume from './LuxuryPerfumes'


type Props = {}

const Main = (props: Props) => {
  const title = 'Landing Page';
  const description = 'Description of your Landing page';
  const imageUrl = '/path/to/home-image.jpg'; 
  return (
        <div>
           <MetaTags
          title={title}
          description={description}
          image={imageUrl}
        />
        <Hero/>
        <LuxuryPerfume/>
        <Carousel/>
        <EvokedBrand/>
        <ThreeMore/>
        <OtherBrands/>
        <Review/>
        <Accordion/>
        <Footer/>
        </div>
  )
}

export default Main