'use client'
import React, { useEffect, useState } from 'react'
import { FormAddCompany } from '../_component/AddOrEditCompany'
import { genSignEndPoint } from '@/app/utils'
import { ICompanyList } from '../Company.interface'

export default function FormCompany({ params }: { params: { slug: string } }) {
  const [inforCompanyState, setInforCompanyState] = useState({})
  const [isLoaded, setIsLoaded] = useState(false) // Trạng thái để theo dõi dữ liệu đã được tải hay chưa

  useEffect(() => {
    const getInforCompany = async (id: string) => {
      if (id === 'add') {
        return
      }
      const { nonce, sign, stime, version } = genSignEndPoint()
      const res = await (
        await fetch(`${process.env.NEXT_PUBLIC_HOST_FRONTEND}/api/companies/${id}`, {
          method: 'GET',
          headers: {
            nonce,
            sign,
            stime,
            version
          }
        })
      ).json()
      return res.metaData
    }

    const fetchCompanyInfo = async () => {
      const inforCompany = await getInforCompany(params.slug)
      if (inforCompany) {
        // inforCompany.company_address = inforCompany.company_address.map((item: any) => ({ value: item }))
        setInforCompanyState(inforCompany)
        setIsLoaded(true) // Đánh dấu là dữ liệu đã được tải
      }
    }

    if (!isLoaded && params.slug !== 'add') {
      // Kiểm tra nếu dữ liệu chưa được tải và params.slug không phải là 'add'
      fetchCompanyInfo()
    }
  }, [params.slug, isLoaded]) // Thêm isLoaded vào dependencies để theo dõi sự thay đổi của nó

  useEffect(() => {}, [inforCompanyState])
  return (
    <>
      <span className='font-bold text-2xl text-[#00b14f] pt-20'>
        {params.slug === 'add' ? 'Thêm công ty' : 'Chỉnh sửa thông tin công ty'}
      </span>
      <FormAddCompany inforCompany={inforCompanyState} id={params.slug} />
    </>
  )
}
