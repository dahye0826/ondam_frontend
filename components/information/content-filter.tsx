"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ContentFilterProps {
  onFilterType: (type: string) => void
}

export default function ContentFilter({ onFilterType }: ContentFilterProps) {
  return (
    <div className="w-full sm:w-[250px]">
      <Select onValueChange={onFilterType} defaultValue="all">
        <SelectTrigger className="w-full">
          <SelectValue placeholder="콘텐츠 유형" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">모든 콘텐츠</SelectItem>
          <SelectItem value="infoCard">정보카드</SelectItem>
          <SelectItem value="recoveryContent">회복 콘텐츠</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
