import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-950 flex flex-col justify-center items-center text-white px-4">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-emerald-400 mb-4 animate-pulse">404</h1>
        <h2 className="text-2xl font-bold mb-6 text-slate-100">Không tìm thấy trang</h2>
        <p className="text-slate-400 max-w-md mx-auto mb-8 font-light text-sm">
          Đường dẫn bạn truy cập không tồn tại hoặc đã bị thay đổi.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold rounded-lg transition-all duration-200"
        >
          Quay lại Trang chủ
        </Link>
      </div>
    </main>
  )
}
