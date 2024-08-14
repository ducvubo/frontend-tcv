'use server'
import { signIn } from '@/auth'

export async function authenticate(company_email: string, company_password: string) {
  try {
    const r = await signIn('credentials', {
      company_email: company_email,
      company_password: company_password,
      // callbackUrl: '/',
      redirect: false
    })
    return r
  } catch (error) {
    // console.log('check error:::', JSON.stringify(error))
    if ((error as any).name === 'InvalidEmailPasswordError') {
      return {
        error: (error as any).type,
        code: 1
      }
    }
  }
}
