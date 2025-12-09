// middlewareee.ts
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
//
// export function middleware(req: NextRequest) {
//     console.log("Middleware triggered");
//     console.log("Request URL:", req.url);
//     console.log("Request path:", req.nextUrl.pathname);
//     console.log("Request cookies:", req.cookies);
//     const role = req.cookies.get("role")?.value;
//     const url = req.nextUrl;
//     if (!role) {
//         url.pathname = "/login";
//         return NextResponse.redirect(url);
//     }
//
//     if (role === "admin") {
//         return NextResponse.next();
//     }
//
//     if (role === "parent") {
//         url.pathname = "/test";
//         return NextResponse.redirect(url);
//     }
//     url.pathname = "/login";
//     return NextResponse.redirect(url);
// }
