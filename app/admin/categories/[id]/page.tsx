import Container from "@/components/widgets/container/Container";
import { getCategory } from "@/lib/actions/category/category.actions";
import CreateCategoryForm from "../new/(components)/CreateCategoryForm";

const CategoryPage = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;

  const { data: category } = await getCategory(id);

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <Container>
      <div className="flex-between">
        <h1 className="h2-bold text-2xl font-bold">{category.name}</h1>
      </div>
      <CreateCategoryForm type="update" category={category} />
    </Container>
  );
};

export default CategoryPage;
