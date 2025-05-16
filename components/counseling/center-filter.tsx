"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CenterFilterProps {
  onSearch: (keyword: string) => void
  onFilterType: (type: string) => void
  onFilterRegion: (region: string) => void
  types: string[]
  regions: string[]
}

export default function CenterFilter({ onSearch, onFilterType, onFilterRegion, types, regions }: CenterFilterProps) {
  const [searchKeyword, setSearchKeyword] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchKeyword)
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          type="text"
          placeholder="상담센터 검색"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" className="bg-[#2C73EB] hover:bg-[#2361c7]">
          <Search className="h-4 w-4 mr-2" />
          검색
        </Button>
      </form>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-1/2">
          <Select onValueChange={onFilterType} defaultValue="all">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="센터 유형" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">모든 유형</SelectItem>
              {types.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full sm:w-1/2">
          <Select onValueChange={onFilterRegion} defaultValue="all">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="지역" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">모든 지역</SelectItem>
              {regions.map((region) => (
                <SelectItem key={region} value={region}>
                  {region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
