'use client'
import { genSignEndPoint } from '@/app/utils'
import { redirect, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { inforUserState, startAppUser } from './inforUser.slice'
import { inforCompanyState, startAppCompany } from './inforCompany.slice'
import { useSession } from 'next-auth/react'
export default function RefreshToken() {
  const Params = useSearchParams()
  const access_token = Params.get('access_token')
  const refresh_token = Params.get('refresh_token')
  const searchParams = useSearchParams()
  const dispatch = useDispatch()
  const router = useRouter()
  const { data: session } = useSession()

  const runAppUser = (inforUser: inforUserState) => {
    dispatch(startAppUser(inforUser))
  }

  const runAppCompany = (inforCompany: inforCompanyState) => {
    dispatch(startAppCompany(inforCompany))
  }

  console.log(session)

  const fetchData = async () => {
    const { sign, stime, version, nonce } = genSignEndPoint()
    try {
      const refreshResponse = await fetch(`http://localhost:3000/api/oauth/refresh-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          sign,
          stime: stime.toString(),
          version,
          nonce
        }
      })
      const refreshData = await refreshResponse.json()

      if (refreshData.statusCodes === 200) {
        if (refreshData.type === 'user') {
          const { sign, stime, version, nonce } = genSignEndPoint()
          const userResponse = await fetch(`http://localhost:3000/api/oauth/infor-user`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              sign,
              stime: stime.toString(),
              version,
              nonce
            }
          })
          const userData = await userResponse.json()
          if (userData.statusCodes === 200) {
            runAppUser(userData.data)
          }
        } else if (refreshData.type === 'company') {
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
            runAppCompany(companyData.data)
          } else {
            toast.error('Đã có lỗi xảy ra vui lòng thử lại')
          }
        }
      } else {
        // router.push('/')
      }
    } catch (err) {
      console.log(err)
    }
  }

  const fetchDataSSO = async () => {
    const { sign, stime, version, nonce } = genSignEndPoint()
    fetch('http://localhost:3000/api/oauth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        nonce,
        stime: stime.toString(),
        sign,
        version
      },
      body: JSON.stringify({ access_token, refresh_token })
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.statusCodes === 200) {
          const { sign, stime, version, nonce } = genSignEndPoint()
          fetch('http://localhost:3000/api/oauth/infor-user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              sign,
              stime: stime.toString(),
              version,
              nonce
            }
          })
            .then((r) => r.json())
            .then((data) => {
              if (data.statusCodes === 200) {
                runAppUser(data.data)
                toast.success('Đăng nhập thành công')
                router.push('/')
              }
            })
            .catch((err) => console.log(err))
        } else {
          toast.error('Đã có lỗi xảy ra vui lòng thử lại')
        }
      })
  }

  useEffect(() => {
    if (access_token || refresh_token) {
      fetchDataSSO()
      const interval = setInterval(() => {
        fetchData() // Gọi lại API mỗi phút
      }, 1000 * 60 * 10)
      return () => clearInterval(interval)
    } else {
      fetchData()
      const interval = setInterval(() => {
        fetchData() // Gọi lại API mỗi phút
      }, 1000 * 60 * 10)
      return () => clearInterval(interval)
    }
  }, [])

  return <></>
}
