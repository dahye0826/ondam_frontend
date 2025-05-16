"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, ExternalLink } from "lucide-react"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import type { InformationContent, ContentType } from "@/types"

interface ContentTableProps {
  contents: InformationContent[]
  onEdit: (content: InformationContent) => void
  onDelete: (id: string) => void
  contentType: ContentType
}

export default function ContentTable({ contents, onEdit, onDelete, contentType }: ContentTableProps) {
  const [sortField, setSortField] = useState<"title" | "createdAt">("createdAt")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const handleSort = (field: "title" | "createdAt") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const sortedContents = [...contents].sort((a, b) => {
    if (sortField === "title") {
      return sortDirection === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    } else {
      return sortDirection === "asc"
        ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
  })

  if (contents.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-[#8692A6]">등록된 콘텐츠가 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">No.</TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("title")}>
              제목 {sortField === "title" && (sortDirection === "asc" ? "↑" : "↓")}
            </TableHead>
            <TableHead>썸네일</TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("createdAt")}>
              등록일 {sortField === "createdAt" && (sortDirection === "asc" ? "↑" : "↓")}
            </TableHead>
            {contentType === "recoveryContent" && <TableHead>유튜브 링크</TableHead>}
            {contentType === "infoCard" && <TableHead>PDF</TableHead>}
            <TableHead className="text-right">관리</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedContents.map((content, index) => (
            <TableRow key={content.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{content.title}</TableCell>
              <TableCell>
                <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden">
                  <img
                    src={content.thumbnail || "/placeholder.svg"}
                    alt={content.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </TableCell>
              <TableCell>{format(new Date(content.createdAt), "yyyy년 MM월 dd일", { locale: ko })}</TableCell>
              {contentType === "recoveryContent" && (
                <TableCell>
                  {content.url ? (
                    <a
                      href={content.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#2C73EB] hover:underline flex items-center"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      보기
                    </a>
                  ) : (
                    "-"
                  )}
                </TableCell>
              )}
              {contentType === "infoCard" && (
                <TableCell>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    <ExternalLink className="h-4 w-4" />
                    <span className="sr-only">PDF 보기</span>
                  </Button>
                </TableCell>
              )}
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEdit(content)}>
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">수정</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => onDelete(content.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">삭제</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
