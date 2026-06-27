declare global {
  interface Window {
    dataLayer?: any[]
  }
}

export function trackCTAClick(ctaLabel: string, location: string) {
  if (typeof window === 'undefined') return

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: 'cta_click',
    cta_label: ctaLabel,
    cta_location: location, // 'hero' | 'pricing' | 'footer'
    page_slug: window.location.pathname,
  })
}

export function trackFormSubmit(formName: string, success: boolean) {
  if (typeof window === 'undefined') return

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: success ? 'form_submit_success' : 'form_submit_error',
    form_name: formName,
    page_slug: window.location.pathname,
  })
}
