import type { Product } from "@/lib/types/product.type";
import ProductCard from "../product-card/ProductCard";

type ProductListProps = {
  data: Product[];
};

const ProductList = ({ data }: ProductListProps) => {
  return (
    <div className="my-10">
      {data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.map((item, index) => (
            <ProductCard key={`product-${index}`} product={item} />
          ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default ProductList;
