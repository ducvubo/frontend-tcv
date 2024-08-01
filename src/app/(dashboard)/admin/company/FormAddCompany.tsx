'use client'

import { AddCompanyBodyType, CompanyBody } from '@/app/schemaValidations/Company.schema'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { MdDeleteForever } from 'react-icons/md'
import { IoMdAddCircle } from 'react-icons/io'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { genSignEndPoint } from '@/app/utils'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { toast } from 'sonner'

const mdParser = new MarkdownIt()
interface urlImage {
  image_url_cloud: string
  image_url_local: string
  image_url_custom: string
}
export function FormAddCompany() {
  const [file_avatar, setFile_avatar] = useState<File | null>(null)
  const inputRef_avatar = useRef<HTMLInputElement | null>(null)
  const [file_baner, setFile_baner] = useState<File | null>(null)
  const inputRef_baner = useRef<HTMLInputElement | null>(null)
  const previousFileAvatarRef = useRef<Blob | null>(null)
  const previousFileBannerRef = useRef<Blob | null>(null)
  const [loading, setLoading] = useState(false)
  const [loading_upload, setLoading_upload] = useState(false)
  const [avatar, setAvatar] = useState<urlImage>({
    image_url_cloud: '',
    image_url_local: '',
    image_url_custom: ''
  })
  const [banner, setBanner] = useState<urlImage>({
    image_url_cloud: '',
    image_url_local: '',
    image_url_custom: ''
  })
  const form = useForm<AddCompanyBodyType>({
    resolver: zodResolver(CompanyBody),
    defaultValues: {
      company_email: '',
      company_phone: '',
      company_password: '',
      company_name: '',
      company_avatar: '',
      company_banner: '',
      company_description: '',
      company_website: '',
      company_employee_total: '',
      company_code_fiscal: '',
      company_business_field: '',
      company_address: [{ value: '' }],
      company_recruitment_status: ''
    }
  })
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'company_address'
  })

  let image_avatar = form.watch('company_avatar')
  let image_baner = form.watch('company_banner')

  const uploadImage = async (formData: FormData, access_token: string, refresh_token: string, type: string) => {
    setLoading_upload(true)
    try {
      const { sign, stime, version, nonce } = genSignEndPoint()
      const res = await (
        await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND}/upload`, {
          method: 'POST',
          headers: {
            folder_type: type === 'avatar' ? 'images/companies/avatars' : 'images/companies/banners',
            Authorization: `Bearer ${access_token}`,
            'x-rf-tk': refresh_token,
            sign,
            stime,
            version,
            nonce
          },
          body: formData
        })
      ).json()

      if (res.statusCode === 201) {
        setLoading_upload(false)
        toast('Tải ảnh lên thành công', {
          action: {
            label: 'Tắt',
            onClick: () => console.log('Undo')
          }
        })

        type === 'avatar'
          ? setAvatar({
              image_url_cloud: res.metaData.image_url_cloud,
              image_url_local: res.metaData.image_url_local,
              image_url_custom: res.metaData.image_url_custom
            })
          : setBanner({
              image_url_cloud: res.metaData.image_url_cloud,
              image_url_local: res.metaData.image_url_local,
              image_url_custom: res.metaData.image_url_custom
            })

        return res.mataData
        // if (type === 'avatar') {
        //   setFile_avatar(res.metaData.image_url_local)
        // } else {
        //   setFile_baner(res.metaData.image_url_local)
        // }
      }
      if (res.statusCode === 422) {
        setLoading_upload(false)
        type === 'avatar'
          ? (setAvatar({
              image_url_cloud: '',
              image_url_local: '',
              image_url_custom: ''
            }),
            setFile_avatar(null))
          : (setBanner({
              image_url_cloud: '',
              image_url_local: '',
              image_url_custom: ''
            }),
            setFile_baner(null))
        toast.error('Chỉ được tải ảnh jpg, jpeg, png, webp và có dung lượng nhỏ hơn 5MB')
      } else {
        setLoading_upload(false)
        toast.error('Lỗi khi tải ảnh lên')
      }
    } catch (error) {
      setLoading_upload(false)
      console.error('Error:', error)
    }
  }

  const fetchToken = async () => {
    const res = await (await fetch(`${process.env.NEXT_PUBLIC_HOST_FRONTEND}/api/oauth/refresh-token`)).json()
    return res
  }

  useEffect(() => {
    const uploadAvatar = async () => {
      const formData_avatar = new FormData()
      formData_avatar.append('file', file_avatar as Blob)
      try {
        const { access_token, refresh_token } = await fetchToken()
        await uploadImage(formData_avatar, access_token, refresh_token, 'avatar')
      } catch (error) {
        console.error('Failed to upload image:', error)
      }
    }

    const uploadBanner = async () => {
      const formData_avatar = new FormData()
      formData_avatar.append('file', file_avatar as Blob)
      try {
        const { access_token, refresh_token } = await fetchToken()
        await uploadImage(formData_avatar, access_token, refresh_token, 'banner')
      } catch (error) {
        console.error('Failed to upload image:', error)
      }
    }

    if (file_avatar && file_avatar !== previousFileAvatarRef.current) {
      previousFileAvatarRef.current = file_avatar
      uploadAvatar()
    }

    if (file_baner && file_baner !== previousFileBannerRef.current) {
      previousFileBannerRef.current = file_baner
      uploadBanner()
    }
    if (!file_avatar && file_avatar !== previousFileAvatarRef.current) {
      setAvatar({
        image_url_cloud: '',
        image_url_local: '',
        image_url_custom: ''
      })
    }
    if (!file_baner && file_baner !== previousFileBannerRef.current) {
      setBanner({
        image_url_cloud: '',
        image_url_local: '',
        image_url_custom: ''
      })
    }
  }, [file_avatar, file_baner])

  async function onSubmit(values: AddCompanyBodyType) {
    setLoading(true)
    const { sign, stime, version, nonce } = genSignEndPoint()
    const htmlDescription = mdParser.render(values.company_description)
    const payload = { ...values, company_description: htmlDescription }
    const res = await (
      await fetch(`${process.env.NEXT_PUBLIC_HOST_FRONTEND}/api/company`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          sign,
          stime,
          version,
          nonce
        },
        body: JSON.stringify({ ...payload, company_avatar: avatar, company_banner: banner })
      })
    ).json()
    if (res.statusCode === 201) {
      setLoading(false)
      toast('Thêm công ty thành công', {
        action: {
          label: 'Tắt',
          onClick: () => console.log('Undo')
        }
      })
    } else {
      setLoading(false)

      toast.error('Đã có lỗi xảy ra vui lòng thử lại')
    }
  }

  console.log('avatar', avatar)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='topcv' className='ml-2'>
          Thêm công ty
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[900px] h-auto'>
        <DialogHeader>
          <DialogTitle>Thêm công ty</DialogTitle>
        </DialogHeader>
        <ScrollArea>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, (error) => {
                console.log(error) //check loi form khi submit
              })}
              className='space-y-2 max-w-[825px] flex-shrink-0 w-full max-h-[500px] p-2'
            >
              <div className='grid grid-cols-3 gap-4'>
                <div>
                  <FormField
                    control={form.control}
                    name='company_avatar'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ảnh đại diện công ty</FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading_upload ? true : false}
                            type='file'
                            accept='image/*'
                            ref={inputRef_avatar}
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (file && avatar) {
                                setFile_avatar(file)
                                field.onChange('http://localhost:3000/' + file?.name) //set thuoc tinh image
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {(file_avatar || image_avatar) && avatar.image_url_cloud && (
                    <div>
                      <Image
                        src={file_avatar ? URL.createObjectURL(file_avatar) : image_avatar!} //! noi cho nextjs  biet khong the undefine duoc
                        alt='preview'
                        className='w-32 h-32 object-cover rounded-full'
                        width={128}
                        height={128}
                      />
                      <Button
                        type='button'
                        variant={'destructive'}
                        size={'sm'}
                        onClick={() => {
                          setFile_avatar(null)
                          form.setValue('company_avatar', '')
                          if (inputRef_avatar.current) {
                            inputRef_avatar.current.value = ''
                          }
                        }}
                      >
                        Xóa hình ảnh
                      </Button>
                    </div>
                  )}
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name='company_banner'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ảnh bìa công ty</FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading_upload ? true : false}
                            type='file'
                            accept='image/*'
                            ref={inputRef_baner}
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (file) {
                                setFile_baner(file)
                                field.onChange('http://localhost:3000/' + file?.name) //set thuoc tinh image
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {(file_baner || image_baner) && banner && (
                    <div>
                      <Image
                        src={file_baner ? URL.createObjectURL(file_baner) : image_baner!} //! noi cho nextjs  biet khong the undefine duoc
                        alt='preview'
                        className='w-56 h-32 object-cover'
                        width={244}
                        height={128}
                      />
                      <Button
                        type='button'
                        variant={'destructive'}
                        size={'sm'}
                        onClick={() => {
                          setFile_baner(null)
                          form.setValue('company_banner', '')
                          if (inputRef_baner.current) {
                            inputRef_baner.current.value = ''
                          }
                        }}
                      >
                        Xóa hình ảnh
                      </Button>
                    </div>
                  )}
                </div>
                <FormField
                  control={form.control}
                  name='company_name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên công ty</FormLabel>
                      <FormControl>
                        <Input placeholder='Tên công ty...' type='text' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='company_email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder='Email...' type='email' {...field} />
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
                      <FormLabel>Mật khẩu</FormLabel>
                      <FormControl>
                        <Input placeholder='Mật khẩu...' type='password' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='company_phone'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Số điện thoại liên hệ</FormLabel>
                      <FormControl>
                        <Input placeholder='Số điện thoại liên hệ' type='text' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='company_website'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input placeholder='URL Website...' type='text' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='company_code_fiscal'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mã số thuế</FormLabel>
                      <FormControl>
                        <Input placeholder='Mã số thuế...' type='text' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='company_business_field'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lĩnh vực kinh doanh</FormLabel>
                      <FormControl>
                        <Input placeholder='Lĩnh vực kinh doanh...' type='text' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='company_employee_total'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tổng số công nhân viên</FormLabel>
                      <FormControl>
                        <Input placeholder='Tổng số công nhân viên...' type='text' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='mt-3 ml-5'>
                  <FormField
                    control={form.control}
                    name='company_recruitment_status'
                    render={({ field }) => (
                      <FormItem className='space-y-3'>
                        <FormLabel>Nhu cầu tuyển dụng ?</FormLabel>
                        <FormControl>
                          <RadioGroup onValueChange={field.onChange} className='flex  space-y-1'>
                            <FormItem className='flex items-center space-x-3 space-y-0'>
                              <FormControl>
                                <RadioGroupItem value='Yes' />
                              </FormControl>
                              <FormLabel className='font-normal'>Có</FormLabel>
                            </FormItem>
                            <FormItem className='flex items-center space-x-3 space-y-0'>
                              <FormControl>
                                <RadioGroupItem value='No' />
                              </FormControl>
                              <FormLabel className='font-normal'>Không</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className=''>
                {fields.map((item: any, index: any) => (
                  <div key={item.id} className='flex'>
                    <FormField
                      control={form.control}
                      name={`company_address.${index}.value`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Địa chỉ công ty {index + 1} </FormLabel>
                          <FormControl>
                            <Input placeholder='Địa chỉ công ty...' type='text' {...field} className='w-[750px]' />
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

              <FormField
                control={form.control}
                name='company_description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mô tả công ty</FormLabel>
                    <FormControl>
                      {/* <Input placeholder='Mô tả công ty...' type='text' {...field} /> */}
                      <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={(text: any) => mdParser.render(text)}
                        onChange={({ text }) => field.onChange(text)}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type='submit' className='!mt-8 w-full' variant='topcv'>
                  Thêm
                </Button>
              </DialogFooter>
            </form>
          </Form>
          <Separator />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
