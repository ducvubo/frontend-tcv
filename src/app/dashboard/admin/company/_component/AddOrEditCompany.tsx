'use client'
import { AddCompanyBodyType, CompanyBody } from '@/app/schemaValidations/Company.schema'
import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
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
import { useRouter } from 'next/navigation'
import { ICompanyList } from '../Company.interface'
const mdParser = new MarkdownIt()
interface urlImage {
  image_url_cloud: string
  image_url_local: string
  image_url_custom: string
}
export function FormAddCompany({ inforCompany, id }: any) {
  const router = useRouter()
  const [file_avatar, setFile_avatar] = useState<File | null>(null)
  const inputRef_avatar = useRef<HTMLInputElement | null>(null)
  const [file_baner, setFile_baner] = useState<File | null>(null)
  const inputRef_baner = useRef<HTMLInputElement | null>(null)
  const previousFileAvatarRef = useRef<Blob | null>(null)
  const previousFileBannerRef = useRef<Blob | null>(null)
  const [loading, setLoading] = useState(false)
  const [loading_upload_a, setLoading_upload_a] = useState(false)
  const [loading_upload_b, setLoading_upload_b] = useState(false)
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

  const { reset, watch, control } = form

  useEffect(() => {
    if (inforCompany) {
      setAvatar(inforCompany.company_avatar)
      setBanner(inforCompany.company_banner)
      reset({
        company_email: inforCompany.company_email || '',
        company_phone: inforCompany.company_phone || '',
        company_password: inforCompany?.company_password ? 'nopassword' : '',
        company_name: inforCompany.company_name || '',
        company_avatar: inforCompany.company_avatar?.image_url_cloud || '',
        company_banner: inforCompany.company_banner?.image_url_cloud || '',
        company_description: inforCompany.company_description?.text || '',
        company_website: inforCompany.company_website || '',
        company_employee_total: inforCompany.company_employee_total || '',
        company_code_fiscal: inforCompany?.company_code_fiscal || '',
        company_business_field: inforCompany.company_business_field || '',
        company_address: inforCompany?.company_address?.map((item: any) => ({ value: item })) || [{ value: '' }],
        company_recruitment_status: inforCompany?.company_recruitment_status || ''
      })
    }
  }, [inforCompany, reset])
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'company_address'
  })
  let image_avatar = form.watch('company_avatar')
  let image_baner = form.watch('company_banner')

  const uploadImage = async (formData: FormData, type: string) => {
    type === 'avatar' ? setLoading_upload_a(true) : setLoading_upload_b(true)
    try {
      const { sign, stime, version, nonce } = genSignEndPoint()
      const res = await (
        await fetch(`${process.env.NEXT_PUBLIC_HOST_FRONTEND}/api/admin/companies/upload`, {
          method: 'POST',
          headers: {
            folder_type: type === 'avatar' ? 'images/companies/avatars' : 'images/companies/banners',
            sign,
            stime,
            version,
            nonce
          },
          body: formData
        })
      ).json()

      if (res.statusCode === 201) {
        type === 'avatar' ? setLoading_upload_a(false) : setLoading_upload_b(false)

        toast('Tải ảnh lên thành công', {
          action: {
            label: 'Tắt',
            onClick: () => null
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
      }
      if (res.statusCode === 422) {
        type === 'avatar' ? setLoading_upload_a(false) : setLoading_upload_b(false)

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
        type === 'avatar' ? setLoading_upload_a(false) : setLoading_upload_b(false)

        toast.error('Lỗi khi tải ảnh lên')
      }
    } catch (error) {
      type === 'avatar' ? setLoading_upload_a(false) : setLoading_upload_b(false)

      console.error('Error:', error)
    }
  }

  useEffect(() => {
    const uploadAvatar = async () => {
      const formData_avatar = new FormData()
      formData_avatar.append('file', file_avatar as Blob)
      try {
        await uploadImage(formData_avatar, 'avatar')
      } catch (error) {
        console.error('Failed to upload image:', error)
      }
    }
    const uploadBanner = async () => {
      const formData_banner = new FormData()
      formData_banner.append('file', file_baner as Blob)
      try {
        await uploadImage(formData_banner, 'banner')
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
    if (!avatar.image_url_cloud || !avatar.image_url_cloud || !avatar.image_url_custom) {
      toast('Vui lòng chọn avatar')
      return
    }
    if (!banner.image_url_cloud || !banner.image_url_cloud || !banner.image_url_custom) {
      toast('Vui lòng chọn banner')
      return
    }
    if (loading_upload_b || loading_upload_a) {
      toast('Vui lòng đợi tải ảnh lên thành công')
      return
    }
    const htmlDescription = mdParser.render(values.company_description)
    const payload = {
      ...values,
      company_description: {
        text: values.company_description,
        html: htmlDescription
      },
      company_avatar: avatar,
      company_banner: banner
    }
    try {
      const company_address_map = payload.company_address.map((item: any) => item.value)
      payload.company_address = company_address_map
      const { sign, stime, version, nonce } = genSignEndPoint()

      if (id === 'add') {
        const res = await (
          await fetch(`${process.env.NEXT_PUBLIC_HOST_FRONTEND}/api/admin/companies`, {
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
          setLoading(false)
          toast('Thêm công ty thành công', {
            action: {
              label: 'Tắt',
              onClick: () => null
            }
          })
          router.push('/dashboard/admin/company')
          router.refresh()
        }
        if (res.statusCode === 400) {
          setLoading(false)
          res.message.map((item: string) => {
            toast.error(item)
          })
        }
        if (res.statusCode === 409) {
          setLoading(false)
          toast.error(res.message)
        }
      } else {
        const res = await (
          await fetch(`${process.env.NEXT_PUBLIC_HOST_FRONTEND}/api/admin/companies/${id}`, {
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
          setLoading(false)
          toast('Cập nhật công ty thành công', {
            action: {
              label: 'Tắt',
              onClick: () => null
            }
          })
          router.push('/admin/company')
          router.refresh()
        }
        if (res.statusCode === 400) {
          setLoading(false)
          res.message.map((item: string) => {
            toast.error(item)
          })
        }
        if (res.statusCode === 409) {
          setLoading(false)
          toast.error(res.message)
        }
      }
    } catch (error: any) {
      setLoading(false)
      toast.error('Đã có lỗi xảy ra vui lòng thử lại')
    }
  }
  return (
    <ScrollArea>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (error) => {
            console.log(error) //check loi form khi submit
          })}
          className='space-y-2  flex-shrink-0 w-full  p-2'
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
                        disabled={loading_upload_a ? true : false}
                        type='file'
                        accept='image/*'
                        ref={inputRef_avatar}
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            setFile_avatar(file)
                            field.onChange('http://localhost:3000/' + file?.name) //set thuoc tinh image
                            // field.onChange(URL.createObjectURL(file))
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {(file_avatar || image_avatar) && (
                <div>
                  <Image
                    src={file_avatar ? URL.createObjectURL(file_avatar) : image_avatar}
                    alt='preview'
                    className='w-32 h-32 object-cover rounded-full'
                    width={128}
                    height={128}
                  />
                  {!loading_upload_a && (
                    <Button
                      type='button'
                      variant={'destructive'}
                      size={'sm'}
                      onClick={() => {
                        setFile_avatar(null)
                        form.setValue('company_avatar', '')
                        if (inputRef_avatar.current) {
                          setAvatar({
                            image_url_cloud: '',
                            image_url_local: '',
                            image_url_custom: ''
                          })
                          inputRef_avatar.current.value = ''
                        }
                      }}
                    >
                      Xóa hình ảnh
                    </Button>
                  )}
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
                        disabled={loading_upload_b ? true : false}
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
              {(file_baner || image_baner) && (
                <div>
                  <Image
                    src={file_baner ? URL.createObjectURL(file_baner) : image_baner!} //! noi cho nextjs  biet khong the undefine duoc
                    alt='preview'
                    className='w-56 h-32 object-cover'
                    width={244}
                    height={128}
                  />
                  {!loading_upload_b && (
                    <Button
                      type='button'
                      variant={'destructive'}
                      size={'sm'}
                      onClick={() => {
                        setFile_baner(null)
                        form.setValue('company_banner', '')
                        if (inputRef_baner.current) {
                          setBanner({
                            image_url_cloud: '',
                            image_url_local: '',
                            image_url_custom: ''
                          })
                          inputRef_baner.current.value = ''
                        }
                      }}
                    >
                      Xóa hình ảnh
                    </Button>
                  )}
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
                    <Input placeholder='Email...' type='email' {...field} disabled={id !== 'add'} />
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
                    <Input placeholder='Mật khẩu...' type='password' {...field} disabled={id !== 'add'} />
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
                      <RadioGroup onValueChange={field.onChange} value={field.value} className='flex  space-y-1'>
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
              <div key={index} className='flex'>
                <FormField
                  control={form.control}
                  name={`company_address.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Địa chỉ công ty {index + 1} </FormLabel>
                      <FormControl>
                        <Input placeholder='Địa chỉ công ty...' type='text' {...field} className='w-[870px]' />
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
                  <Controller
                    name='company_description'
                    control={control}
                    render={({ field: { onChange, onBlur, value, name } }) => (
                      <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={({ html, text }) => onChange(text)}
                        value={value}
                      />
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' className='!mt-8 w-full' variant='topcv'>
            {id === 'add' ? 'Thêm' : 'Cập nhật'}
          </Button>
        </form>
      </Form>
      <Separator />
    </ScrollArea>
  )
}
