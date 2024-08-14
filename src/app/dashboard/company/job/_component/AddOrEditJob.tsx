'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { vi } from 'date-fns/locale'
import { useEffect, useState } from 'react'
import { JobBody, JobBodyType } from '@/app/schemaValidations/Job.schema'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { addDays, format } from 'date-fns'
import { DateRange } from 'react-day-picker'
import { CalendarIcon } from '@radix-ui/react-icons'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import React from 'react'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
import { IMarkDown } from '../job.interface'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { MdDeleteForever } from 'react-icons/md'
import { IoMdAddCircle } from 'react-icons/io'
import InputArr from '@/components/inputArr'
import { genSignEndPoint } from '@/app/utils'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const mdParser = new MarkdownIt()
const markdownDefault = {
  text: '',
  html: ''
}
export default function FormAddOrEditJob({ inforJob, id }: { inforJob: any; id: string }) {
  const router = useRouter()
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: addDays(new Date(), 1),
    to: new Date()
  })
  const [job_requirements, setJob_requirements] = useState<IMarkDown>(markdownDefault)
  const [job_benefits, setJob_benefits] = useState<IMarkDown>(markdownDefault)
  const [job_additional_requirements, setJob_additional_requirements] = useState<IMarkDown>(markdownDefault)
  const [job_description, setJob_description] = useState<IMarkDown>(markdownDefault)
  const [job_career, setJob_career] = useState<string[]>([])
  const [job_skills, setJob_skills] = useState<string[]>([])
  const [job_area, setJob_area] = useState<string[]>([])

  const form = useForm<JobBodyType>({
    resolver: zodResolver(JobBody),
    defaultValues: {
      job_name: '',
      job_wage: '',
      job_address_summary: '',
      job_exp: '',
      job_rank: '',
      job_quantity: 0,
      job_working_type: '',
      job_gender: '',
      job_specific_location: [{ value: '' }],
      job_isPublished: false,
      job_isDraft: true
    },
    mode: 'onChange'
  })

  const { reset, watch, control } = form

  useEffect(() => {
    if (inforJob && id !== 'add') {
      setJob_additional_requirements({
        text: inforJob.job_additional_requirements?.text || '',
        html: inforJob.job_additional_requirements?.html || ''
      })
      setJob_benefits({
        text: inforJob.job_benefits?.text || '',
        html: inforJob.job_benefits?.html || ''
      })
      setJob_career(inforJob?.job_career || [])
      setJob_skills(inforJob?.job_skills || [])
      setJob_area(inforJob?.job_area || [])
      setJob_requirements({
        text: inforJob.job_requirements?.text || '',
        html: inforJob.job_requirements?.html || ''
      })
      setJob_description({
        text: inforJob.job_description?.text || '',
        html: inforJob.job_description?.html || ''
      })

      reset({
        job_name: inforJob.job_name || '',
        job_wage: inforJob.job_wage || '',
        job_address_summary: inforJob.job_address_summary || '',
        job_exp: inforJob.job_exp || '',
        job_rank: inforJob.job_rank || '',
        job_quantity: inforJob.job_quantity || 0,
        job_working_type: inforJob.job_working_type || '',
        job_gender: inforJob.job_gender || '',
        job_specific_location: inforJob?.job_specific_location?.map((item: any) => ({ value: item })) || [
          { value: '' }
        ],
        job_isPublished: inforJob.job_isPublished || false,
        job_isDraft: inforJob.job_isDraft || true
      })
      if (inforJob.job_start_date && inforJob.job_start_date) {
        const dateTo = new Date(inforJob?.job_start_date)
        const dateFrom = new Date(inforJob?.job_end_date)
        setDate({
          to: dateTo,
          from: dateFrom
        })
      }
    }
  }, [inforJob, reset])

  console.log(job_benefits)
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'job_specific_location'
  })

  const onChangeMarkdown = (text: string, html: string, type: string) => {
    switch (type) {
      case 'job_description':
        setJob_description({ text, html })
        break
      case 'job_benefits':
        setJob_benefits({ text, html })
        break
      case 'job_additional_requirements':
        setJob_additional_requirements({ text, html })
        break
      case 'job_requirements':
        setJob_requirements({ text, html })
        break
    }
  }

  async function onSubmit(values: JobBodyType) {
    if (!date || !date.to || !date.from) {
      toast('Vui lòng chọn ngày tháng')
      return
    }
    const job_specific_location = values.job_specific_location.map((item) => item.value)
    const payload = {
      ...values,
      job_requirements,
      job_description,
      job_benefits,
      job_additional_requirements,
      job_start_date: date?.to,
      job_end_date: date?.from,
      job_specific_location,
      job_career,
      job_skills,
      job_area
    }
    if (id === 'add') {
      const { nonce, sign, stime, version } = genSignEndPoint()
      const res = await (
        await fetch(`${process.env.NEXT_PUBLIC_HOST_FRONTEND}/api/company/job`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            sign,
            stime,
            version,
            nonce
          },
          body: JSON.stringify(payload)
        })
      ).json()
      if (res.statusCode === 201) {
        router.push('/dashboard/company/job')
        router.refresh()
        toast('Tạo job thành công, vui lòng chờ duyệt', {
          action: {
            label: 'Tắt',
            onClick: () => null
          }
        })
      }
      if (res.statusCode === 400) {
        res.message.map((item: string) => {
          toast.error(item)
        })
      }
      if (res.statusCode === 409) {
        toast.error(res.message)
      } else {
        toast.error(res.message)
      }
    } else {
      const { nonce, sign, stime, version } = genSignEndPoint()
      const res = await (
        await fetch(`${process.env.NEXT_PUBLIC_HOST_FRONTEND}/api/company/job/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            sign,
            stime,
            version,
            nonce
          },
          body: JSON.stringify(payload)
        })
      ).json()
      if (res.statusCode === 200) {
        router.push('/dashboard/company/job')
        router.refresh()
        toast('Chỉnh sửa job thành công, vui lòng chờ duyệt', {
          action: {
            label: 'Tắt',
            onClick: () => null
          }
        })
      }
      if (res.statusCode === 400) {
        res.message.map((item: string) => {
          toast.error(item)
        })
      }
      if (res.statusCode === 409) {
        toast.error(res.message)
      } else {
        toast.error(res.message)
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (error) => {
          console.log(error)
        })}
        className='space-y-2 flex-shrink-0 w-full pb-10'
      >
        <div className='grid grid-cols-3 gap-4 w-full'>
          <FormField
            control={form.control}
            name='job_name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên tin tuyển dụng*</FormLabel>
                <FormControl>
                  <Input placeholder='Tên tin tuyển dụng' type='text' {...field} className='' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='job_wage'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mức lương*</FormLabel>
                <FormControl>
                  <Input placeholder='Mức lương' type='text' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='job_address_summary'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Địa chỉ ngắn gọn*</FormLabel>
                <FormControl>
                  <Input placeholder='Địa chỉ ngắn gọn' type='text' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='job_exp'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Yêu cầu kinh nghiệm*</FormLabel>
                <FormControl>
                  <Input placeholder='Yêu cầu  kinh nghiệm' type='text' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='job_rank'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cấp bậc*</FormLabel>
                <FormControl>
                  <Input placeholder='Cấp bậc' type='text' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='job_quantity'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số lượng tuyển*</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Số lượng tuyển'
                    type='number'
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='job_working_type'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hình thức làm việc*</FormLabel>
                <FormControl>
                  <Input placeholder='Hình thức làm việc' type='text' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='job_gender'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giới tính*</FormLabel>
                <FormControl>
                  <Input placeholder='Giới tính' type='text' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='mt-[5px] flex gap-[14px] flex-col'>
            <Label>Ngày bắt đầu - kết thúc*</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id='date'
                  variant={'outline'}
                  className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground')}
                >
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.to, 'dd/MM/yyyy', { locale: vi })} -{' '}
                        {format(date.from, 'dd/MM/yyyy', { locale: vi })}
                      </>
                    ) : (
                      format(date.from, 'dd/MM/yyyy', { locale: vi })
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0' align='start'>
                <Calendar
                  initialFocus
                  mode='range'
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                  disabled={(date) => date < new Date()}
                  locale={vi}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className='w-full flex gap-3 pt-3'>
          <FormField
            control={form.control}
            name='job_isPublished'
            render={({ field }) => (
              <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm w-1/2'>
                <FormLabel>Trạng thái publish*</FormLabel>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='job_isDraft'
            render={({ field }) => (
              <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm w-1/2'>
                <FormLabel>Trạng thái bản nháp*</FormLabel>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className='w-full'>
          {fields.map((item: any, index: any) => (
            <div key={index} className='flex'>
              <FormField
                control={form.control}
                name={`job_specific_location.${index}.value`}
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Địa chỉ cụ thể {index + 1} *</FormLabel>
                    <FormControl className='w-full'>
                      <Input
                        placeholder='Địa chỉ cụ thể...'
                        type='text'
                        {...field}
                        // className={fields.length <= 1 ? 'w-[890px]' : 'w-[865px]'}
                        className='w-full'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {fields.length > 1 && (
                <span onClick={() => remove(index)} className='mt-10 cursor-pointer ml-2'>
                  <MdDeleteForever />
                </span>
              )}
              <span onClick={() => append({ value: '' })} className='mt-10 cursor-pointer ml-5'>
                <IoMdAddCircle />
              </span>
            </div>
          ))}
        </div>
        <div>
          <Label>Mô tả công việc*</Label>
          <MdEditor
            value={job_description.text}
            style={{ height: '300px', width: '100%' }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={({ html, text }) => onChangeMarkdown(text, html, 'job_description')}
          />
        </div>
        <div>
          <Label>Yêu cầu ứng viên*</Label>
          <MdEditor
            value={job_requirements.text}
            style={{ height: '300px', width: '100%' }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={({ html, text }) => onChangeMarkdown(text, html, 'job_requirements')}
          />
        </div>
        <div>
          <Label>Quyền lợi của ứng viên*</Label>
          <MdEditor
            value={job_benefits.text}
            style={{ height: '300px', width: '100%' }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={({ html, text }) => onChangeMarkdown(text, html, 'job_benefits')}
          />
        </div>
        <div>
          <Label>Yêu cầu thêm</Label>
          <MdEditor
            value={job_additional_requirements.text}
            style={{ height: '300px', width: '100%' }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={({ html, text }) => onChangeMarkdown(text, html, 'job_additional_requirements')}
          />
        </div>
        <Label>Ngành nghề</Label>
        <InputArr data={job_career} setData={setJob_career} tag='Thêm tag ngành nghề' className='w-full' />
        <Label>Kỹ năng</Label>
        <InputArr data={job_skills} setData={setJob_skills} tag='Thêm tag kỹ năng' className='w-full' />
        <Label>Khu vực làm việc</Label>
        <InputArr data={job_area} setData={setJob_area} tag='Thêm tag khu vực làm việc' className='w-full' />
        <Label className='opacity-65'>Những trường có dấu * là bắt buộc</Label>
        <Button type='submit' className='!mt-4 w-full' variant={'topcv'}>
          Thêm
        </Button>
      </form>
    </Form>
  )
}
