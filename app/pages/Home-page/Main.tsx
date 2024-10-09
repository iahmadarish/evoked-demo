import React from 'react';
import MetaTags from '~/components/MetaTags'; 
import MyAccordion from '~/components/Accordion';
import Hero from '~/components/Hero';
import Mission from '~/components/Mission';
import Navbar from '~/components/Navbar';
import Footer from './Footer';

type Props = {};

const Main: React.FC<Props> = () => {
  const title = 'Home Page';
  const description = 'Description of your home page';
  const imageUrl = '/path/to/home-image.jpg'; 

  return (
    <div>
        <MetaTags
          title={title}
          description={description}
          image={imageUrl}
        />
        {/* <Navbar />
        <Hero /> */}
        <Mission />
        <MyAccordion />
        <Footer />
    </div>
  );
};

export default Main;