import Container from "@/components/widgets/container/Container";
import { getAllUsers } from "@/lib/actions/user/user.actions";

import UsersTable from "./(components)/UsersTable";

type SearchParams = {
  page: string;
  query: string;
  category: string;
};

const UsersPage = async (props: { searchParams: Promise<SearchParams> }) => {
  const searchParams = await props.searchParams;
  const page = parseInt(searchParams.page) || 1;
  const query = searchParams.query || "";

  const { data: users } = await getAllUsers(page, 10);

  if (!users || users.length === 0) {
    return <div>No users found</div>;
  }

  return (
    <Container className="space-y-2">
      <h1 className="h2-bold text-2xl font-bold">Users</h1>
      <UsersTable users={users} />
    </Container>
  );
};

export default UsersPage;
