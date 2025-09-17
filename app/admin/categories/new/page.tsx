import Container from "@/components/widgets/container/Container";
import CreateCategoryForm from "./(components)/CreateCategoryForm";

const CreateCategory = () => {
  return (
    <Container>
      <div className="flex-between">
        <h1 className="h2-bold text-2xl font-bold">Add a new category</h1>
      </div>
      <CreateCategoryForm />
    </Container>
  );
};

export default CreateCategory;
