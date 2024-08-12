import { z } from 'zod'

export const JobBody = z.object({
  job_name: z
    .string({ message: 'Tên công việc phải là dạng chuỗi' })
    .nonempty({ message: 'Tên công việc không được để trống' }),
  job_wage: z
    .string({ message: 'Mức lương phải là dạng chuỗi' })
    .nonempty({ message: 'Mức lương không được để trống' }),
  job_address_summary: z
    .string({ message: 'Địa chỉ ngắn gọn phải là dạng chuỗi' })
    .nonempty({ message: 'Địa chỉ không được để trống' }),
  job_exp: z
    .string({ message: 'Yêu cầu kinh nghiệm phải là dạng chuỗi' })
    .nonempty({ message: 'Yêu cầu kinh nghiệm không được để trống' }),
  job_rank: z.string({ message: 'Cấp bậc phải là dạng chuỗi' }).nonempty({ message: 'Cấp bậc không được để trống' }),
  job_quantity: z
    .number({ message: 'Số lượng tuyển phải là dạng số' })
    .min(1, { message: 'Số lượng tuyển phải lớn hơn 0' }),
  job_working_type: z
    .string({ message: 'Hình thức làm việc phải là dạng chuỗi' })
    .nonempty({ message: 'Hình thức làm việc không được để trống' }),
  job_gender: z
    .string({ message: 'Giới tính phải là dạng chuỗi' })
    .nonempty({ message: 'Giới tính không được để trống' }),
  job_isPublished: z.boolean({ message: 'Trạng thái published phải là dạng boolean' }),
  job_isDraft: z.boolean({ message: 'Trạng thái nháp phải là dạng boolean' }),
  job_specific_location: z
    .array(
      z.object({
        value: z
          .string({ message: 'Địa chỉ cụ thể phải là dạng chuỗi' })
          .nonempty({ message: 'Địa chỉ cụ thể không được để trống' })
      })
    )
    .nonempty({ message: 'Phải có ít nhất một địa chỉ cụ thể' })
})

export type JobBodyType = z.TypeOf<typeof JobBody>
