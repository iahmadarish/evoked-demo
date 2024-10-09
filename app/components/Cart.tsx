import {
  CartForm,
  Image,
  Money,
  useOptimisticCart,
  type OptimisticCart,
} from '@shopify/hydrogen';
import type {CartLineUpdateInput} from '@shopify/hydrogen/storefront-api-types';
import {Link, useFetcher} from '@remix-run/react';
import type {CartApiQueryFragment} from 'storefrontapi.generated';
import {useVariantUrl} from '~/lib/variants';
import increment from '/assets/increment.svg'
import decrement from '/assets/decrement.svg'
import { Remove } from 'public/utils/Helpers';
import { useEffect, useRef, useState } from 'react';
type CartLine = OptimisticCart<CartApiQueryFragment>['lines']['nodes'][0];

type CartMainProps = {
  cart: CartApiQueryFragment | null;
  layout: 'page' | 'aside';
};

export function CartMain({ layout, cart: originalCart }: CartMainProps) {
  const cart = useOptimisticCart(originalCart);

  const subscriptionCount = cart?.lines?.nodes
    .filter(line => line.sellingPlanAllocation)
    .reduce((acc, line) => acc + line.quantity, 0) || 0;

  const oneTimeCount = cart?.lines?.nodes
    .filter(line => !line.sellingPlanAllocation)
    .reduce((acc, line) => acc + line.quantity, 0) || 0;

  const linesCount = Boolean(cart?.lines?.nodes?.length);
  const withDiscount = cart && Boolean(cart?.discountCodes?.some(code => code.applicable));
  const className = `cart-main ${withDiscount ? 'with-discount' : ''}`;

  return (
    <div>
    <div className={className}>
      <CartEmpty hidden={linesCount} layout={layout} />
      <CartDetails 
        cart={cart} 
        layout={layout} 
        subscriptionCount={subscriptionCount}
        oneTimeCount={oneTimeCount} 
      />
    </div>
    </div>
  );
}

function CartDetails({
  layout,
  cart,
  subscriptionCount,
  oneTimeCount
}: {
  cart: OptimisticCart<CartApiQueryFragment>;
  layout: 'page' | 'aside';
  subscriptionCount: number;
  oneTimeCount: number;
}) {
  const cartHasItems = !!cart && cart.totalQuantity > 0;
console.log(cart)
  return (
    <div className="cart-details">
      <CartLines 
        lines={cart?.lines?.nodes} 
        layout={layout} 
        subscriptionCount={subscriptionCount}
        oneTimeCount={oneTimeCount} 
      />
      {cartHasItems && (
        <CartSummary cost={cart.cost} layout={layout}>
          <CartDiscounts discountCodes={cart.discountCodes} />
          <CartCheckoutActions checkoutUrl={cart.checkoutUrl} />
        </CartSummary>
      )}
    </div>
  );
}

function CartLines({
  lines,
  layout,
  subscriptionCount,
  oneTimeCount
}: {
  layout: CartMainProps['layout'];
  lines: CartLine[];
  subscriptionCount: number;
  oneTimeCount: number;
}) {
  if (!lines) return null;

  return (
    <div aria-labelledby="cart-lines">
      <ul className='flex flex-wrap gap-10 items-start justify-center'>
        {lines.map((line) => (
          <CartLineItem 
            key={line.id} 
            line={line} 
            layout={layout} 
            subscriptionCount={subscriptionCount}
            oneTimeCount={oneTimeCount} 
          />
        ))}
      </ul>
    </div>
  );
}

