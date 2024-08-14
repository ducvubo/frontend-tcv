import Credentials from 'next-auth/providers/credentials'
import NextAuth from 'next-auth'
import { InternalServer, InvalidEmailPasswordError, SignTokenExist } from './lib/error'
import { sendRequest } from './lib/api'
import { genSignEndPoint } from './app/utils'
import { ICompanyList } from './app/dashboard/admin/company/Company.interface'

interface ILoginSuccess {
  cp_access_token: string
  cp_refresh_token: string
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        company_email: {},
        company_password: {}
      },
      authorize: async (credentials) => {
        let user = null
        console.log('check credentials', credentials)
        const { nonce, sign, stime, version } = genSignEndPoint()
        const resLogin: IBackendRes<ILoginSuccess> = await sendRequest({
          method: 'POST',
          headers: {
            key: process.env.API_KEY_BACKEND as string,
            secret: process.env.API_SECRET_BACKEND as string,
            sign,
            stime,
            version,
            nonce
          },
          url: `http://localhost:4000/api/v1/auth/company/login`,
          body: {
            company_email: credentials.company_email,
            company_password: credentials.company_password
          }
        })

        if (+resLogin.statusCode === 201) {
          const cp_access_token = resLogin.metaData?.cp_access_token
          const cp_refresh_token = resLogin.metaData?.cp_refresh_token
          const { nonce, sign, stime, version } = genSignEndPoint()
          const resInfor: IBackendRes<ICompanyList> = await sendRequest({
            method: 'GET',
            headers: {
              key: process.env.API_KEY_BACKEND as string,
              secret: process.env.API_SECRET_BACKEND as string,
              sign,
              stime,
              version,
              nonce,
              'x-rf-tk-cp': `Bearer ${cp_refresh_token}`,
              'x-at-tk-cp': `Bearer ${cp_access_token}`
            },
            url: `http://localhost:4000/api/v1/auth/company/get-infor`
          })

          if (resInfor.statusCode === 200) {
            user = {
              _id: resInfor.metaData?._id,
              company_email: resInfor.metaData?.company_email,
              company_phone: resInfor.metaData?.company_phone,
              company_name: resInfor.metaData?.company_name,
              cp_access_token: resLogin.metaData?.cp_access_token,
              cp_refresh_token: resLogin.metaData?.cp_refresh_token
            }
            return user // Trả về thông tin người dùng hợp lệ
          } else {
            throw new InvalidEmailPasswordError()
          }
        } else if (+resLogin.statusCode === 403) {
          throw new SignTokenExist()
        } else if (+resLogin.statusCode === 409) {
          throw new InvalidEmailPasswordError()
        } else {
          throw new InternalServer()
        }
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token = { ...token, ...user } // Cập nhật token với thông tin người dùng
        token.exp = Math.floor(Date.now() / 1000) + 10 * 60
      }
      return token
    },
    session({ session, token }) {
      session.user = token as any // Đảm bảo session chứa thông tin người dùng
      return session
    }
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 10 * 24 * 60 * 60 // Thời gian hết hạn của cookie là 10 ngày
      }
    }
  }
})
