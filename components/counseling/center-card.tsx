import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import type { CounselingCenter } from "@/types"

interface CenterCardProps {
  center: CounselingCenter
}

export default function CenterCard({ center }: CenterCardProps) {
  // 센터 유형별 색상 설정
  const getTypeStyles = (type: string) => {
    switch (type) {
      case "광역정신건강복지센터":
        return { bg: "bg-blue-100", text: "text-blue-700" }
      case "기초정신건강복지센터":
        return { bg: "bg-green-100", text: "text-green-700" }
      case "자살예방센터":
        return { bg: "bg-purple-100", text: "text-purple-700" }
      case "중독관리통합지원센터":
        return { bg: "bg-orange-100", text: "text-orange-700" }
      case "의원":
        return { bg: "bg-teal-100", text: "text-teal-700" }
      default:
        return { bg: "bg-gray-100", text: "text-gray-700" }
    }
  }

  const typeStyles = getTypeStyles(center.type)

  return (
    <Card className="border-gray-200 hover:border-gray-300 transition-colors">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold text-gray-900 min-h-[3.5rem]">{center.name}</CardTitle>
          <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ml-2 ${typeStyles.bg} ${typeStyles.text}`}>
            {center.type}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-[#8692A6] mb-1">주소</p>
          <p className="text-sm text-gray-900">{center.address}</p>
        </div>
        <div>
          <p className="text-sm text-[#8692A6] mb-1">지역</p>
          <p className="text-sm text-gray-900">{center.region}</p>
        </div>
        {center.website && (
          <Button asChild variant="outline" className="w-full border-[#2C73EB] text-[#2C73EB] hover:bg-[#2C73EB]/10">
            <a href={center.website} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              웹사이트 방문
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
