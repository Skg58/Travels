
import { withAuth } from "next-auth/middleware";

export const proxy = withAuth;

export const config = {
  matcher: ["/Booking/:path*","/Success/:path*"], // secure this path
};
