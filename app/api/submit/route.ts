import { NextRequest, NextResponse } from 'next/server'
import { leadFormSchema } from '@/lib/validations'
import { FormSubmitResponse } from '@/types/form'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Validate body
    const validation = leadFormSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json<FormSubmitResponse>({
        success: false,
        message: 'Dữ liệu không hợp lệ. Vui lòng kiểm tra lại các trường thông tin.',
      }, { status: 400 })
    }

    const { name, email, phone, company, website, message } = validation.data
    const campaignName = body.campaignName || 'unknown'

    const webhookUrl = process.env.FORM_SUBMIT_WEBHOOK_URL
    const webhookSecret = process.env.FORM_SUBMIT_SECRET

    if (webhookUrl) {
      // Forward to external webhook
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': webhookSecret ? `Bearer ${webhookSecret}` : '',
        },
        body: JSON.stringify({
          campaignName,
          name,
          email,
          phone,
          company,
          website,
          message,
          timestamp: new Date().toISOString(),
        }),
      })

      if (!res.ok) {
        throw new Error('Gửi thông tin webhook thất bại.')
      }
    }

    // Success response
    return NextResponse.json<FormSubmitResponse>({
      success: true,
      message: 'Cảm ơn bạn đã quan tâm! Lượng đã nhận được thông tin đăng ký tư vấn và sẽ liên hệ lại với bạn trong vòng 24 giờ.',
      leadId: Math.random().toString(36).substring(2, 9),
    })

  } catch (error: any) {
    console.error('Lỗi API Submit:', error)
    return NextResponse.json<FormSubmitResponse>({
      success: false,
      message: 'Có lỗi xảy ra trên hệ thống. Vui lòng thử lại sau hoặc liên hệ trực tiếp.',
    }, { status: 500 })
  }
}
