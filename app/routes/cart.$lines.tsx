import {redirect, type LoaderFunctionArgs} from '@shopify/remix-oxygen';

/**
 * Automatically creates a new cart based on the URL and redirects straight to checkout.
 * Expected URL structure:
 * ```js
 * /cart/<variant_id>:<quantity>:<selling_plan_id>
 *
 * ```
 *
 * More than one `<variant_id>:<quantity>:<selling_plan_id>` separated by a comma, can be supplied in the URL, for
 * carts with more than one product variant.
 *
 * @example
 * Example path creating a cart with two product variants, different quantities, and a discount code in the querystring:
 * ```js
 * /cart/41007289663544:1:12345,41007289696312:2:67890?discount=HYDROBOARD
 *
 * ```
 */
export async function loader({request, context, params}: LoaderFunctionArgs) {
  const {cart} = context;
  const {lines} = params;
  if (!lines) return redirect('/cart');

  // Parse the lines parameter to extract variant ID, quantity, and selling plan ID
  const linesMap = lines.split(',').map((line) => {
    const lineDetails = line.split(':');
    const variantId = lineDetails[0];
    const quantity = parseInt(lineDetails[1], 10);
    const sellingPlanId = lineDetails[2];

    const lineItem: { merchandiseId: string; quantity: number; sellingPlanId?: string } = {
      merchandiseId: `gid://shopify/ProductVariant/${variantId}`,
      quantity,
    };

    if (sellingPlanId) {
      lineItem.sellingPlanId = sellingPlanId;
    }

    return lineItem;
  });

  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);

  // Extract discount code from URL if present
  const discount = searchParams.get('discount');
  const discountArray = discount ? [discount] : [];

  // Create a new cart with the parsed line items and discount codes
  const result = await cart.create({
    lines: linesMap,
    discountCodes: discountArray,
  });

  const cartResult = result.cart;

  if (result.errors?.length || !cartResult) {
    throw new Response('Link may be expired. Try checking the URL.', {
      status: 410,
    });
  }

  // Update cart ID in cookie
  const headers = cart.setCartId(cartResult.id);

  // Redirect to checkout
  if (cartResult.checkoutUrl) {
    return redirect(cartResult.checkoutUrl, {headers});
  } else {
    throw new Error('No checkout URL found');
  }
}

export default function Component() {
  return null;
}
