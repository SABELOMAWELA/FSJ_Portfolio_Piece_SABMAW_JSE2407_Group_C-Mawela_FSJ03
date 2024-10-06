"use client"
import { useParams } from "next/navigation";
import ProductDetailClient from "../../../../components/ProductDetailClient"; 

export default function ProductDetailPage() {
  const { id } = useParams();

  if (!id) return <div>Loading...</div>;

  return (
    <div>
      <ProductDetailClient productId={id} /> 
    </div>
  );
}
