import { Await, type MetaFunction, useRouteLoaderData } from '@remix-run/react';
import { Suspense } from 'react';
import type { CartQueryDataReturn } from '@shopify/hydrogen';
import { CartForm } from '@shopify/hydrogen';
import { json, type ActionFunctionArgs } from '@shopify/remix-oxygen';
import { CartMain } from '~/components/Cart';
import type { RootLoader } from '~/root';
import { usePricing } from 'public/utils/PricingContext';

export const meta: MetaFunction = () => {
  return [{ title: `Hydrogen | Cart` }];
};

export async function action({ request, context }: ActionFunctionArgs) {
  const { cart } = context;
  const formData = await request.formData();
  const { action, inputs } = CartForm.getFormInput(formData);
  if (!action) {
    throw new Error('No action provided');
  }
  const selectedPlan = formData.get('selectedPlan') as string | null;
  // if (!selectedPlan) {
  //   return json({ error: 'No plan selected' }, { status: 400 });
  // }
  let status = 200;
  let result: CartQueryDataReturn;

  const currentCart = await cart.get();
  console.log('Current Cart:', currentCart);

  // Handle empty or undefined lines
  const lines = currentCart?.lines?.nodes || [];

  // Calculate total quantity of subscription and one-time products
  const subscriptionCount = lines
    .filter(line => line.sellingPlanAllocation !== null)
    .reduce((total, line) => total + line.quantity, 0);

  const oneTimeCount = lines
    .filter(line => line.sellingPlanAllocation === null)
    .reduce((total, line) => total + line.quantity, 0);

  // Calculate new quantities being added
  const newSubscriptionCount = (inputs.lines as { sellingPlanId: string | null; quantity: number }[] | undefined)
    ?.filter(line => line.sellingPlanId !== null)
    .reduce((total, line) => total + line.quantity, 0) || 0;

  const newOneTimeCount = (inputs.lines as { sellingPlanId: string | null; quantity: number }[] | undefined)
    ?.filter(line => line.sellingPlanId === null)
    .reduce((total, line) => total + line.quantity, 0) || 0;

  // Validate the total quantities
  if (action === CartForm.ACTIONS.LinesAdd) {
    if (subscriptionCount + newSubscriptionCount > 3) {
      return json({ error: 'Maximum 3 subscription products allowed' }, { status: 400 });
    }
    if (oneTimeCount + newOneTimeCount > 10) {
      return json({ error: 'Maximum 10 one-time purchase products allowed' }, { status: 400 });
    }
  }

  try {
    switch (action) {
      case CartForm.ACTIONS.LinesAdd:
        result = await cart.addLines(inputs.lines);
        break;
      case CartForm.ACTIONS.LinesUpdate:
        result = await cart.updateLines(inputs.lines);
        break;
      case CartForm.ACTIONS.LinesRemove:
        result = await cart.removeLines(inputs.lineIds);
        break;
      case CartForm.ACTIONS.DiscountCodesUpdate: {
        const formDiscountCode = inputs.discountCode;
        const discountCodes = [formDiscountCode, ...inputs.discountCodes].filter(Boolean) as string[];
        result = await cart.updateDiscountCodes(discountCodes);
        break;
      }
      case CartForm.ACTIONS.BuyerIdentityUpdate:
        result = await cart.updateBuyerIdentity(inputs.buyerIdentity);
        break;
      default:
        throw new Error(`${action} cart action is not defined`);
    }
  } catch (error) {
    console.error('Error handling cart action:', error);
    return json({ error: 'An error occurred while processing the cart action' }, { status: 500 });
  }

  const cartId = result?.cart?.id;
  const headers = cartId ? cart.setCartId(result.cart.id) : new Headers();
  const { cart: cartResult, errors } = result;

  const redirectTo = formData.get('redirectTo') ?? null;
  if (typeof redirectTo === 'string') {
    status = 303;
    headers.set('Location', redirectTo);
  }

  headers.append('Set-Cookie', await context.session.commit());
  if (inputs.redirectToCheckout === true) {
    status = 303;
    headers.set('Location', result.cart.checkoutUrl);
  }

  return json({ cart: cartResult, errors }, { status, headers });
}




export default function Cart() {
  const rootData = useRouteLoaderData<RootLoader>('root');
  console.log('Root Data:', rootData);

  if (!rootData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="cart">
      <h1>Cart</h1>
      <Suspense fallback={<p>Loading cart ...</p>}>
        <Await
          resolve={rootData.cart}
          errorElement={<div>An error occurred</div>}
        >
          {(cart) => {
            console.log('Cart in Component:', cart);
            return <CartMain layout="page" cart={cart} />;
          }}
        </Await>
      </Suspense>
    </div>
  );
}

