
import React from 'react'
import Navbar from './Navbar'
import TryEntireRange from './TryEntireRange'
import Footer from './Footer'
import TopHeader from './TopHeader'
import MetaTags from '~/components/MetaTags'
import Collections from './Collections'

type Props = {}

const Main = (props: Props) => {
  const title = 'Collection Page';
  const description = 'Description of your Collection page';
  const imageUrl = '/path/to/home-image.jpg'; 
  return (
        <div>
           <MetaTags
          title={title}
          description={description}
          image={imageUrl}
        />
<Navbar/>
<TopHeader/>
<Collections/>
<TryEntireRange/>
<Footer/>
        </div>
  )
}

export default Main