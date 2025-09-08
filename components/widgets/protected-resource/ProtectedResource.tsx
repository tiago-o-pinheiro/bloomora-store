import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/actions/user/user.actions";

const ALLOWED_ROLES = ["ADMIN", "EDITOR"] as const;

const ProtectedResource = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const userSession = await getSessionUser();
  const headersList = await headers();
  const referer = headersList.get("referer") || "/";

  if (!ALLOWED_ROLES.includes(userSession?.role)) {
    redirect(referer);
  }

  return children;
};

export default ProtectedResource;
