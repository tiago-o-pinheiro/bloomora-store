export { auth as middleware } from "@/auth-edge";

export const config = {
  matcher: ["/app/:path*"],
};
