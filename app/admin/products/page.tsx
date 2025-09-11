import { Button } from "@/components/ui/button";
import AnimatedContainer from "@/components/widgets/animated-container/AnimatedContainer";
import { getAllProducts } from "@/lib/actions/product/product.actions";
import Link from "next/link";
import ProductTable from "./(components)/produtc-table/ProductTable";
import Pagination from "@/components/widgets/pagination/Pagination";

type SearchParams = {
  page: string;
  query: string;
  category: string;
};

const AdminProductsPage = async (props: {
  searchParams: Promise<SearchParams>;
}) => {
  const searchParams = await props.searchParams;
  const page = parseInt(searchParams.page) || 1;
  const query = searchParams.query || "";
  const category = searchParams.category || "";

  const { data: products, meta } = await getAllProducts(query, page, category);

  return (
    <AnimatedContainer className="space-y-2">
      <div className="flex-between">
        <h1 className="h2-bold text-2xl font-bold">Products</h1>
        <Button asChild>
          <Link href="/admin/products/new">Create Product</Link>
        </Button>
      </div>
      {products && products.length > 0 ? (
        <ProductTable products={products} />
      ) : (
        <p>No products found</p>
      )}
      {meta?.totalPages && meta.totalPages > 1 && (
        <Pagination page={page} totalPages={meta.totalPages} />
      )}
    </AnimatedContainer>
  );
};

export default AdminProductsPage;
