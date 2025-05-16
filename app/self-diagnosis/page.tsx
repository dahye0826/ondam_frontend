"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { diagnosisService, userService } from "@/lib/mock-service"
import type { DiagnosisType } from "@/types"

export default function SelfDiagnosisPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<DiagnosisType>("PHQ-9")
  const [answers, setAnswers] = useState<number[]>([])
  const [questions, setQuestions] = useState<{ id: number; text: string }[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState<"intro" | "questions" | "result">("intro")
  const [result, setResult] = useState<{ score: number; message: string } | null>(null)

  // 진단 시작
  const startDiagnosis = async (type: DiagnosisType) => {
    setIsLoading(true)
    try {
      const questions = await diagnosisService.getQuestions(type)
      setQuestions(questions)
      setAnswers(new Array(questions.length).fill(-1))
      setActiveTab(type)
      setStep("questions")
    } catch (error) {
      console.error("진단 문항을 불러오는 중 오류가 발생했습니다:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // 답변 업데이트
  const updateAnswer = (questionIndex: number, value: number) => {
    const newAnswers = [...answers]
    newAnswers[questionIndex] = value
    setAnswers(newAnswers)
  }

  // 진단 제출
  const submitDiagnosis = async () => {
    // 모든 문항에 답변했는지 확인
    if (answers.some((answer) => answer === -1)) {
      alert("모든 문항에 답변해주세요.")
      return
    }

    setIsLoading(true)
    try {
      const user = await userService.getCurrentUser()
      const score = answers.reduce((sum, answer) => sum + answer, 0)

      // 결과 저장
      await diagnosisService.saveResult(user.id, activeTab, score, answers)

      // 결과 해석
      const interpretation = diagnosisService.interpretResult(activeTab, score)
      setResult({
        score,
        message: interpretation.message,
      })

      setStep("result")
    } catch (error) {
      console.error("진단 결과를 저장하는 중 오류가 발생했습니다:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // 다시 시작
  const restart = () => {
    setStep("intro")
    setResult(null)
    setAnswers([])
  }

  // 점수에 따른 색상 설정
  const getScoreColor = (type: DiagnosisType, score: number) => {
    if (type === "PHQ-9") {
      if (score <= 4) return "text-green-600"
      if (score <= 9) return "text-yellow-600"
      if (score <= 14) return "text-orange-600"
      if (score <= 19) return "text-red-600"
      return "text-red-700"
    } else {
      // GAD-7
      if (score <= 4) return "text-green-600"
      if (score <= 9) return "text-yellow-600"
      if (score <= 14) return "text-orange-600"
      return "text-red-700"
    }
  }

  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-[#2C73EB] mb-8">자가진단</h1>

      {step === "intro" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>PHQ-9 (우울증 선별도구)</CardTitle>
              <CardDescription>지난 2주일 동안 얼마나 자주 다음과 같은 문제들로 곤란을 겪으셨습니까?</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-[#8692A6]">
                PHQ-9는 우울증을 선별하고 그 심각도를 모니터링하기 위한 9개 문항의 자가보고식 설문지입니다.
              </p>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => startDiagnosis("PHQ-9")}
                className="w-full bg-[#2C73EB] hover:bg-[#2361c7]"
                disabled={isLoading}
              >
                PHQ-9 진단 시작
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>GAD-7 (불안장애 선별도구)</CardTitle>
              <CardDescription>지난 2주일 동안 얼마나 자주 다음과 같은 문제들로 곤란을 겪으셨습니까?</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-[#8692A6]">
                GAD-7은 범불안장애를 선별하고 그 심각도를 평가하기 위한 7개 문항의 자가보고식 설문지입니다.
              </p>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => startDiagnosis("GAD-7")}
                className="w-full bg-[#2C73EB] hover:bg-[#2361c7]"
                disabled={isLoading}
              >
                GAD-7 진단 시작
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {step === "questions" && (
        <Card>
          <CardHeader>
            <CardTitle>{activeTab === "PHQ-9" ? "PHQ-9 (우울증 선별도구)" : "GAD-7 (불안장애 선별도구)"}</CardTitle>
            <CardDescription>지난 2주일 동안 얼마나 자주 다음과 같은 문제들로 곤란을 겪으셨습니까?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {questions.map((question, index) => (
              <div key={question.id} className="space-y-3">
                <div className="font-medium">
                  {index + 1}. {question.text}
                </div>
                <RadioGroup
                  value={answers[index]?.toString() || ""}
                  onValueChange={(value) => updateAnswer(index, Number.parseInt(value))}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="0" id={`q${index}-0`} />
                      <Label htmlFor={`q${index}-0`}>전혀 없음</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1" id={`q${index}-1`} />
                      <Label htmlFor={`q${index}-1`}>며칠 동안</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2" id={`q${index}-2`} />
                      <Label htmlFor={`q${index}-2`}>일주일 이상</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="3" id={`q${index}-3`} />
                      <Label htmlFor={`q${index}-3`}>거의 매일</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={restart} disabled={isLoading}>
              취소
            </Button>
            <Button
              onClick={submitDiagnosis}
              className="bg-[#2C73EB] hover:bg-[#2361c7]"
              disabled={isLoading || answers.some((answer) => answer === -1)}
            >
              {isLoading ? "제출 중..." : "제출하기"}
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === "result" && result && (
        <Card>
          <CardHeader>
            <CardTitle>진단 결과</CardTitle>
            <CardDescription>
              {activeTab === "PHQ-9" ? "PHQ-9 (우울증 선별도구)" : "GAD-7 (불안장애 선별도구)"} 결과입니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className={`text-4xl font-bold mb-2 ${getScoreColor(activeTab, result.score)}`}>
                {result.score}점
              </div>
              <p className="text-[#8692A6] mb-4">{result.message}</p>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
              <div
                className={`h-2.5 rounded-full ${
                  activeTab === "PHQ-9"
                    ? "bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"
                    : "bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"
                }`}
                style={{
                  width: `${activeTab === "PHQ-9" ? (result.score / 27) * 100 : (result.score / 21) * 100}%`,
                }}
              ></div>
            </div>

            <div className="bg-[#2C73EB]/10 p-4 rounded-lg">
              <p className="text-[#2C73EB] font-medium mb-2">참고사항</p>
              <p className="text-[#8692A6] text-sm">
                이 자가진단 결과는 참고용으로만 활용하시기 바랍니다. 정확한 진단과 치료를 위해서는 전문가와 상담하시는
                것을 권장합니다.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={restart}>
              다시 진단하기
            </Button>
            <Button onClick={() => router.push("/mypage")} className="bg-[#2C73EB] hover:bg-[#2361c7]">
              마이페이지에서 결과 보기
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
