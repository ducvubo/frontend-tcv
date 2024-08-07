import { hashPayLoad } from '@/app/utils'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  // const header = request.headers
  // const nonce = header.get('nonce') || ''
  // const stime = header.get('stime') || ''
  // const sign = header.get('sign') || ''
  // const version = header.get('version') || ''
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
      const { dataHash, nonce, sign, stime, version } = hashPayLoad({ access_token, refresh_token })
      const res = await fetch(`${process.env.API_BACKEND}/users/refresh-token`, {
        method: 'POST',
        headers: {
          key: process.env.API_KEY_BACKEND as string,
          secret: process.env.API_SECRET_BACKEND as string,
          Authorization: `Bearer ${access_token}`,
          'x-rf-tk': refresh_token,
          'Content-Type': 'application/json',
          nonce,
          stime,
          sign,
          version
        },
        body: JSON.stringify(dataHash)
      })
      const data = await res.json()
      if (data.statusCode === 201) {
        const refreshExpires = new Date()
        refreshExpires.setDate(refreshExpires.getDate() + Number(process.env.NEXT_PUBLIC_TOKEN_EXPIRES_SSO as string)) // Set expires to 15 days from now
        const accessCookie = `access_token=${
          data.metaData.access_token
        }; Path=/; HttpOnly; Expires=${refreshExpires.toUTCString()}); SameSite=Lax; Secure;`
        const refreshCookie = `refresh_token=${
          data.metaData.refresh_token
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
        const accessCookie = `access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Strict`
        const refreshCookie = `refresh_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Strict`
        const responseHeaders = new Headers()
        responseHeaders.append('Set-Cookie', accessCookie)
        responseHeaders.append('Set-Cookie', refreshCookie)
        return new Response(JSON.stringify({ message: 'Unauthorized1', statusCodes: 401 }), {
          status: 401,
          headers: responseHeaders
        })
      }
    } catch (error) {
      const accessCookie = `access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Strict`
      const refreshCookie = `refresh_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Strict`
      const responseHeaders = new Headers()
      responseHeaders.append('Set-Cookie', accessCookie)
      responseHeaders.append('Set-Cookie', refreshCookie)
      return new Response(JSON.stringify({ message: 'Unauthorized1', statusCodes: 401 }), {
        status: 401,
        headers: responseHeaders
      })
    }
  }
}

// export async function GET(request: Request) {
//   const cookieStore = cookies()
//   const access_token = cookieStore.get('access_token')?.value
//   const refresh_token = cookieStore.get('refresh_token')?.value
//   if (!access_token || !refresh_token) {
//     return new Response(JSON.stringify({ message: 'No cookies found', statusCodes: 400 }), {
//       status: 400
//     })
//   } else {
//     return new Response(JSON.stringify({ access_token, refresh_token }), {
//       status: 200
//     })
//   }
// }
