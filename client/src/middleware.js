import { NextResponse } from 'next/server'
export function middleware(request) {
    // Obtiene el token de usuario de las cookies
    const userToken = request.cookies.get('userToken')
    // Comprueba si el token de usuario existe
    if (!userToken) {
        // Si no existe, redirige a '/account/login'
        console.log(userToken);
        return NextResponse.redirect('http://localhost:3000/account/login')
    }
    // Si existe, permite que la solicitud continúe normalmente
    return NextResponse.next()
}
export const config = {
    matcher: '/posts/new',
}