import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/actions/user/user.actions";

const ALLOWED_ROLES = ["ADMIN", "EDITOR"] as const;

const ProtectedResource = async ({
  children,
  shouldRedirect = true,
}: {
  children: React.ReactNode;
  shouldRedirect?: boolean;
}) => {
  const userSession = await getSessionUser();

  if (!ALLOWED_ROLES.includes(userSession?.role)) {
    if (shouldRedirect) {
      redirect("/unauthorized");
    }

    return null;
  }

  return children;
};

export default ProtectedResource;
