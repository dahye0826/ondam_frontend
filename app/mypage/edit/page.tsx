"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { userService } from "@/lib/mock-service"
import type { User } from "@/types"

export default function EditProfilePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [isWithdrawing, setIsWithdrawing] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true)
        const userData = await userService.getCurrentUser()
        setUser(userData)
        setFormData({
          name: userData.name,
          email: userData.email,
          password: "",
          confirmPassword: "",
        })
      } catch (error) {
        console.error("사용자 정보를 불러오는 중 오류가 발생했습니다:", error)
        toast({
          title: "오류",
          description: "사용자 정보를 불러올 수 없습니다.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [toast])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // 입력 시 해당 필드의 에러 메시지 초기화
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }))
  }

  const validateForm = () => {
    let isValid = true
    const newErrors = { ...errors }

    if (!formData.name.trim()) {
      newErrors.name = "이름을 입력해주세요."
      isValid = false
    }

    if (!formData.email.trim()) {
      newErrors.email = "이메일을 입력해주세요."
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "유효한 이메일 형식이 아닙니다."
      isValid = false
    }

    if (formData.password) {
      if (formData.password.length < 6) {
        newErrors.password = "비밀번호는 최소 6자 이상이어야 합니다."
        isValid = false
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "비밀번호가 일치하지 않습니다."
        isValid = false
      }
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      setIsLoading(true)

      // 비밀번호가 입력되지 않은 경우 비밀번호 변경 없이 기본 정보만 업데이트
      const updateData = {
        name: formData.name,
        email: formData.email,
        ...(formData.password ? { password: formData.password } : {}),
      }

      // 실제 구현에서는 API 호출로 대체
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // 사용자 정보 업데이트 (실제 구현에서는 API 호출)
      if (user) {
        const updatedUser = {
          ...user,
          name: formData.name,
          email: formData.email,
        }

        // 모의 서비스 업데이트 (실제 구현에서는 API 호출)
        await userService.updateUser(updatedUser)

        toast({
          title: "성공",
          description: "회원정보가 성공적으로 업데이트되었습니다.",
        })

        // 마이페이지로 리다이렉트
        router.push("/mypage")
      }
    } catch (error) {
      console.error("회원정보 업데이트 중 오류가 발생했습니다:", error)
      toast({
        title: "오류",
        description: "회원정보 업데이트에 실패했습니다. 다시 시도해주세요.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleWithdraw = async () => {
    if (!user) return

    try {
      setIsWithdrawing(true)

      // 실제 구현에서는 API 호출로 대체
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // 회원 탈퇴 처리
      await userService.deleteUser(user.id)

      toast({
        title: "탈퇴 완료",
        description: "회원 탈퇴가 완료되었습니다. 그동안 이용해 주셔서 감사합니다.",
      })

      // 홈페이지로 리다이렉트
      router.push("/")
    } catch (error) {
      console.error("회원 탈퇴 중 오류가 발생했습니다:", error)
      toast({
        title: "오류",
        description: "회원 탈퇴에 실패했습니다. 다시 시도해주세요.",
        variant: "destructive",
      })
    } finally {
      setIsWithdrawing(false)
    }
  }

  const handleCancel = () => {
    router.push("/mypage")
  }

  if (isLoading && !user) {
    return (
      <div className="container py-8">
        <h1 className="text-2xl font-bold text-[#2C73EB] mb-8">회원정보 수정</h1>
        <div className="text-center py-10">
          <p className="text-[#8692A6]">데이터를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-[#2C73EB] mb-8">회원정보 수정</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-[#2C73EB]">개인정보 수정</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">이름</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="이름을 입력하세요"
                  disabled={isLoading}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="이메일을 입력하세요"
                  disabled={isLoading}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <Label htmlFor="password">
                  새 비밀번호 <span className="text-sm text-[#8692A6]">(변경하지 않으려면 비워두세요)</span>
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="새 비밀번호를 입력하세요"
                  disabled={isLoading}
                />
                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">비밀번호 확인</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="비밀번호를 다시 입력하세요"
                  disabled={isLoading}
                />
                {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <Button type="button" variant="outline" onClick={handleCancel} disabled={isLoading}>
                취소
              </Button>
              <Button type="submit" className="bg-[#2C73EB] hover:bg-[#2361c7]" disabled={isLoading}>
                {isLoading ? "저장 중..." : "저장하기"}
              </Button>
            </div>
          </form>

          <Separator className="my-8" />

          <div className="mt-6">
            <h3 className="text-lg font-medium text-red-600 mb-4">회원 탈퇴</h3>
            <p className="text-sm text-[#8692A6] mb-4">
              회원 탈퇴 시 모든 개인정보와 작성한 콘텐츠가 삭제되며, 이 작업은 되돌릴 수 없습니다.
            </p>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" disabled={isWithdrawing}>
                  {isWithdrawing ? "처리 중..." : "회원 탈퇴"}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>정말 탈퇴하시겠습니까?</AlertDialogTitle>
                  <AlertDialogDescription>
                    회원 탈퇴 시 모든 개인정보와 작성한 콘텐츠가 영구적으로 삭제됩니다. 이 작업은 되돌릴 수 없습니다.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>취소</AlertDialogCancel>
                  <AlertDialogAction onClick={handleWithdraw} className="bg-red-600 hover:bg-red-700">
                    탈퇴하기
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
