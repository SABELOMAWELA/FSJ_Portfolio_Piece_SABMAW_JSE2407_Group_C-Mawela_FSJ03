import { fetchProducts } from '../product';
import { db } from '../firebase';

export async function GET(req) {
  try {
    const products = await fetchProducts(db);
    return new Response(JSON.stringify(products), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Failed to fetch products' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
