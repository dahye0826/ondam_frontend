import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-[#F9FAFC] border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-[#2C73EB] mb-4">온담 (ON:DAM)</h3>
            <p className="text-sm text-[#8692A6]">당신의 마음 건강을 위한 온라인 플랫폼</p>
          </div>
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-4">서비스</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/emotion-diary" className="text-[#8692A6] hover:text-[#2C73EB]">
                  감정일기
                </Link>
              </li>
              <li>
                <Link href="/self-diagnosis" className="text-[#8692A6] hover:text-[#2C73EB]">
                  자가진단
                </Link>
              </li>
              <li>
                <Link href="/counseling-centers" className="text-[#8692A6] hover:text-[#2C73EB]">
                  상담센터
                </Link>
              </li>
              <li>
                <Link href="/information" className="text-[#8692A6] hover:text-[#2C73EB]">
                  정보공간
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-4">회사</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-[#8692A6] hover:text-[#2C73EB]">
                  소개
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-[#8692A6] hover:text-[#2C73EB]">
                  팀
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#8692A6] hover:text-[#2C73EB]">
                  연락처
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-4">법적 정보</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" className="text-[#8692A6] hover:text-[#2C73EB]">
                  이용약관
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-[#8692A6] hover:text-[#2C73EB]">
                  개인정보처리방침
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-[#8692A6]">
          <p>&copy; {new Date().getFullYear()} 온담 (ON:DAM). All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
