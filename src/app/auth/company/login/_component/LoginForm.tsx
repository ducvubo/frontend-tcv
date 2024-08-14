'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LoginCompanyBody, LoginCompanyBodyType } from '@/app/schemaValidations/Company.schema'
import { genSignEndPoint } from '@/app/utils'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { inforCompanyState, startAppCompany } from '@/app/auth/cookie/inforCompany.slice'
import { useDispatch } from 'react-redux'
export function LoginForm() {
  const router = useRouter()
  const dispatch = useDispatch()
  const form = useForm<LoginCompanyBodyType>({
    resolver: zodResolver(LoginCompanyBody),
    defaultValues: {
      company_email: '',
      company_password: ''
    },
    mode: 'onChange'
  })

  const loginSuccessCompany = (inforCompany: inforCompanyState) => {
    dispatch(startAppCompany(inforCompany))
  }

  async function onSubmit(values: LoginCompanyBodyType) {
    console.log(values)
    const { nonce, sign, stime, version } = genSignEndPoint()
    try {
      const res = await (
        await fetch(`${process.env.NEXT_PUBLIC_HOST_FRONTEND}/api/auth/company/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            sign,
            stime,
            version,
            nonce
          },
          body: JSON.stringify(values)
        })
      ).json()
      if (res.statusCode === 201) {
        toast('Đăng nhập thành công', {
          action: {
            label: 'Tắt',
            onClick: () => null
          }
        })
        const { sign, stime, version, nonce } = genSignEndPoint()
        const InforCompany = await fetch(`http://localhost:3000/api/oauth/infor-company`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            sign,
            stime: stime.toString(),
            version,
            nonce
          }
        })
        const companyData = await InforCompany.json()
        if (companyData.statusCodes === 200) {
          router.push('/dashboard/company')
          loginSuccessCompany(companyData.data)
        } else {
          toast.error('Đã có lỗi xảy ra vui lòng thử lại')
        }
      }
      if (res.statusCode === 409) {
        toast(`${res.message}`, {
          action: {
            label: 'Tắt',
            onClick: () => null
          }
        })
      }
      if (res.statusCode === 400) {
        res?.message.map((msg: any) => {
          toast(`${msg}`, {
            action: {
              label: 'Tắt',
              onClick: () => null
            }
          })
        })
      }
    } catch (error) {
      toast('Đã có lỗi xảy ra vui lòng thử lại', {
        action: {
          label: 'Tắt',
          onClick: () => null
        }
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 mt-4'>
        <FormField
          control={form.control}
          name='company_email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='Email...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='company_password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder='Password...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' variant={'topcv'} disabled={!form.formState.isValid} className='w-full'>
          Đăng nhập
        </Button>
      </form>
    </Form>
  )
}
