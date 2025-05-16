import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <header className="border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-[#2C73EB]">
            온담
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/emotion-diary" className="text-[#8692A6] hover:text-[#2C73EB]">
              감정일기
            </Link>
            <Link href="/self-diagnosis" className="text-[#8692A6] hover:text-[#2C73EB]">
              자가진단
            </Link>
            <Link href="/counseling-centers" className="text-[#8692A6] hover:text-[#2C73EB]">
              상담센터
            </Link>
            <Link href="/information" className="text-[#8692A6] hover:text-[#2C73EB]">
              정보공간
            </Link>
          </nav>
          <div className="flex space-x-2">
            <Button asChild variant="outline" className="border-[#8692A6] text-[#8692A6] hover:bg-gray-100">
              <Link href="/login">로그인</Link>
            </Button>
            <Button asChild className="bg-[#2C73EB] hover:bg-[#2361c7]">
              <Link href="/register">회원가입</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
