'use client'
import { genSignEndPoint } from '@/app/utils'
import React, { useEffect, useState } from 'react'
import FormAddOrEditJob from './AddOrEditJob'
import { IJob } from '../job.interface'
import { useRouter } from 'next/navigation'
import { getDataEdit } from '../api'
import FormAddOrEditJobTest from './text'

export default function GetDataEdit({ params }: any) {
  const router = useRouter()
  const [inforJob, setInforJob] = useState()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const getInforJobWithCompany = async (id: string) => {
      if (id === 'add') {
        return
      }
      // const { nonce, sign, stime, version } = genSignEndPoint()
      // const res = await (
      //   await fetch(`${process.env.NEXT_PUBLIC_HOST_FRONTEND}/api/company/job/${id}`, {
      //     method: 'GET',
      //     headers: {
      //       nonce,
      //       sign,
      //       stime,
      //       version
      //     }
      //   })
      // ).json()
      const res = await getDataEdit(id)
      console.log(res)
      if (res.statusCode === 200) {
        return res.metaData
      } else {
        router.push('/dashboard/company/job')
        router.refresh()
      }
    }

    const fetchCompanyInfo = async () => {
      const inforJob = await getInforJobWithCompany(params.slug)
      if (inforJob) {
        setInforJob(inforJob)
        setIsLoaded(true)
      }
    }

    if (!isLoaded && params.slug !== 'add') {
      fetchCompanyInfo()
    }
  }, [params.slug, isLoaded])

  useEffect(() => {}, [inforJob])
  return <FormAddOrEditJob inforJob={inforJob} id={params.slug} />
  // return <FormAddOrEditJobTest inforJob={inforJob} id={params.slug} />
}
