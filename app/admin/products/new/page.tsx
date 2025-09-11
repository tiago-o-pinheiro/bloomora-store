import { Button } from "@/components/ui/button";
import AnimatedContainer from "@/components/widgets/animated-container/AnimatedContainer";
import { Metadata } from "next";
import CreateProductForm from "./(components)/CreateProductForm";

export const metadata: Metadata = {
  title: "Create Product",
  description: "Create a new product",
};

const CreateProduct = () => {
  return (
    <AnimatedContainer>
      <div className="flex-between">
        <h1 className="h2-bold text-2xl font-bold">Add a new product</h1>
        <Button type="submit">Save</Button>
      </div>
      <CreateProductForm />
    </AnimatedContainer>
  );
};

export default CreateProduct;
