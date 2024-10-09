'use client';

import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import firebaseApp from "../src/app/api/firebase"; 
import Error from "./404";
import ProductDetailSkeleton from "./productDetailSkeleton"; 
import { useRouter } from 'next/navigation';

const ProductDetailClient = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [sortType, setSortType] = useState("date");
  const [reviewInput, setReviewInput] = useState({ reviewerName: "", rating: 0, comment: "" });
  const [editingReview, setEditingReview] = useState(null); // State for handling review editing
  const router = useRouter();

  useEffect(() => {
    if (productId) {
      fetchProductById(productId);
    }
  }, [productId]);

  const fetchProductById = async (productId) => {
    const db = getFirestore(firebaseApp);
    const formattedId = productId.toString().padStart(3, '0');
    const productDoc = doc(db, "products", formattedId);

    try {
      const docSnap = await getDoc(productDoc);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setProduct({
          brand: data.brand,
          title: data.title,
          description: data.description,
          category: data.category,
          price: data.price,
          rating: data.rating,
          images: data.images,
          stock: data.stock,
          availability: data.stock > 0 ? "In Stock" : "Out of Stock",
          reviews: data.reviews || [],
          tags: data.tags || [],
        });
        setSelectedImage(data.images[0]);
      } else {
        setError("Product not found");
      }
    } catch (err) {
      setError("Error fetching product: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to add a new review to Firestore
  const handleAddReview = async () => {
    const db = getFirestore(firebaseApp);
    const formattedId = productId.toString().padStart(3, '0');
    const productDoc = doc(db, "products", formattedId);

    const newReview = {
      reviewerName: reviewInput.reviewerName,
      rating: reviewInput.rating,
      comment: reviewInput.comment,
      date: new Date().toISOString(),
    };

    try {
      await updateDoc(productDoc, {
        reviews: arrayUnion(newReview),
      });
      setProduct((prevProduct) => ({
        ...prevProduct,
        reviews: [...prevProduct.reviews, newReview],
      }));
      setReviewInput({ reviewerName: "", rating: 0, comment: "" }); // Reset the form
    } catch (err) {
      setError("Error adding review: " + err.message);
    }
  };

  // Function to delete a review
  const handleDeleteReview = async (reviewToDelete) => {
    const db = getFirestore(firebaseApp);
    const formattedId = productId.toString().padStart(3, '0');
    const productDoc = doc(db, "products", formattedId);

    try {
      await updateDoc(productDoc, {
        reviews: arrayRemove(reviewToDelete),
      });
      setProduct((prevProduct) => ({
        ...prevProduct,
        reviews: prevProduct.reviews.filter((review) => review !== reviewToDelete),
      }));
    } catch (err) {
      setError("Error deleting review: " + err.message);
    }
  };

  // Function to edit a review
  const handleEditReview = (review) => {
    setReviewInput(review);
    setEditingReview(review);
  };

  const saveEditedReview = async () => {
    const db = getFirestore(firebaseApp);
    const formattedId = productId.toString().padStart(3, '0');
    const productDoc = doc(db, "products", formattedId);

    try {
      // Remove old review and add the edited one
      await updateDoc(productDoc, {
        reviews: arrayRemove(editingReview),
      });
      const updatedReview = {
        ...editingReview,
        ...reviewInput,
      };
      await updateDoc(productDoc, {
        reviews: arrayUnion(updatedReview),
      });

      setProduct((prevProduct) => ({
        ...prevProduct,
        reviews: prevProduct.reviews.map((review) =>
          review === editingReview ? updatedReview : review
        ),
      }));
      setReviewInput({ reviewerName: "", rating: 0, comment: "" });
      setEditingReview(null);
    } catch (err) {
      setError("Error editing review: " + err.message);
    }
  };

  const sortReviews = (reviews, sortType) => {
    if (sortType === "rating") {
      return reviews.slice().sort((a, b) => b.rating - a.rating);
    } else {
      return reviews.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  };

  if (loading) return <ProductDetailSkeleton />;
  if (error) return <Error message={error} />;
  if (!product) return <p>No product found</p>;

  return (
    <div className="font-sans p-8 tracking-wide max-lg:max-w-2xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center text-gray-600 font-bold mb-4 hover:text-indigo-600 transition-all"
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path>
        </svg>
        Back
      </button>

      <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Product Images */}
        <div className="space-y-4 text-center lg:sticky top-8">
          <div className="bg-gray-100 p-4 flex items-center sm:h-[380px] rounded-lg">
            <img
              src={selectedImage}
              alt={product.title}
              className="w-full max-h-full object-contain object-top"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {product.images.slice(1).map((image, index) => (
              <div
                key={index}
                className="bg-gray-100 p-4 flex items-center rounded-lg sm:h-[182px]"
              >
                <img
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="w-full max-h-full object-contain object-top"
                  onClick={() => setSelectedImage(image)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="max-w-xl">
          <h2 className="text-2xl font-extrabold text-gray-800">{product.title}</h2>
          <p className="text-sm text-gray-600 mt-2">{product.category}</p>
          <h3 className="text-gray-800 text-4xl font-bold mt-4">${product.price}</h3>
          <div className="flex space-x-1 mt-4">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`w-5 ${index < Math.round(product.rating) ? "fill-yellow-400" : "fill-[#CED5D8]"}`}
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg>
            ))}
          </div>

          {/* Tabs for Description and Reviews */}
          <div className="mt-8">
            <ul className="flex border-b">
              <li
                className={`${
                  activeTab === "description"
                    ? "text-gray-800 font-bold bg-gray-100 py-3 px-8 border-b-2 border-indigo-600"
                    : "text-gray-600 font-bold py-3 px-8"
                } cursor-pointer transition-all`}
                onClick={() => setActiveTab("description")}
              >
                Description
              </li>
              <li
                className={`${
                  activeTab === "reviews"
                    ? "text-gray-800 font-bold bg-gray-100 py-3 px-8 border-b-2 border-indigo-600"
                    : "text-gray-600 font-bold py-3 px-8"
                } cursor-pointer transition-all`}
                onClick={() => setActiveTab("reviews")}
              >
                Reviews ({product.reviews.length})
              </li>
            </ul>

            {/* Content based on active tab */}
            <div className="mt-8">
              {activeTab === "description" ? (
                <>
                  <h3 className="text-lg font-bold text-gray-800">Product Description</h3>
                  <p className="text-sm text-gray-600 mt-4">{product.description}</p>
                  <ul className="space-y-3 list-disc mt-6 pl-4 text-sm text-gray-600">
                    <li>Brand: {product.brand}</li>
                    <li>{product.stock} in stock</li>
                    <li>Availability Status: {product.availability}</li>
                    <li>Tags: {product.tags.join(", ")}</li>
                    <li>Return Policy: {product.returnPolicy}</li>
                  </ul>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-bold text-gray-800">Customer Reviews</h3>
                  {product.reviews && product.reviews.length > 0 ? (
                    <>
                      {/* Sorting Buttons */}
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSortType("date")}
                          className={`py-1 px-2 rounded-md ${sortType === "date" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-800"}`}
                        >
                          Sort by Date
                        </button>
                        <button
                          onClick={() => setSortType("rating")}
                          className={`py-1 px-2 rounded-md ${sortType === "rating" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-800"}`}
                        >
                          Sort by Rating
                        </button>
                      </div>

                      {/* Reviews List with Edit and Delete Icons */}
                      <ul className="space-y-3 mt-4">
                        {sortReviews(product.reviews, sortType).map((review, index) => (
                          <li key={index} className="text-sm text-gray-600 border-b pb-4 flex justify-between items-start">
                            <div>
                              <p className="font-bold">
                                {review.reviewerName} ({new Date(review.date).toLocaleDateString()})
                              </p>
                              <p>Rating: {review.rating}/5</p>
                              <p>{review.comment}</p>
                            </div>

                            {/* Edit and Delete Icons */}
                            <div className="flex items-center space-x-2">
                              {/* Edit Button */}
                              <button onClick={() => handleEditReview(review)} className="text-blue-600 hover:text-blue-800">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="w-5 h-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.862 3.487a2.25 2.25 0 113.182 3.182L8.31 18.404a4.5 4.5 0 01-1.697 1.07l-3.208 1.069 1.07-3.208a4.5 4.5 0 011.07-1.697L16.862 3.487z"
                                  />
                                </svg>
                              </button>

                              {/* Delete Button */}
                              <button onClick={() => handleDeleteReview(review)} className="text-red-600 hover:text-red-800">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="w-5 h-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <p className="text-sm text-gray-600">No reviews available</p>
                  )}
                </>
              )}
            </div>

            {/* Buy and Add to Cart Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              <button
                type="button"
                className="min-w-[200px] px-4 py-3 bg-indigo-600 hover:bg-indigo-600 text-white text-sm font-semibold rounded-lg"
              >
                Buy now
              </button>
              <button
                type="button"
                className="min-w-[200px] px-4 py-2.5 border border-indigo-600 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-semibold rounded-lg"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Review Form */}
      {activeTab === "reviews" && (
        <>
          <h3 className="text-lg font-bold text-gray-800 mt-8">Add a Review</h3>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Your Name"
              value={reviewInput.reviewerName}
              onChange={(e) => setReviewInput({ ...reviewInput, reviewerName: e.target.value })}
              className="border rounded-md p-2 mb-2 w-full"
            />
            <input
              type="number"
              placeholder="Rating (0-5)"
              value={reviewInput.rating}
              onChange={(e) => setReviewInput({ ...reviewInput, rating: e.target.value })}
              className="border rounded-md p-2 mb-2 w-full"
              max={5}
              min={0}
            />
            <textarea
              placeholder="Comment"
              value={reviewInput.comment}
              onChange={(e) => setReviewInput({ ...reviewInput, comment: e.target.value })}
              className="border rounded-md p-2 mb-2 w-full"
            />
            {editingReview ? (
              <button onClick={saveEditedReview} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Save Changes
              </button>
            ) : (
              <button onClick={handleAddReview} className="bg-green-500 text-white px-4 py-2 rounded-md">
                Add Review
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetailClient;
