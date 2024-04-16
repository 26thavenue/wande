import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
 publicRoutes: [
    "/",
    "/product",
    "/category",
   "/category/:path*",
  ],
  ignoredRoutes: ["/((?!api|trpc))(_next.*|.+\.[\w]+$)", "/api/product"]
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};  