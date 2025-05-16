"use client"

import { useState, useEffect } from "react"
import CenterCard from "@/components/counseling/center-card"
import CenterFilter from "@/components/counseling/center-filter"
import { counselingService } from "@/lib/mock-service"
import type { CounselingCenter } from "@/types"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function CounselingCentersPage() {
  const [centers, setCenters] = useState<CounselingCenter[]>([])
  const [filteredCenters, setFilteredCenters] = useState<CounselingCenter[]>([])
  const [types, setTypes] = useState<string[]>([])
  const [regions, setRegions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(6)
  const [totalPages, setTotalPages] = useState(1)
  const [paginatedCenters, setPaginatedCenters] = useState<CounselingCenter[]>([])

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const allCenters = await counselingService.getAllCenters()
        setCenters(allCenters)
        setFilteredCenters(allCenters)

        // 유형과 지역 목록 추출
        const uniqueTypes = Array.from(new Set(allCenters.map((center) => center.type)))
        const uniqueRegions = Array.from(new Set(allCenters.map((center) => center.region)))

        setTypes(uniqueTypes)
        setRegions(uniqueRegions)
      } catch (error) {
        console.error("상담센터 정보를 불러오는 중 오류가 발생했습니다:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCenters()
  }, [])

  // 필터링된 센터가 변경될 때마다 페이지네이션 업데이트
  useEffect(() => {
    const totalPages = Math.ceil(filteredCenters.length / itemsPerPage)
    setTotalPages(totalPages)

    // 현재 페이지가 총 페이지 수보다 크면 첫 페이지로 리셋
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1)
    }

    // 현재 페이지에 해당하는 아이템만 표시
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    setPaginatedCenters(filteredCenters.slice(startIndex, endIndex))
  }, [filteredCenters, currentPage, itemsPerPage])

  const handleSearch = async (keyword: string) => {
    if (!keyword.trim()) {
      setFilteredCenters(centers)
      return
    }

    const results = await counselingService.searchCenters(keyword)
    setFilteredCenters(results)
    setCurrentPage(1) // 검색 시 첫 페이지로 이동
  }

  const handleFilterType = async (type: string) => {
    if (type === "all") {
      setFilteredCenters(centers)
      return
    }

    const results = await counselingService.filterCentersByType(type)
    setFilteredCenters(results)
    setCurrentPage(1) // 필터링 시 첫 페이지로 이동
  }

  const handleFilterRegion = async (region: string) => {
    if (region === "all") {
      setFilteredCenters(centers)
      return
    }

    const results = await counselingService.filterCentersByRegion(region)
    setFilteredCenters(results)
    setCurrentPage(1) // 필터링 시 첫 페이지로 이동
  }

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // 페이지 상단으로 스크롤
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // 페이지네이션 렌더링
  const renderPagination = () => {
    if (totalPages <= 1) return null

    // 표시할 페이지 번호 계산
    let pages = []
    const maxVisiblePages = 5 // 최대 표시할 페이지 번호 개수

    if (totalPages <= maxVisiblePages) {
      // 전체 페이지가 maxVisiblePages 이하면 모든 페이지 표시
      pages = Array.from({ length: totalPages }, (_, i) => i + 1)
    } else {
      // 현재 페이지 주변 페이지와 처음/마지막 페이지 표시
      if (currentPage <= 3) {
        // 현재 페이지가 앞쪽에 있는 경우
        pages = [1, 2, 3, 4, "ellipsis", totalPages]
      } else if (currentPage >= totalPages - 2) {
        // 현재 페이지가 뒤쪽에 있는 경우
        pages = [1, "ellipsis", totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
      } else {
        // 현재 페이지가 중간에 있는 경우
        pages = [1, "ellipsis", currentPage - 1, currentPage, currentPage + 1, "ellipsis", totalPages]
      }
    }

    return (
      <Pagination className="mt-8">
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
            </PaginationItem>
          )}

          {pages.map((page, index) => {
            if (page === "ellipsis") {
              return (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              )
            }

            return (
              <PaginationItem key={page}>
                <PaginationLink isActive={page === currentPage} onClick={() => handlePageChange(page as number)}>
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          })}

          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    )
  }

  return (
    <div className="container py-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-[#2C73EB] mb-8">상담센터 정보</h1>

      <div className="mb-8">
        <CenterFilter
          onSearch={handleSearch}
          onFilterType={handleFilterType}
          onFilterRegion={handleFilterRegion}
          types={types}
          regions={regions}
        />
      </div>

      {isLoading ? (
        <div className="text-center py-10">
          <p className="text-[#8692A6]">상담센터 정보를 불러오는 중...</p>
        </div>
      ) : filteredCenters.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-[#8692A6]">검색 결과가 없습니다.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedCenters.map((center) => (
              <CenterCard key={center.id} center={center} />
            ))}
          </div>

          {renderPagination()}

          <div className="text-center text-sm text-[#8692A6] mt-4">
            총 {filteredCenters.length}개 중 {(currentPage - 1) * itemsPerPage + 1}-
            {Math.min(currentPage * itemsPerPage, filteredCenters.length)}개 표시
          </div>
        </>
      )}
    </div>
  )
}
