import { z } from 'zod'

export const leadFormSchema = z.object({
  name: z.string().min(2, { message: 'Tên phải từ 2 ký tự trở lên' }),
  email: z.string().email({ message: 'Email không hợp lệ' }),
  phone: z.string().regex(/^[0-9+]{9,15}$/, { message: 'Số điện thoại không hợp lệ' }),
  company: z.string().optional(),
  website: z.string().url({ message: 'Địa chỉ website không hợp lệ' }).or(z.literal('')),
  message: z.string().min(5, { message: 'Tin nhắn/Yêu cầu tối thiểu 5 ký tự' }).optional().or(z.literal('')),
})

export type LeadFormData = z.infer<typeof leadFormSchema>
