import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, ClipboardCheck, BookOpen, Building2 } from "lucide-react"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="py-12 text-center">
        <h1 className="text-4xl font-bold text-[#2C73EB] mb-4">온담 (ON:DAM)</h1>
        <p className="text-xl text-[#8692A6] mb-8">당신의 마음 건강을 위한 온라인 플랫폼</p>
        <div className="flex justify-center gap-4">
          <Button asChild className="bg-[#2C73EB] hover:bg-[#2361c7]">
            <Link href="/login">시작하기</Link>
          </Button>
          <Button asChild variant="outline" className="border-[#2C73EB] text-[#2C73EB] hover:bg-[#2C73EB]/10">
            <Link href="/about">자세히 알아보기</Link>
          </Button>
        </div>
      </section>

      <section className="py-12">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-center text-[#2C73EB] mb-2">온담의 주요 기능</h2>
          <p className="text-[#8692A6]">감정 관리와 심리 건강을 위한 다양한 기능을 제공합니다.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-[#2C73EB]/10 rounded-full flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6 text-[#2C73EB]" />
            </div>
            <h3 className="text-lg font-semibold mb-3 text-gray-900">감정일기</h3>
            <p className="text-[#8692A6] text-sm mb-6 flex-grow">
              감정을 선택하고 일기를 작성해 자신의 감정과 생각을 기록하고 관리할 수 있습니다.
            </p>
            <Button asChild variant="outline" className="w-full border-[#2C73EB] text-[#2C73EB] hover:bg-[#2C73EB]/10">
              <Link href="/emotion-diary">자세히 보기</Link>
            </Button>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-[#2C73EB]/10 rounded-full flex items-center justify-center mb-4">
              <ClipboardCheck className="w-6 h-6 text-[#2C73EB]" />
            </div>
            <h3 className="text-lg font-semibold mb-3 text-gray-900">자가진단</h3>
            <p className="text-[#8692A6] text-sm mb-6 flex-grow">
              PHQ-9, GAD-7 설문을 통해 자신의 심리 상태를 확인하고 결과를 관리할 수 있습니다.
            </p>
            <Button asChild variant="outline" className="w-full border-[#2C73EB] text-[#2C73EB] hover:bg-[#2C73EB]/10">
              <Link href="/self-diagnosis">자세히 보기</Link>
            </Button>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-[#2C73EB]/10 rounded-full flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-[#2C73EB]" />
            </div>
            <h3 className="text-lg font-semibold mb-3 text-gray-900">정보공간</h3>
            <p className="text-[#8692A6] text-sm mb-6 flex-grow">
              WHO, 복지부 등 공식 기관 정보 콘텐츠와 회복기사를 함께 볼 수 있습니다.
            </p>
            <Button asChild variant="outline" className="w-full border-[#2C73EB] text-[#2C73EB] hover:bg-[#2C73EB]/10">
              <Link href="/information">자세히 보기</Link>
            </Button>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-[#2C73EB]/10 rounded-full flex items-center justify-center mb-4">
              <Building2 className="w-6 h-6 text-[#2C73EB]" />
            </div>
            <h3 className="text-lg font-semibold mb-3 text-gray-900">상담센터</h3>
            <p className="text-[#8692A6] text-sm mb-6 flex-grow">
              가까운 정신건강복지센터, 지역 센터 등 전국 상담기관과 연락처를 찾아볼 수 있습니다.
            </p>
            <Button asChild variant="outline" className="w-full border-[#2C73EB] text-[#2C73EB] hover:bg-[#2C73EB]/10">
              <Link href="/counseling-centers">자세히 보기</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 bg-[#F9FAFC] -mx-4 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-center text-[#2C73EB] mb-8">온담이 도와드립니다</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-[#2C73EB]">마음 건강의 중요성</h3>
              <p className="text-[#8692A6] mb-4">
                정신 건강은 우리 삶의 질을 결정하는 중요한 요소입니다. 온담은 당신의 마음 건강을 관리하는데 도움을
                드립니다.
              </p>
              <ul className="list-disc list-inside text-[#8692A6] space-y-2">
                <li>일상 속 감정 관리</li>
                <li>스트레스 해소 방법</li>
                <li>전문가 연결 서비스</li>
              </ul>
            </div>
            <div className="bg-[#2C73EB]/10 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-[#2C73EB]">온담의 약속</h3>
              <p className="text-[#8692A6] mb-4">
                온담은 사용자의 개인정보 보호와 안전한 서비스 제공을 최우선으로 합니다. 모든 데이터는 암호화되어
                안전하게 보관됩니다.
              </p>
              <Button asChild size="sm" className="bg-[#2C73EB] hover:bg-[#2361c7]">
                <Link href="/register">지금 가입하기</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
