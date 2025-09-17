import ProductList from "@/components/ui/product-list/ProductList";

import { getLatestProducts } from "@/lib/actions/product/product.actions";

const HomePage = async () => {
  const { data: latestProducts } = await getLatestProducts();

  return (
    <div>
      <h2 className="h2-bold mb-2">New Arrivals</h2>

      {latestProducts && latestProducts.length > 0 ? (
        <ProductList data={latestProducts} />
      ) : (
        <p>No new arrivals found.</p>
      )}
    </div>
  );
};

export default HomePage;
