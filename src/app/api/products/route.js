import { fetchProducts } from '../product';
import { db } from '../firebase';

/**
 * Handles the GET request to fetch products.
 *
 * This function retrieves products from the Firestore database by calling
 * the fetchProducts function and returns them as a JSON response. In case of 
 * an error, it returns a 500 status with an error message.
 *
 * @param {Request} req - The incoming HTTP request object.
 * @returns {Response} - A Response object containing the products or an error message.
 */
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
