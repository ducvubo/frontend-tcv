'use server'
import { sendRequest } from '@/lib/api'

export const getJobPagination = async (current: number, pageSize: number) => {
  const res: IBackendRes<any> = await sendRequest({
    method: 'GET',
    url: `${process.env.API_BACKEND}/jobs?current=${current}&pageSize=${pageSize}`,
    nextOption: {
      cache: 'no-store'
    }
  })
  return res
}

export const addJob = async (payload: any) => {
  const res: IBackendRes<any> = await sendRequest({
    method: 'POST',
    url: `${process.env.API_BACKEND}/jobs`,
    body: payload
  })
  return res
}

export const updateJob = async (jobId: string, payload: any) => {
  const res: IBackendRes<any> = await sendRequest({
    method: 'PATCH',
    url: `${process.env.API_BACKEND}/jobs/${jobId}`,
    body: payload
  })
  return res
}

export const getDataEdit = async (jobId: string) => {
  const res: IBackendRes<any> = await sendRequest({
    method: 'GET',
    url: `${process.env.API_BACKEND}/jobs/${jobId}`,
    nextOption: {
      cache: 'no-store'
    }
  })
  return res
}

export const deleteJob = async (jobId: string) => {
  const res: IBackendRes<any> = await sendRequest({
    method: 'DELETE',
    url: `${process.env.API_BACKEND}/jobs/${jobId}`
  })
  return res
}
