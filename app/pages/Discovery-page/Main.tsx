
import Footer from '../Collection-page/Footer'
import Carousel from '~/components/Carousel'
import OtherBrands from '../Product-page/OtherBrands'
import Review from '~/components/Review'
import EvokedBrand from '../Product-page/EvokedBrand'
import Navbar from '../Landing-page/Navbar'
import KitSlider from './KitSlider'
import MetaTags from '~/components/MetaTags'


type Props = {}

const Main = (props: Props) => {
  const title = 'Discovery-kit Page';
  const description = 'Description of your Discovery-kit page';
  const imageUrl = '/path/to/home-image.jpg'; 
  return (
        <div>
           <MetaTags
          title={title}
          description={description}
          image={imageUrl}
        />
            {/* <Navbar navLink='/' name='BUILD YOUR SET' link='/landing-page'/> */}
            {/* <KitSlider/> */}
        <EvokedBrand/>
        <Carousel/>
        <OtherBrands/>
        <Review/>
        <Footer/>
        </div>
  )
}

export default Main