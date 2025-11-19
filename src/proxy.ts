import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export {default} from "next-auth/middleware"
import { getToken } from 'next-auth/jwt'

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
    const token=await getToken({req : request})
    console.log(token)
    const url=request.nextUrl
    if(token && 
        (
            url.pathname.startsWith('/sign-in') ||
            url.pathname.startsWith('/sign-up') ||
            url.pathname.startsWith('/verify-code')
        )
    ){
        return NextResponse.redirect(new URL('/', request.url))
    }
    if(!token && url.pathname==='/'){
        return NextResponse.redirect(new URL('/sign-in',request.url))
    }
    // if(token?.role==="Customer" &&
    //     !(
    //         url.pathname.startsWith('/place-order') ||
    //         url.pathname.startsWith('/my-order')
    //     )
    // ){
    //     return NextResponse.redirect(new URL('/place-order',request.url))
    // }
    // if(token?.role==="Staff" && !url.pathname.startsWith('/order')){
    //     return NextResponse.redirect(new URL('/place-order',request.url))
    // }
    // if(token?.role==="Admin" &&
    //     !(
    //         url.pathname.startsWith('/menu') ||
    //         url.pathname.startsWith('/staff')
    //     )
    // ){
    //     return NextResponse.redirect(new URL('/staff',request.url))
    // }
    return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/sign-in',
    '/sign-up',
    '/',
    '/menu',
    '/staff',
    '/order/:path',
    '/place-order',
    '/my-order',
    '/dashboard/:path*',
    '/verify-code/:path*'],
}