function CartLineItem({
  layout,
  line,
  subscriptionCount,
  oneTimeCount
}: {
  layout: CartMainProps['layout'];
  line: CartLine;
  subscriptionCount: number;
  oneTimeCount: number;
}) {
  const {id, merchandise, sellingPlanAllocation} = line;
  const { id: lineId, quantity, isOptimistic } = line;
  const {product, title, image, selectedOptions} = merchandise;
  const lineItemUrl = useVariantUrl(product.handle, selectedOptions);
  const isSubscription = !!sellingPlanAllocation;
  const maxLimitReached = isSubscription ? subscriptionCount > 2 : oneTimeCount > 9;
console.log(product, 'ProductMetafield')
const retailPrice = product.metafields?.[4]?.value 
    ? Math.floor(Number(product.metafields[4].value)) 
    : 0;

  if (!line) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {/* <li key={id} className="cart-line">
        {image && (
          <Image
            alt={title}
            aspectRatio="1/1"
            data={image}
            height={100}
            loading="lazy"
            width={100}
          />
        )}

        <div>
          <Link
            prefetch="intent"
            to={lineItemUrl}
            onClick={() => {
              if (layout === 'aside') {
                // close the drawer
                window.location.href = lineItemUrl;
              }
            }}
          >
            <p>
              <strong>{product.title}</strong>
            </p>
          </Link>
          <CartLinePrice line={line} as="span" />
          <ul>
            {sellingPlanAllocation && (
              <li key={sellingPlanAllocation.sellingPlan.name}>
                <small>{sellingPlanAllocation.sellingPlan.name}</small>
              </li>
            )}
            {selectedOptions.map((option) => (
              <li key={option.name}>
                <small>
                  {option.name}: {option.value}
                </small>
              </li>
            ))}
          </ul>
          <CartLineQuantity 
            line={line} 
            maxLimitReached={maxLimitReached}
            isSubscription={isSubscription}
          />
        </div>
      </li> */}
       <li key={id} className="cart-line h-auto flex-col justify-start items-center gap-[25px] inline-flex pt-[50px]">
        <div className="relative">
          <div
            className={`2xl:w-[180px] bg-white border-[color:var(--black,#171717)] shadow-[2px_2px_0px_0px_#171717] 2xl:h-[180px] w-[140px] h-[140px] border border-neutral-900 flex items-center border-solid relative  justify-center`}
          >
            {image && (
              <Image
                alt={title}
                aspectRatio="1/1"
                data={image}
                height={150}
                loading="lazy"
                width={150}
                className="object-contain"
              />
            )}
            <CartLineRemoveButton lineIds={[lineId]} disabled={!!isOptimistic} />
          </div>
        </div>
        <div className="self-stretch rounded flex-col justify-start items-center gap-2.5 flex">
          <div className="self-stretch text-center text-[#28282a] text-2xl font-semibold font-['Josefin Sans'] leading-[28.80px]">
            <Link
              prefetch="intent"
              to={lineItemUrl}
              onClick={() => {
                if (layout === 'aside') {
                  // close the drawer
                  window.location.href = lineItemUrl;
                }
              }}
            >
              {product.title}
            </Link>
          </div>
          <div className="self-stretch text-center text-[#28282a]/70 text-xl font-normal font-['Josefin Sans'] leading-normal">
            Retail Price: {retailPrice}
          </div>
          <CartLineQuantity
            line={line}
            maxLimitReached={maxLimitReached}
            isSubscription={isSubscription}
          />
        </div>
      </li>
    </div>
  );
}


function CartCheckoutActions({checkoutUrl}: {checkoutUrl: string}) {
  if (!checkoutUrl) return null;

  return (
    <div>
      <a href={checkoutUrl} target="_self">
        <p>Continue to Checkout &rarr;</p>
      </a>
      <br />
    </div>
  );
}

export function CartSummary({
  cost,
  layout,
  children = null,
}: {
  children?: React.ReactNode;
  cost: CartApiQueryFragment['cost'];
  layout: CartMainProps['layout'];
}) {
  const className =
    layout === 'page' ? 'cart-summary-page' : 'cart-summary-aside';
console.log(cost)
  return (
    <div aria-labelledby="cart-summary" className={className}>
      <h4>Totals</h4>
      <dl className="cart-subtotal">
        <dt>Subtotal</dt>
        <dd>
          {cost?.subtotalAmount?.amount ? (
            <Money data={cost?.subtotalAmount} />
          ) : (
            '-'
          )}
        </dd>
      </dl>
      {children}
    </div>
  );
}

function CartLineRemoveButton({
  lineIds,
  disabled,
}: {
  lineIds: string[];
  disabled: boolean;
}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesRemove}
      inputs={{lineIds}}
    >
      <button disabled={disabled} type="submit">
      <Remove className={`lg:w-auto lg:h-auto z-20 absolute top-0 right-0 bg-neutral-900 rounded-full md:top-[-7px] md:right-[-8px] h-[13px] w-[13px]`} rect={'#171717'} color={'white'} />
      </button>
    </CartForm>
  );
}

