"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function TermsPage() {
  const router = useRouter()

  return (
    <div className="container max-w-3xl py-12 mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-[#2C73EB]">이용약관</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="prose max-w-none">
            <h3 className="text-lg font-semibold">제1조 (목적)</h3>
            <p className="text-[#8692A6]">
              본 약관은 온담(이하 "회사")이 제공하는 서비스의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
            </p>

            <h3 className="text-lg font-semibold mt-6">제2조 (정의)</h3>
            <p className="text-[#8692A6]">
              1. "서비스"란 회사가 제공하는 모든 서비스를 의미합니다.<br />
              2. "회원"이란 회사와 서비스 이용계약을 체결한 자를 말합니다.
            </p>

            <h3 className="text-lg font-semibold mt-6">제3조 (서비스의 제공)</h3>
            <p className="text-[#8692A6]">
              회사는 다음과 같은 서비스를 제공합니다:<br />
              1. 감정일기 서비스<br />
              2. 자가진단 서비스<br />
              3. 상담센터 정보 제공 서비스<br />
              4. 기타 회사가 정하는 서비스
            </p>

            <h3 className="text-lg font-semibold mt-6">제4조 (개인정보보호)</h3>
            <p className="text-[#8692A6]">
              회사는 관련법령이 정하는 바에 따라 회원의 개인정보를 보호하기 위해 노력합니다. 개인정보의 보호 및 사용에 대해서는 관련법 및 회사의 개인정보처리방침이 적용됩니다.
            </p>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={() => router.back()}
              className="bg-[#2C73EB] hover:bg-[#2361c7]"
            >
              돌아가기
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 