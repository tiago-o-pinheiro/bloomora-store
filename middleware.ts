export { auth as middleware } from "@/auth-edge";

export const config = {
  matcher: ["/((?!_next|api).*)"],
};
