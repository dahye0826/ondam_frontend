import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { InformationContent } from "@/types"
import { ExternalLink } from "lucide-react"

interface ContentModalProps {
  content: InformationContent
  isOpen: boolean
  onClose: () => void
}

export default function ContentModal({ content, isOpen, onClose }: ContentModalProps) {
  // 콘텐츠 유형별 색상 설정
  const getTypeStyles = (type: string) => {
    switch (type) {
      case "infoCard":
        return {
          badge: "bg-teal-100 text-teal-700",
          button: "border-teal-600 text-teal-600 hover:bg-teal-50",
          label: "정보카드",
        }
      case "recoveryContent":
        return {
          badge: "bg-indigo-100 text-indigo-700",
          button: "border-indigo-600 text-indigo-600 hover:bg-indigo-50",
          label: "회복 콘텐츠",
        }
      default:
        return {
          badge: "bg-[#2C73EB]/10 text-[#2C73EB]",
          button: "border-[#2C73EB] text-[#2C73EB] hover:bg-[#2C73EB]/10",
          label: "기타",
        }
    }
  }

  const typeStyles = getTypeStyles(content.type)

  const renderContent = () => {
    switch (content.type) {
      case "recoveryContent":
        return (
          <div className="mb-4">
            <div className="aspect-video w-full bg-gray-100 flex items-center justify-center max-h-[300px] overflow-hidden">
              <p className="text-[#8692A6]">
                {/* 실제로는 여기에 유튜브 임베드 코드가 들어갑니다 */}
                유튜브 영상이 표시됩니다
              </p>
            </div>
            {content.url && (
              <div className="mt-4">
                <Button asChild variant="outline" className={`w-full ${typeStyles.button}`}>
                  <a href={content.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    유튜브에서 보기
                  </a>
                </Button>
              </div>
            )}
          </div>
        )
      case "infoCard":
        return (
          <div className="mb-4">
            <img
              src={content.thumbnail || "/placeholder.svg"}
              alt={content.title}
              className="w-full max-h-[300px] object-contain"
            />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-gray-900">{content.title}</DialogTitle>
          <DialogDescription>
            <span className={`text-xs px-2 py-1 rounded-full ${typeStyles.badge}`}>{typeStyles.label}</span>
          </DialogDescription>
        </DialogHeader>

        {renderContent()}

        <div className="text-[#8692A6] whitespace-pre-line">{content.content}</div>
      </DialogContent>
    </Dialog>
  )
}
