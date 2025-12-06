export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/Booking/:path*","/Success/:path*"], // secure this path
};
