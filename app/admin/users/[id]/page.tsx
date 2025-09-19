import Container from "@/components/widgets/container/Container";
import EditUserForm from "../(components)/EditUserForm";
import { getUserById } from "@/lib/actions/user/user.actions";

const UserPage = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;

  const { data: user } = await getUserById(id);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <Container>
      <div className="flex-between">
        <h1 className="h2-bold text-2xl font-bold">{user.name}</h1>
      </div>
      <EditUserForm user={user} />
    </Container>
  );
};

export default UserPage;
