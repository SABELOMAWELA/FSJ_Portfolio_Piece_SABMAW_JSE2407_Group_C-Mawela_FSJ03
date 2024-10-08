// src/app/api/products.js
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';

// Function to fetch all products from Firestore
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

// Function to fetch all categories from Firestore
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
