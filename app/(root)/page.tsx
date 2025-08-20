import List from "@/components/ui/product-list/ProductList";

import { getLatestProducts } from "@/lib/actions/product/product.actions";

const HomePage = async () => {
  const latestProducts = await getLatestProducts();

  return (
    <div>
      <List title="New Arrivals" data={latestProducts} limit={4} />
    </div>
  );
};

export default HomePage;
