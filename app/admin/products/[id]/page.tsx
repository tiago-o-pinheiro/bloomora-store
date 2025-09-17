import Container from "@/components/widgets/container/Container";
import { getProductById } from "@/lib/actions/product/product.actions";
import CreateProductForm from "../new/(components)/CreateProductForm";

const Products = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;

  const { data: product } = await getProductById(id);

  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <Container>
      <div className="flex-between">
        <h1 className="h2-bold text-2xl font-bold">{product.name}</h1>
      </div>
      <CreateProductForm
        type="edit"
        product={product}
        categories={product.categories}
      />
    </Container>
  );
};

export default Products;
