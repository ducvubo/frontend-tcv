import { cookies } from 'next/headers'

// export async function POST(req: R, res: NextApiResponse) {
//   const form = new formidable.IncomingForm()

//   form.parse(req, async (err, fields, files) => {
//     if (err) {
//       res.status(500).json({ error: 'Error parsing the files' })
//       return
//     }

//     const file = files.company_avatar as unknown as formidable.File

//     if (file) {
//       const fileStream = fs.createReadStream(file.filepath)

//       const formData = new FormData()
//       formData.append('file', fileStream, file.originalFilename as any)

//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND}/upload/local`, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${fields.access_token}`,
//           'x-rf-tk': fields.refresh_token as any,
//           folder_type: fields.folder_type as any,
//           nonce: fields.nonce as any,
//           stime: fields.stime as any,
//           sign: fields.sign as any,
//           version: fields.version as any
//         },
//         body: formData
//       })

//       const data = await response.json()

//       res.status(response.status).json(data)
//     } else {
//       res.status(400).json({ error: 'No file uploaded' })
//     }
//   })
//   // console.log('sdfdsf::::::::::::')
//   // const header = req.headers
//   // const nonce = header.get('nonce') || ''
//   // const stime = header.get('stime') || ''
//   // const sign = header.get('sign') || ''
//   // const version = header.get('version') || ''
//   // const folder_type = header.get('folder_type') || ''
//   // const cookieStore = cookies()
//   // const access_token = cookieStore.get('access_token')?.value
//   // const refresh_token = cookieStore.get('refresh_token')?.value
//   // if (!access_token || !refresh_token) {
//   //   return new Response(JSON.stringify({ message: 'No cookies found', statusCodes: 400 }), {
//   //     status: 400
//   //   })
//   // }
//   // // console.log('req:::::::::::', req)
//   // // const body = await req.json()
//   // // const company_address = body.company_address.map((item: any) => item.value)
//   // // body.company_address = company_address
//   // const formData = new FormData()
//   // // formData.append('file', file_avatar as Blob)
//   // formData.append('company_avatar', req.body as any)
//   // const res = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND}/upload/local`, {
//   //   method: 'POST',
//   //   headers: {
//   //     Authorization: `Bearer ${access_token}`,
//   //     'x-rf-tk': refresh_token,
//   //     folder_type,
//   //     nonce,
//   //     stime,
//   //     sign,
//   //     version
//   //   },
//   //   body: formData
//   // })
//   // const data = await res.json()
//   // return new Response(JSON.stringify(data), {
//   //   status: data.statusCode
//   // })
// }
