'use client'
import React, { useEffect, useState } from 'react'
import { FormAddCompany } from '../_component/AddOrEditCompany'
import { genSignEndPoint } from '@/app/utils'
import { ICompanyList } from '../Company.interface'

export default function GetDataEdit({ params }: { params: { slug: string } }) {
  const [inforCompanyState, setInforCompanyState] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const getInforCompany = async (id: string) => {
      if (id === 'add') {
        return
      }
      const { nonce, sign, stime, version } = genSignEndPoint()
      const res = await (
        await fetch(`${process.env.NEXT_PUBLIC_HOST_FRONTEND}/api/admin/companies/${id}`, {
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
        setInforCompanyState(inforCompany)
        setIsLoaded(true)
      }
    }

    if (!isLoaded && params.slug !== 'add') {
      fetchCompanyInfo()
    }
  }, [params.slug, isLoaded])

  useEffect(() => {}, [inforCompanyState])
  return (
    <>
      <FormAddCompany inforCompany={inforCompanyState} id={params.slug} />
    </>
  )
}
