import { cookies } from 'next/headers'
export async function POST(req: Request) {
  const header = req.headers
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
  const body = await req.json()
  const company_address = body.company_address.map((item: any) => item.value)
  body.company_address = company_address

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND}/companies`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${access_token}`,
      'x-rf-tk': refresh_token,
      'Content-Type': 'application/json',
      nonce,
      stime,
      sign,
      version
    },
    body: JSON.stringify(body)
  })

  const data = await res.json()

  return new Response(JSON.stringify(data), {
    status: data.statusCode
  })
}
