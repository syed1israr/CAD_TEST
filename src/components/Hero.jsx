
import { useCart } from "../contexts/CartContext";
import { useFilter } from "../contexts/FilterContext";
import { useProducts } from "../hook/useProducts";
import Filter_Component from "../Utils/Filter_Component";
import ItemCard from "../Utils/ItemCard";


const Hero = () => {
  const { filters } = useFilter();
  const { addToCart } = useCart();

  const {
    filteredProducts,loading,error, page,total,setPage,PRODUCTS_PER_PAGE
  } = useProducts(filters);
    
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="animate-spin h-24 w-24 border-4 border-black border-t-transparent rounded-full" />
      </div>
    );
  }
  return (
    <>
    <div className="flex flex-col md:flex-row">
      
      <div className="flex-1 px-6">
        <Filter_Component />
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {filteredProducts.length === 0 && !loading && !error && (
          <div className="text-center mt-8">No products found.</div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map(product => (
            <ItemCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
        <div className="flex justify-between items-center mt-8">
          <button
            className="px-3 py-[10px] bg-black text-white disabled:opacity-50"
            onClick={() => setPage(prev => Math.max(0, prev - 1))}
            disabled={page === 0 || loading}
          >
            Previous
          </button>
          <span>
            Page {page + 1} / {Math.ceil(total / PRODUCTS_PER_PAGE)}
          </span>
          <button
            className="px-3 py-[10px] bg-black text-white disabled:opacity-50"
            onClick={() => setPage(prev => prev + 1)}
            disabled={(page + 1) * PRODUCTS_PER_PAGE >= total || loading}
          >
            Next
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Hero;
