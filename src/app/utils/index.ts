import { sign } from 'crypto'
import md5 from 'md5'
import { redirect } from 'next/navigation'

const getRandomNonce = (num: number) => {
  return Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, num - 1))
}

const keyToken = process.env.NEXT_PUBLIC_KEY_SECRET_API_ENDPOINT
const versionToken = 'v1'
export function genSignEndPoint() {
  const headers: any = {}
  const stime = Date.now()
  const nonce = getRandomNonce(20).toString()

  headers.stime = stime
  headers.nonce = nonce

  const sortKeys: string[] = []
  for (const key in headers) {
    if (key !== 'sign') {
      sortKeys.push(key)
    }
  }
  sortKeys.sort()
  let headersString = ''
  sortKeys.forEach((key) => {
    headersString += key + headers[key]
  })

  const sign = md5(headersString + keyToken + versionToken).toString()

  return {
    sign: sign,
    version: versionToken,
    nonce: nonce,
    stime: stime.toString()
  }
}
