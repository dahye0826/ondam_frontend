"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { signupUser } from "@/lib/api/auth"

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // 비밀번호 확인
    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.")
      setIsLoading(false)
      return
    }

    // 약관 동의 확인
    if (!agreeTerms) {
      alert("이용약관에 동의해주세요.")
      setIsLoading(false)
      return
    }

    try {
      await signupUser({ name, email, password, passwordConfirm }) // ✅ API 호출
      alert("회원가입 성공! 로그인 페이지로 이동합니다.")
      router.push("/login")
    } catch (error: any) {
      alert(error?.response?.data?.message || "회원가입에 실패했습니다.")
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <div className="container max-w-md py-12 mx-auto">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-[#2C73EB]">회원가입</CardTitle>
          <CardDescription className="text-center text-[#8692A6]">
            온담 서비스를 이용하기 위해 회원가입해주세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">이름</Label>
              <Input
                id="name"
                type="text"
                placeholder="홍길동"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="passwordConfirm">비밀번호 확인</Label>
              <Input
                id="passwordConfirm"
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" checked={agreeTerms} onCheckedChange={(checked) => setAgreeTerms(!!checked)} />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#8692A6]"
              >
                <span>
                  <button
                    type="button"
                    onClick={() => router.push("/terms")}
                    className="text-[#2C73EB] hover:underline"
                  >
                    이용약관
                  </button>
                  에 동의합니다
                </span>
              </label>
            </div>
            <Button type="submit" className="w-full bg-[#2C73EB] hover:bg-[#2361c7]" disabled={isLoading}>
              {isLoading ? "가입 중..." : "가입하기"}
            </Button>
          </form>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-[#8692A6]">또는</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full border-gray-300 flex items-center justify-center gap-2"
            onClick={() => {
              // 실제 구현에서는 여기에 구글 회원가입 로직이 들어갑니다
              console.log("구글 회원가입 시도")
            }}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
              <g transform="matrix(1, 0, 0, 1, 0, 0)">
                <path
                  d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1Z"
                  fill="#4285F4"
                ></path>
              </g>
            </svg>
            구글 회원가입
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-center text-sm text-[#8692A6] mt-2">
            이미 계정이 있으신가요?{" "}
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="text-[#2C73EB] hover:underline"
            >
              로그인
            </button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
