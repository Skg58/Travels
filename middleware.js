// middleware.ts
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/Booking/:path*"], // secure this path
};
