import AnimatedContainer from "@/components/widgets/animated-container/AnimatedContainer";
import CreateCategoryForm from "./(components)/CreateCategoryForm";

const CreateCategory = () => {
  return (
    <AnimatedContainer>
      <div className="flex-between">
        <h1 className="h2-bold text-2xl font-bold">Add a new category</h1>
      </div>
      <CreateCategoryForm />
    </AnimatedContainer>
  );
};

export default CreateCategory;
