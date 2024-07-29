import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const header = request.headers
  const nonce = header.get('nonce') || ''
  const stime = header.get('stime') || ''
  const sign = header.get('sign') || ''
  const version = header.get('version') || ''

  const cookieStore = cookies()
  const access_token = cookieStore.get('access_token')?.value
  const refresh_token = cookieStore.get('refresh_token')?.value
  if (!access_token || !refresh_token) {
    return new Response(JSON.stringify({ message: 'No cookies found', statusCodes: 400 }), {
      status: 400
    })
  }
  if (access_token && refresh_token) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND}/users/refresh-token`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'x-rf-tk': refresh_token,
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
        const accessCookie = `access_token=${
          data.data.access_token
        }; Path=/; HttpOnly; Expires=${refreshExpires.toUTCString()}); SameSite=Lax; Secure;`
        const refreshCookie = `refresh_token=${
          data.data.refresh_token
        }; Path=/; HttpOnly; Expires=${refreshExpires.toUTCString()}; SameSite=Lax; Secure ;`

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
      } else {
        return new Response(JSON.stringify({ message: 'Unauthorized', statusCodes: 401 }), {
          status: 401
        })
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }
}
