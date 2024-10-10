"use client"
import { useParams } from "next/navigation";
import ProductDetailClient from "../../../../components/ProductDetailClient"; 

/**
 * ProductDetailPage component for displaying the details of a specific product.
 * 
 * This component retrieves the product ID from the URL parameters using the 
 * `useParams` hook and renders the `ProductDetailClient` component with the 
 * corresponding product ID. If the product ID is not available, it displays a 
 * loading message.
 * 
 * @returns {JSX.Element} The rendered component containing product details or a loading message.
 */
export default function ProductDetailPage() {
  const { id } = useParams();

  if (!id) return <div>Loading...</div>;

  return (
    <div>
      <ProductDetailClient productId={id} /> 
    </div>
  );
}
