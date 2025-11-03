import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    // This function is only called if the `authorized` callback returns `true`.
    // You can add custom logic here if needed.
    return NextResponse.next();
  },
  {
    callbacks: {
      // The `authorized` callback is where you implement your security logic.
      authorized: ({ req, token }) => {
        const { pathname } = req.nextUrl;

        // Define your public pages.
        // These are accessible to everyone, even unauthenticated users.
        const publicPages = [
          "/login",
          "/register",
          "/", 
          "/api/*", 
          // "/api/auth/login", 
          // "/api/auth/register"
        ];

        // If the user is trying to access a public page, grant access.
        if (publicPages.includes(pathname)) {
          return true;
        }

        // If the page is not public, the user must be authenticated (have a token).
        // The `!!` converts the token object (or null) to a strict boolean.
        return !!token;
      },
    },
  }
);

// The matcher configures which paths the middleware runs on.
export const config = {
  // By default, this will protect all routes except for static files
  // and other internal Next.js assets that don't need protection.
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
