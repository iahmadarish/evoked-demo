import { getPaginationVariables } from '@shopify/hydrogen';
import { type LoaderFunctionArgs } from '@shopify/remix-oxygen';

export async function fetchCollectionsData({ context, request }: LoaderFunctionArgs, handles: string[]) {
    const { storefront } = context;
    const paginationVariables = getPaginationVariables(request, {
      pageBy: 20,
    });
  
    const collectionQueries = handles.map(handle => 
      storefront.query(COLLECTION_QUERY, {
        variables: { handle, ...paginationVariables },
      })
    );
  
    const collectionsData = await Promise.all(collectionQueries);
    
    const collections = collectionsData.map(data => data.collection).filter(Boolean);
  
    if (collections.length === 0) {
      throw new Response('No collections found', {
        status: 404,
      });
    }
  
    return { collections };
  }

const COLLECTION_QUERY = `#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment ProductItem on Product {
    id
    handle
    title
    metafields(
              identifiers: [
                {namespace: "custom", key: "smells_like_"},
          {namespace: "custom", key: "feels_like"},
          {namespace: "custom", key: "top_notes"},
          {namespace: "custom", key: "bottom_notes"},
          {namespace: "custom", key: "competitor_s_retail_price"}
          {namespace: "custom", key: "mix_match"}
              ]
            ) {
              key
              value
              namespace
            }
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
    sellingPlanGroups(first: 10) {
      edges {
        node {
          name
          sellingPlans(first: 10) {
            edges {
              node {
                id
                name
              }
            }
          }
        }
      }
    }
    variants(first: 3) {
      nodes {
        selectedOptions {
          name
          value
        }
          id
          availableForSale
      }
    }
  }
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
      ) {
        nodes {
          ...ProductItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
  }
`;
