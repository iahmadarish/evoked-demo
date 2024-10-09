import React, { useEffect, useState } from 'react';
import logo from '/assets/logo copy.svg';
import cartImg from '/assets/cart.svg';
import { Link } from '@remix-run/react';
import { Suspense } from 'react';
import { Await } from '@remix-run/react';
import { useAside } from '~/components/Aside';
import { useAnalytics } from '@shopify/hydrogen';
import type { CartApiQueryFragment } from 'storefrontapi.generated';

export function CartControls({ cart }: { cart: Promise<CartApiQueryFragment | null> }) {
  const { open } = useAside();
  const { publish, shop, cart: currentCart, prevCart } = useAnalytics();

  return (
    <Suspense fallback={<CartBadge count={0} />}>
      <Await resolve={cart}>
        {(cart) => {
          if (!cart) return <CartBadge count={0} />;
          return <CartBadge count={cart.totalQuantity || 0} />;
        }}
      </Await>
    </Suspense>
  );

  function CartBadge({ count }: { count: number }) {
    return (
      <a
      className='flex relative items-center justify-center text-center'
        href="/cart"
        onClick={(e) => {
          e.preventDefault();
          open('cart');
          publish('cart_viewed', {
            cart: currentCart,
            prevCart,
            shop,
            url: window.location.href || '',
          });
        }}
      >
        <img className='lg:w-auto lg:h-auto w-[70%]' src={cartImg} alt="Cart" /> <div className="absolute lg:left-[30px] left-[25px] top-[-5px]">
    <div className="w-[19px] h-[19px] bg-[#454547] rounded-full flex justify-center items-center">
    <span className='text-white'>{count}</span>
</div>
</div>
      </a>
    );
  }
}

interface NavbarProps {
  name: string;
  link: string;
  cart: Promise<CartApiQueryFragment | null>
}

const Navbar: React.FC<NavbarProps> = ({ name, link, cart }) => {
  const [showNavbar, setShowNavbar] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) {
      setShowNavbar(false); 
    } else {
      setShowNavbar(true); 
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);

    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);
  return (
    <nav className={`bg-[#010101] fixed w-full top-0 z-50 transition-transform duration-300 ${
        showNavbar ? 'translate-y-0' : '-translate-y-full'
      }`}>
    <div className="max-w-container 4k:max-w-container2 mx-auto">
      <div className="py-[30px] flex justify-between items-center">
        <div className="">
          <Link to={link}>
            <img className='lg:w-auto lg:h-auto w-[70%]' src={logo} alt={name} />
          </Link>
        </div>
        <div className="flex justify-center items-center gap-5 lg:gap-10">
          {/* Reuse CartControls here */}
          <div>
            <CartControls cart={cart} />
          </div>
        </div>
      </div>
    </div>
  </nav>
  );
}

export default Navbar;