function CartLineQuantity({
  line,
  maxLimitReached,
  isSubscription
}: {
  line: CartLine;
  maxLimitReached: boolean;
  isSubscription: boolean;
}) {
  if (!line || typeof line?.quantity === 'undefined') return null;

  const { id: lineId, quantity, isOptimistic } = line;
  const prevQuantity = Math.max(0, quantity - 1);
  const nextQuantity = quantity + 1;
  const maxLimitReachedData = isSubscription ? quantity >= 3 : quantity >= 10;

  return (
    <div className="mx-auto">
      <div className="flex justify-center text-center items-center">
      <CartLineUpdateButton lines={[{ id: lineId, quantity: prevQuantity }]}>
        <button
          aria-label="Decrease quantity"
          disabled={quantity <= 1 || isOptimistic}
          name="decrease-quantity"
          value={prevQuantity}
        >
          <img src={decrement} alt="Decrement" />
        </button>
      </CartLineUpdateButton>
      <span className='text-[color:var(--Brand,#28282A)] mt-[-5px] text-center text-[32px] not-italic font-medium'>{quantity}</span>
      <CartLineUpdateButton lines={[{ id: lineId, quantity: nextQuantity }]}>
        <button
          aria-label="Increase quantity"
          name="increase-quantity"
          value={nextQuantity}
          disabled={isOptimistic || maxLimitReached}
          className='ml-[10px]'
        >
          <img src={increment} alt="Increment" />
        </button>
      </CartLineUpdateButton>
      </div>
      {/* <CartLineRemoveButton lineIds={[lineId]} disabled={!!isOptimistic} /> */}
      {maxLimitReached && (
        <div className="limit-message">
          <small>
            {isSubscription ? 'Max 3 subscription products' : 'Max 10 one-time products'}
          </small>
        </div>
      )}
    </div>
  );
}

function CartLinePrice({
  line,
  priceType = 'regular',
  ...passthroughProps
}: {
  line: CartLine;
  priceType?: 'regular' | 'compareAt';
  [key: string]: any;
}) {
  if (!line?.cost?.amountPerQuantity || !line?.cost?.totalAmount)
    return <div style={{visibility: 'hidden'}}>&nbsp;</div>;

  const moneyV2 =
    priceType === 'regular'
      ? line.cost.totalAmount
      : line.cost.compareAtAmountPerQuantity;

  if (moneyV2 == null) {
    return <div style={{visibility: 'hidden'}}>&nbsp;</div>;
  }

  return (
    <div>
      <Money withoutTrailingZeros {...passthroughProps} data={moneyV2} />
    </div>
  );
}

export function CartEmpty({
  hidden = false,
  layout = 'aside',
}: {
  hidden: boolean;
  layout?: CartMainProps['layout'];
}) {
  return (
    <div hidden={hidden}>
      <br />
      <p>
        Looks like you haven&rsquo;t added anything yet, let&rsquo;s get you
        started!
      </p>
      <br />
      <Link
        to="/collections"
        onClick={() => {
          if (layout === 'aside') {
            window.location.href = '/collections';
          }
        }}
      >
        Continue shopping →
      </Link>
    </div>
  );
}

function CartDiscounts({
  discountCodes,
}: {
  discountCodes: CartApiQueryFragment['discountCodes'];
}) {
  const codes: string[] =
    discountCodes
      ?.filter((discount) => discount.applicable)
      ?.map(({code}) => code) || [];

  return (
    <div>
      {/* Have existing discount, display it with a remove option */}
      <dl hidden={!codes.length}>
        <div>
          <dt>Discount(s)</dt>
          <UpdateDiscountForm>
            <div className="cart-discount">
              <code>{codes?.join(', ')}</code>
              &nbsp;
              <button>Remove</button>
            </div>
          </UpdateDiscountForm>
        </div>
      </dl>

      {/* Show an input to apply a discount */}
      <UpdateDiscountForm discountCodes={codes}>
        <div>
          <input type="text" name="discountCode" placeholder="Discount code" />
          &nbsp;
          <button type="submit">Apply</button>
        </div>
      </UpdateDiscountForm>
    </div>
  );
}

function UpdateDiscountForm({
  discountCodes,
  children,
}: {
  discountCodes?: string[];
  children: React.ReactNode;
}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.DiscountCodesUpdate}
      inputs={{
        discountCodes: discountCodes || [],
      }}
    >
      {children}
    </CartForm>
  );
}

function CartLineUpdateButton({
  children,
  lines,
}: {
  children: React.ReactNode;
  lines: CartLineUpdateInput[];
}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesUpdate}
      inputs={{lines}}
    >
      {children}
    </CartForm>
  );
}


function ApplySellingPlanForm({
  selectedSellingPlan,
  cart
}: {
  selectedSellingPlan: string;
  cart: CartApiQueryFragment;
}) {
  const updatedLines = cart.lines.nodes.map(line => ({
    id: line.id,
    quantity: line.quantity,
    sellingPlanId: selectedSellingPlan, 
  }));

  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesUpdate}
      inputs={{ lines: updatedLines }}
    >
      <button type="submit">Apply Selling Plan to All Items</button>
    </CartForm>
  );
}

