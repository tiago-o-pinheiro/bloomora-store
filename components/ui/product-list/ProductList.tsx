import type { Product } from "@/lib/types/product.type";
import ProductCard from "../product-card/ProductCard";

type ProductListProps = {
  title: string;
  data: Product[];
  limit?: number;
};

const ProductList = ({ title, data, limit }: ProductListProps) => {
  return (
    <div className="my-10">
      <h2 className="h2-bold mb-2">{title}</h2>
      {data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.slice(0, limit).map((item, index) => (
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
