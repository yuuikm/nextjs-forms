import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    "/login",
    "/signup",
    "/forms",
    "/formdetails/:id",
    "/form/:id",
    "/api/createform",
    "/((?!.*\\..*|_next).*)",
    "/",
    "/(api|trpc)(.*)",
    "/api/updateform",
  ],
};
