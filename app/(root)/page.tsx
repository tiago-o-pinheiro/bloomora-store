import ProductList from "@/components/ui/product-list/ProductList";

import { getLatestProducts } from "@/lib/actions/product/product.actions";

const HomePage = async () => {
  const latestProducts = await getLatestProducts();

  return (
    <div>
      <ProductList title="New Arrivals" data={latestProducts} />
    </div>
  );
};

export default HomePage;
