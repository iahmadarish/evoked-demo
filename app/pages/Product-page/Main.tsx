
import Navbar from '../Collection-page/Navbar'
import Footer from '../Collection-page/Footer'
import Carousel from '~/components/Carousel'
import Review from '~/components/Review'
import EvokedBrand from './EvokedBrand'
import TryFirst from './TryFirst'
import ProductDiscover from './ProductDiscover'
import OtherBrands from './OtherBrands'
import StartQuiz from './StartQuiz'
import MetaTags from '~/components/MetaTags'
import Nav from './Nav'


type Props = {}

const Main = (props: Props) => {
  const title = 'Product Page';
  const description = 'Description of your Product page';
  const imageUrl = '/path/to/home-image.jpg'; 
  return (
        <div>
           <MetaTags
          title={title}
          description={description}
          image={imageUrl}
        />
        
        <Navbar/>
        <Carousel/>
        <EvokedBrand/>
        <TryFirst/>
        <ProductDiscover/>
        <OtherBrands/>
        <Review/>
        <StartQuiz/>
        <Footer/>
        </div>
  )
}

export default Main