import { Button } from "@/components/ui/button";
import Container from "@/components/widgets/container/Container";
import { getAllCategories } from "@/lib/actions/category/category.actions";
import Link from "next/link";
import CategoryTable from "./(components)/CategoryTable";

type SearchParams = {
  page: string;
  query: string;
};

const Categories = async (props: { searchParams: Promise<SearchParams> }) => {
  const { searchParams } = props;
  const { page, query } = await searchParams;

  const { data: categories } = await getAllCategories(query, Number(page));

  return (
    <Container className="w-full">
      <div className="flex-between">
        <h1 className="h2-bold text-2xl font-bold">Categories</h1>
        <Button asChild>
          <Link href="/admin/categories/new">Create Category</Link>
        </Button>
      </div>

      {categories && categories.length > 0 ? (
        <CategoryTable categories={categories} />
      ) : (
        <p>No categories found</p>
      )}
    </Container>
  );
};

export default Categories;
