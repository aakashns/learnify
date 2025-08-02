import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the basic auth header
  const basicAuth = request.headers.get('authorization')

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1]
    const [user, pwd] = atob(authValue).split(':')

    // Check credentials
    if (user === 'learnify' && pwd === 'agihouse') {
      return NextResponse.next()
    }
  }

  // Return 401 with WWW-Authenticate header to prompt for basic auth
  return new NextResponse('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Learnify App"'
    }
  })
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}