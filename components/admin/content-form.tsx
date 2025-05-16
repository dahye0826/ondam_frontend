"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import type { InformationContent, ContentType } from "@/types"

interface ContentFormProps {
  content: InformationContent | null
  contentType: ContentType
  onSave: (content: InformationContent) => void
  onCancel: () => void
}

export default function ContentForm({ content, contentType, onSave, onCancel }: ContentFormProps) {
  const [title, setTitle] = useState("")
  const [thumbnail, setThumbnail] = useState("")
  const [contentText, setContentText] = useState("")
  const [url, setUrl] = useState("")
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    if (content) {
      setTitle(content.title)
      setThumbnail(content.thumbnail)
      setContentText(content.content)
      setUrl(content.url || "")
    }
  }, [content])

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!title.trim()) {
      newErrors.title = "제목을 입력해주세요"
    }

    if (!thumbnail.trim()) {
      newErrors.thumbnail = "썸네일 URL을 입력해주세요"
    }

    if (!contentText.trim()) {
      newErrors.content = "내용을 입력해주세요"
    }

    if (contentType === "recoveryContent" && !url.trim()) {
      newErrors.url = "유튜브 URL을 입력해주세요"
    }

    if (contentType === "infoCard" && !content && !pdfFile) {
      newErrors.pdf = "PDF 파일을 업로드해주세요"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const newContent: InformationContent = {
      id: content?.id || Math.random().toString(36).substring(2, 15),
      title,
      type: contentType,
      thumbnail,
      content: contentText,
      url: contentType === "recoveryContent" ? url : undefined,
      createdAt: content?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    onSave(newContent)
    toast({
      title: content ? "콘텐츠가 수정되었습니다" : "콘텐츠가 추가되었습니다",
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type !== "application/pdf") {
        setErrors({ ...errors, pdf: "PDF 파일만 업로드 가능합니다" })
        return
      }
      setPdfFile(file)
      setErrors({ ...errors, pdf: "" })
    }
  }

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{content ? "콘텐츠 수정" : "새 콘텐츠 추가"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">제목</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="콘텐츠 제목"
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="thumbnail">썸네일 URL</Label>
            <Input
              id="thumbnail"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              placeholder="썸네일 이미지 URL"
              className={errors.thumbnail ? "border-red-500" : ""}
            />
            {errors.thumbnail && <p className="text-red-500 text-sm">{errors.thumbnail}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">내용</Label>
            <Textarea
              id="content"
              value={contentText}
              onChange={(e) => setContentText(e.target.value)}
              placeholder="콘텐츠 내용"
              className={`min-h-[100px] ${errors.content ? "border-red-500" : ""}`}
            />
            {errors.content && <p className="text-red-500 text-sm">{errors.content}</p>}
          </div>

          {contentType === "recoveryContent" && (
            <div className="space-y-2">
              <Label htmlFor="url">유튜브 URL</Label>
              <Input
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="유튜브 영상 URL"
                className={errors.url ? "border-red-500" : ""}
              />
              {errors.url && <p className="text-red-500 text-sm">{errors.url}</p>}
            </div>
          )}

          {contentType === "infoCard" && !content && (
            <div className="space-y-2">
              <Label htmlFor="pdf">PDF 파일</Label>
              <Input
                id="pdf"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className={errors.pdf ? "border-red-500" : ""}
              />
              {errors.pdf && <p className="text-red-500 text-sm">{errors.pdf}</p>}
            </div>
          )}

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              취소
            </Button>
            <Button type="submit" className="bg-[#2C73EB] hover:bg-[#2361c7]">
              {content ? "수정하기" : "추가하기"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
