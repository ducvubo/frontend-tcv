import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const header = req.headers
  const nonce = header.get('nonce') || ''
  const stime = header.get('stime') || ''
  const sign = header.get('sign') || ''
  const version = header.get('version') || ''
  const { access_token, refresh_token } = await req.json()
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND}/users/sso`, {
      method: 'POST',
      body: JSON.stringify({ access_token, refresh_token }),
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        nonce,
        stime,
        sign,
        version
      }
    })
    const data = await res.json()

    if (data.statusCode === 201) {
      const refreshExpires = new Date()
      refreshExpires.setDate(refreshExpires.getDate() + Number(process.env.NEXT_PUBLIC_TOKEN_EXPIRES_SSO as string)) // Set expires to 15 days from now
      const accessCookie = `access_token=${access_token}; Path=/; HttpOnly; Expires=${refreshExpires.toUTCString()}); SameSite=Lax; Secure;`
      const refreshCookie = `refresh_token=${refresh_token}; Path=/; HttpOnly; Expires=${refreshExpires.toUTCString()}; SameSite=Lax; Secure ;`

      const responseHeaders = new Headers()
      responseHeaders.append('Set-Cookie', accessCookie)
      responseHeaders.append('Set-Cookie', refreshCookie)
      return new Response(JSON.stringify({ message: 'ok ok ok', statusCodes: 200 }), {
        status: 200,
        headers: responseHeaders
      })
    }
    if (data.statusCode === 403) {
      return new Response(JSON.stringify({ message: 'Forbidden', statusCodes: 403 }), {
        status: 403
      })
    }
    return new Response(JSON.stringify({ message: 'Unauthorziration', statusCodes: 401 }), {
      status: 401
    })
  } catch (error) {
    console.log('error:::::', error)
  }
}
