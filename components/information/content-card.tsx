"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import ContentModal from "./content-modal"
import type { InformationContent } from "@/types"

interface ContentCardProps {
  content: InformationContent
}

export default function ContentCard({ content }: ContentCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  // 콘텐츠 유형별 색상 설정
  const getTypeStyles = (type: string) => {
    switch (type) {
      case "infoCard":
        return { bg: "bg-teal-100", text: "text-teal-700", label: "정보카드" }
      case "recoveryContent":
        return { bg: "bg-indigo-100", text: "text-indigo-700", label: "회복 콘텐츠" }
      default:
        return { bg: "bg-gray-100", text: "text-gray-700", label: "기타" }
    }
  }

  const typeStyles = getTypeStyles(content.type)

  return (
    <>
      <Card className="border-gray-200 hover:border-gray-300 transition-colors h-full flex flex-col">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-gray-900 line-clamp-2 min-h-[3.5rem]">{content.title}</h3>
            <span
              className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ml-2 ${typeStyles.bg} ${typeStyles.text}`}
            >
              {typeStyles.label}
            </span>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="aspect-video w-full bg-gray-100 mb-4 overflow-hidden rounded-md">
            <img
              src={content.thumbnail || "/placeholder.svg"}
              alt={content.title}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-[#8692A6] line-clamp-3">{content.content}</p>
        </CardContent>
        <CardFooter>
          <Button onClick={() => setIsModalOpen(true)} className="w-full bg-[#2C73EB] hover:bg-[#2361c7]">
            자세히 보기
          </Button>
        </CardFooter>
      </Card>

      <ContentModal content={content} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
