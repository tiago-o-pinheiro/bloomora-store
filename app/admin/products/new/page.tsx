import AnimatedContainer from "@/components/widgets/animated-container/AnimatedContainer";
import { Metadata } from "next";
import CreateProductForm from "./(components)/CreateProductForm";
import { getAllCategories } from "@/lib/actions/category/category.actions";

export const metadata: Metadata = {
  title: "Create Product",
  description: "Create a new product",
};

const CreateProduct = async () => {
  const { data: categories } = await getAllCategories();
  return (
    <AnimatedContainer>
      <div className="flex-between">
        <h1 className="h2-bold text-2xl font-bold">Add a new product</h1>
      </div>
      <CreateProductForm type="create" categories={categories ?? []} />
    </AnimatedContainer>
  );
};

export default CreateProduct;
