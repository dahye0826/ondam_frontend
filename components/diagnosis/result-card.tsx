import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { DiagnosisResult } from "@/types"

interface ResultCardProps {
  result: DiagnosisResult
}

export default function ResultCard({ result }: ResultCardProps) {
  const formattedDate = format(new Date(result.createdAt), "yyyy년 MM월 dd일", { locale: ko })

  // 점수에 따른 색상 설정
  const getScoreColor = (type: string, score: number) => {
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

  const scoreColor = getScoreColor(result.type, result.score)

  return (
    <Card className="border-gray-200 hover:border-gray-300 transition-colors">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <h3 className="font-medium text-gray-900">{result.type}</h3>
          <p className="text-sm text-[#8692A6]">{formattedDate}</p>
        </div>
        <div className={`text-xl font-bold ${scoreColor}`}>{result.score}점</div>
      </CardHeader>
      <CardContent>
        <p className="text-[#8692A6] mb-4">{result.message}</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full ${
              result.type === "PHQ-9"
                ? "bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"
                : "bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"
            }`}
            style={{
              width: `${result.type === "PHQ-9" ? (result.score / 27) * 100 : (result.score / 21) * 100}%`,
            }}
          ></div>
        </div>
      </CardContent>
    </Card>
  )
}
