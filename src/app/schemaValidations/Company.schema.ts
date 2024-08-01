import { z } from 'zod'
import { metadata } from '../layout'
import { add } from 'date-fns'
import { Value } from '@radix-ui/react-select'

export const CompanyBody = z
  .object({
    company_email: z.string({ message: 'Email phải là dạng chuỗi' }).email({ message: 'Email không hợp lệ' }),
    company_phone: z
      .string({ message: 'Số điện thoại phải là dạng chuỗi số' })
      .min(10, { message: 'Số điện thoại tối thiểu 10 kí tự' }),
    company_password: z
      .string({ message: 'Password có dạng chuỗi' })
      .min(8, { message: 'Password tối thiểu 1o kí tự' })
      .max(100, { message: 'Password tối đa 100 kí tự' }),
    company_name: z
      .string({ message: 'Tên công ty có dạng chuỗi' })
      .min(5, { message: 'Tên công ty tối thiểu 5 kí tự' })
      .max(1000, { message: 'Tên công ty tối đa 1000 kí tự' }),
    company_avatar: z.string({ message: 'Avatar có dạng chuỗi' }),
    company_banner: z.string({ message: 'Banner có dạng chuỗi' }),
    company_description: z
      .string({ message: 'Mô tả công ty có dạng chuỗi' })
      .min(10, { message: 'Mô tả công ty tối thiểu 10 kí tự' })
      .max(10000, { message: 'Mô ta công ty tối đa 10000 kí tự' }),
    company_website: z.string({ message: 'Website có dạng chuỗi' }),
    company_address: z.array(
      z.object({
        value: z
          .string({ message: 'Địa chỉ có dạng chuỗi' })
          .min(5, { message: 'Địa chỉ công ty tối thiểu 5 kí tự' })
          .max(100, { message: 'Địa chỉ công ty tối đa 100 kí tự' })
      })
    ),
    company_code_fiscal: z
      .string({ message: 'Mã số thuế có dạng số' })
      .min(6, { message: 'Mã số thuế có tối thiểu 6 số' })
      .max(10, { message: 'Mã số thuế có tối đa 10 số' })
      .regex(/^\d+$/, { message: 'Mã số thuế có dạng số' }),
    company_business_field: z
      .string({ message: 'Lĩnh vực kinh doanh có dạng chuỗi' })
      .min(5, { message: 'Lĩnh vực kinh doanh có tối thiểu 5 kí tự' })
      .max(100, { message: 'Lĩnh vực kinh doanh có tối đa 100 kí tự' }),
    company_employee_total: z
      .string({ message: 'Tổng số công nhân viên có dạng chuỗi' })
      .min(10, { message: 'Tổng số nhân viên có tối thiểu 10 kí tự' })
      .max(100, { message: 'Tông số nhân viên có tối đa 100 kí tự' }),
    company_recruitment_status: z.string({ message: 'Trạng thái tuyển dụng có dạng chuỗi' })
  })
  .strict()

export const AddCompanyRes = z.object({
  statusCode: z.number(),
  message: z.string(),
  metadata: z.object({
    _id: z.string(),
    createdAt: z.date()
  }),
  tacgia: z.string()
})

export type AddCompanyBodyType = z.TypeOf<typeof CompanyBody>
export type AddCompanyResType = z.TypeOf<typeof AddCompanyRes>
