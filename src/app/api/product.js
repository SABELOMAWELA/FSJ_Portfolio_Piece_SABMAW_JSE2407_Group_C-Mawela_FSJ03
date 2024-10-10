import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';

/**
 * Fetches a list of products from the Firestore database.
 * 
 * This function retrieves all documents in the 'products' collection, mapping 
 * each document to an object that includes its id and data.
 * 
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of product objects.
 * @throws {Error} Throws an error if fetching products fails.
 */
export const fetchProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    const products = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
};

/**
 * Fetches a list of categories from the Firestore database.
 * 
 * This function retrieves all documents in the 'categories' collection and returns 
 * the data of each document.
 * 
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of category objects.
 * @throws {Error} Throws an error if fetching categories fails.
 */
export const fetchCategories = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'categories'));
    const categories = querySnapshot.docs.map((doc) => doc.data());
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch categories');
  }
};
