'use client'
import React, { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { DataTable } from './_component/DataTable'
import { columns } from './_component/ColumnTable'
import { Res, ResAllCompany, ResMeata } from './Company.interface'
import { genSignEndPoint } from '@/app/utils'
import { number } from 'zod'
import { DataTablePagination } from '../../../components/admin/DataTablePagination'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const AllCompany = async ({ current, pageSize }: { current?: number; pageSize?: number }) => {
  const { sign, stime, version, nonce } = genSignEndPoint()
  const res: Res = await (
    await fetch(`/api/companies?current=${current}&pageSize=${pageSize}`, {
      cache: 'no-store',
      method: 'GET',
      headers: {
        sign,
        stime,
        version,
        nonce
      }
    })
  ).json()
  if (res.statusCode === 200) {
    return {
      data: res.metaData.result,
      meta: res.metaData.meta
    }
  } else {
    toast.error('Đã có lỗi xảy ra vui lòng thử lại')
  }
}

export default function CompanyPage() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [data, setData] = useState<any[]>([])
  const [current, setCurrent] = useState<number>(0)
  const [pageSize, setPageSize] = useState<number>(10)
  const [pages, setPages] = useState<number>(0)
  const [totalItems, setTotalItems] = useState<number>(0)

  const fetchData = async (current: number, pageSize: number) => {
    const allCompany = await AllCompany({ current, pageSize })
    if (allCompany) {
      setData(allCompany.data)
      setPages(allCompany.meta.pages)
      setTotalItems(allCompany.meta.totalItems)
    }
  }

  useEffect(() => {
    fetchData(current + 1, pageSize)
  }, [current, pageSize, searchParams])

  return (
    <>
      <div>
        <span className='font-bold text-2xl text-[#00b14f] pt-20'>Quản lý công ty</span>
      </div>
      <DataTable columns={columns} data={data} />
      <DataTablePagination
        current={current}
        pages={pages}
        setCurrent={setCurrent}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </>
  )
}
