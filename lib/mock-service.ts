// 상담센터 목데이터 추가
export const mockCounselingCenters = [
  {
    id: "center1",
    name: "서울시 정신건강복지센터",
    address: "서울특별시 중구 을지로 39 을지로 플라자 3층",
    type: "광역정신건강복지센터",
    website: "https://blahblah.com",
    phone: "02-1234-5678",
    region: "서울",
  },
  {
    id: "center2",
    name: "강남구 정신건강복지센터",
    address: "서울특별시 강남구 선릉로 114길 서울의료원 강남분원 2층",
    type: "기초정신건강복지센터",
    website: "https://blahblah.com",
    phone: "02-2345-6789",
    region: "서울",
  },
  {
    id: "center3",
    name: "경기도 정신건강복지센터",
    address: "경기도 수원시 장안구 수성로 245",
    type: "광역정신건강복지센터",
    website: "https://blahblah.com",
    phone: "031-234-5678",
    region: "경기",
  },
  {
    id: "center4",
    name: "부산 자살예방센터",
    address: "부산광역시 연제구 중앙대로 1000",
    type: "자살예방센터",
    website: "https://blahblah.com",
    phone: "051-345-6789",
    region: "부산",
  },
  {
    id: "center5",
    name: "대구 중독관리통합지원센터",
    address: "대구광역시 중구 태평로 45",
    type: "중독관리통합지원센터",
    website: "https://blahblah.com",
    phone: "053-456-7890",
    region: "대구",
  },
  {
    id: "center6",
    name: "마음편한 정신건강의원",
    address: "서울특별시 서초구 서초대로 123",
    type: "의원",
    website: "https://blahblah.com",
    phone: "02-987-6543",
    region: "서울",
  },
  {
    id: "center7",
    name: "인천시 정신건강복지센터",
    address: "인천광역시 남동구 정각로 29",
    type: "광역정신건강복지센터",
    website: "https://blahblah.com",
    phone: "032-123-4567",
    region: "인천",
  },
  {
    id: "center8",
    name: "광주 정신건강복지센터",
    address: "광주광역시 동구 제봉로 57",
    type: "광역정신건강복지센터",
    website: "https://blahblah.com",
    phone: "062-234-5678",
    region: "광주",
  },
  {
    id: "center9",
    name: "대전 정신건강복지센터",
    address: "대전광역시 중구 보문로 246",
    type: "광역정신건강복지센터",
    website: "https://blahblah.com",
    phone: "042-345-6789",
    region: "대전",
  },
  {
    id: "center10",
    name: "울산 정신건강복지센터",
    address: "울산광역시 남구 화합로 105",
    type: "광역정신건강복지센터",
    website: "https://blahblah.com",
    phone: "052-456-7890",
    region: "울산",
  },
  {
    id: "center11",
    name: "강원도 정신건강복지센터",
    address: "강원도 춘천시 춘천로 65",
    type: "광역정신건강복지센터",
    website: "https://blahblah.com",
    phone: "033-567-8901",
    region: "강원",
  },
  {
    id: "center12",
    name: "충북 정신건강복지센터",
    address: "충청북도 청주시 상당구 상당로 82",
    type: "광역정신건강복지센터",
    website: "https://blahblah.com",
    phone: "043-678-9012",
    region: "충북",
  },
]

// 정보공간 목데이터 추가
export const mockInformationContents = [
  {
    id: "content1",
    title: "마음 챙김 명상의 효과",
    type: "recoveryContent",
    thumbnail: "/peaceful-meditation.png",
    content: "마음 챙김 명상이 스트레스 감소와 정신 건강에 미치는 긍정적인 영향에 대한 영상입니다.",
    url: "https://www.youtube.com/watch?v=example1",
    createdAt: "2024-05-01T10:00:00Z",
    updatedAt: "2024-05-01T10:00:00Z",
  },
  {
    id: "content2",
    title: "우울증 극복하기",
    type: "infoCard",
    thumbnail: "/placeholder-7z52s.png",
    content: "우울증을 극복하기 위한 다양한 방법과 전문가의 조언을 담은 정보카드입니다.",
    createdAt: "2024-04-25T14:30:00Z",
    updatedAt: "2024-04-25T14:30:00Z",
  },
  {
    id: "content3",
    title: "불안장애 이해하기",
    type: "infoCard",
    thumbnail: "/anxiety-abstract.png",
    content: "불안장애의 원인, 증상, 치료법에 대한 종합적인 정보를 제공합니다.",
    createdAt: "2024-04-20T09:15:00Z",
    updatedAt: "2024-04-20T09:15:00Z",
  },
  {
    id: "content4",
    title: "스트레스 관리 기법",
    type: "recoveryContent",
    thumbnail: "/feeling-stressed.png",
    content: "일상에서 쉽게 실천할 수 있는 스트레스 관리 기법을 소개하는 영상입니다.",
    url: "https://www.youtube.com/watch?v=example2",
    createdAt: "2024-04-15T16:45:00Z",
    updatedAt: "2024-04-15T16:45:00Z",
  },
  {
    id: "content5",
    title: "건강한 수면 습관",
    type: "infoCard",
    thumbnail: "/peaceful-sleep.png",
    content: "건강한 수면을 위한 습관과 환경 조성 방법을 안내하는 인포그래픽입니다.",
    createdAt: "2024-04-10T11:20:00Z",
    updatedAt: "2024-04-10T11:20:00Z",
  },
  {
    id: "content6",
    title: "마음 건강 관리의 중요성",
    type: "infoCard",
    thumbnail: "/mental-health-importance.png",
    content: "정신 건강이 신체 건강과 삶의 질에 미치는 영향에 대한 정보를 제공합니다.",
    createdAt: "2024-04-05T13:10:00Z",
    updatedAt: "2024-04-05T13:10:00Z",
  },
  {
    id: "content7",
    title: "명상과 요가의 효과",
    type: "recoveryContent",
    thumbnail: "/yoga-meditation.png",
    content: "명상과 요가가 스트레스 감소와 정신 건강에 미치는 효과에 대한 영상입니다.",
    url: "https://www.youtube.com/watch?v=example3",
    createdAt: "2024-04-01T09:30:00Z",
    updatedAt: "2024-04-01T09:30:00Z",
  },
  {
    id: "content8",
    title: "직장 내 스트레스 관리",
    type: "infoCard",
    thumbnail: "/workplace-stress.png",
    content: "직장에서 발생하는 스트레스를 효과적으로 관리하는 방법에 대한 정보카드입니다.",
    createdAt: "2024-03-28T14:20:00Z",
    updatedAt: "2024-03-28T14:20:00Z",
  },
  {
    id: "content9",
    title: "우울증의 이해와 치료",
    type: "recoveryContent",
    thumbnail: "/depression-treatment.png",
    content: "우울증의 원인, 증상, 치료법에 대한 전문가의 설명 영상입니다.",
    url: "https://www.youtube.com/watch?v=example4",
    createdAt: "2024-03-25T11:45:00Z",
    updatedAt: "2024-03-25T11:45:00Z",
  },
  {
    id: "content10",
    title: "자존감 향상 방법",
    type: "infoCard",
    thumbnail: "/self-esteem.png",
    content: "건강한 자존감을 키우고 유지하는 방법에 대한 정보카드입니다.",
    createdAt: "2024-03-20T10:15:00Z",
    updatedAt: "2024-03-20T10:15:00Z",
  },
  {
    id: "content11",
    title: "불면증 극복하기",
    type: "recoveryContent",
    thumbnail: "/insomnia-recovery.png",
    content: "불면증을 극복하기 위한 다양한 방법과 수면 개선 팁을 소개하는 영상입니다.",
    url: "https://www.youtube.com/watch?v=example5",
    createdAt: "2024-03-15T16:30:00Z",
    updatedAt: "2024-03-15T16:30:00Z",
  },
  {
    id: "content12",
    title: "사회불안장애 이해하기",
    type: "infoCard",
    thumbnail: "/social-anxiety.png",
    content: "사회불안장애의 원인, 증상, 치료법에 대한 종합적인 정보를 제공합니다.",
    createdAt: "2024-03-10T13:40:00Z",
    updatedAt: "2024-03-10T13:40:00Z",
  },
]

const mockUsers = [
  {
    id: "user1",
    name: "홍길동",
    email: "hong@example.com",
    createdAt: "2024-01-01T00:00:00Z",
    role: "user",
  },
  {
    id: "user2",
    name: "김철수",
    email: "kim@example.com",
    createdAt: "2024-01-15T00:00:00Z",
    role: "user",
  },
  {
    id: "user3",
    name: "이영희",
    email: "lee@example.com",
    createdAt: "2024-02-01T00:00:00Z",
    role: "user",
  },
  {
    id: "admin1",
    name: "관리자",
    email: "admin@example.com",
    createdAt: "2024-01-01T00:00:00Z",
    role: "admin",
  },
]

const mockDiaries = [
  {
    id: "diary1",
    userId: "user1",
    emotion: "happy",
    content: "오늘은 날씨가 좋아서 기분이 좋았다.",
    createdAt: "2024-05-08T10:00:00Z",
    updatedAt: "2024-05-08T10:00:00Z",
  },
  {
    id: "diary2",
    userId: "user1",
    emotion: "sad",
    content: "시험 결과가 좋지 않아 우울했다.",
    createdAt: "2024-05-07T10:00:00Z",
    updatedAt: "2024-05-07T10:00:00Z",
  },
  {
    id: "diary3",
    userId: "user2",
    emotion: "angry",
    content: "오늘 일이 너무 많아서 화가 났다.",
    createdAt: "2024-05-08T11:00:00Z",
    updatedAt: "2024-05-08T11:00:00Z",
  },
  {
    id: "diary4",
    userId: "user2",
    emotion: "anxious",
    content: "내일 발표가 있어서 불안하다.",
    createdAt: "2024-05-07T11:00:00Z",
    updatedAt: "2024-05-07T11:00:00Z",
  },
  {
    id: "diary5",
    userId: "user3",
    emotion: "excited",
    content: "여행 계획을 세워서 신난다.",
    createdAt: "2024-05-08T12:00:00Z",
    updatedAt: "2024-05-08T12:00:00Z",
  },
  {
    id: "diary6",
    userId: "user3",
    emotion: "tired",
    content: "오늘 운동을 많이 해서 피곤하다.",
    createdAt: "2024-05-07T12:00:00Z",
    updatedAt: "2024-05-07T12:00:00Z",
  },
]

const mockDiagnosisResults = [
  {
    id: "result1",
    userId: "user1",
    type: "PHQ-9",
    score: 10,
    answers: [1, 2, 1, 2, 1, 2, 1, 2, 1],
    message: "약간의 우울 증세가 있습니다.",
    createdAt: "2024-05-08T10:00:00Z",
  },
  {
    id: "result2",
    userId: "user1",
    type: "GAD-7",
    score: 8,
    answers: [1, 2, 1, 2, 1, 1, 0],
    message: "경미한 불안 증세가 있습니다.",
    createdAt: "2024-05-07T10:00:00Z",
  },
  {
    id: "result3",
    userId: "user2",
    type: "PHQ-9",
    score: 5,
    answers: [0, 1, 1, 1, 0, 1, 0, 1, 0],
    message: "경미한 우울 증세가 있습니다.",
    createdAt: "2024-05-08T11:00:00Z",
  },
  {
    id: "result4",
    userId: "user2",
    type: "GAD-7",
    score: 12,
    answers: [2, 2, 2, 1, 2, 2, 1],
    message: "중간 정도의 불안 증세가 있습니다.",
    createdAt: "2024-05-07T11:00:00Z",
  },
  {
    id: "result5",
    userId: "user3",
    type: "PHQ-9",
    score: 3,
    answers: [0, 0, 1, 0, 1, 1, 0, 0, 0],
    message: "우울 증세가 거의 없습니다.",
    createdAt: "2024-05-08T12:00:00Z",
  },
  {
    id: "result6",
    userId: "user3",
    type: "GAD-7",
    score: 4,
    answers: [1, 1, 0, 1, 0, 1, 0],
    message: "불안 증세가 거의 없습니다.",
    createdAt: "2024-05-07T12:00:00Z",
  },
]

// Mock Services
export const counselingService = {
  getAllCenters: async () => {
    return mockCounselingCenters
  },
  searchCenters: async (keyword) => {
    const lowerKeyword = keyword.toLowerCase()
    return mockCounselingCenters.filter(
      (center) =>
        center.name.toLowerCase().includes(lowerKeyword) || center.address.toLowerCase().includes(lowerKeyword),
    )
  },
  filterCentersByType: async (type) => {
    return mockCounselingCenters.filter((center) => center.type === type)
  },
  filterCentersByRegion: async (region) => {
    return mockCounselingCenters.filter((center) => center.region === region)
  },
}

export const informationService = {
  getAllContents: async () => {
    return mockInformationContents
  },
  filterContentsByType: async (type) => {
    return mockInformationContents.filter((content) => content.type === type)
  },
  createContent: async (content) => {
    const newContent = {
      ...content,
      id: Math.random().toString(36).substring(2, 15),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    mockInformationContents.push(newContent)
    return newContent
  },
  updateContent: async (content) => {
    const index = mockInformationContents.findIndex((c) => c.id === content.id)
    if (index !== -1) {
      mockInformationContents[index] = {
        ...content,
        updatedAt: new Date().toISOString(),
      }
      return mockInformationContents[index]
    }
    throw new Error("콘텐츠를 찾을 수 없습니다.")
  },
  deleteContent: async (id) => {
    const index = mockInformationContents.findIndex((c) => c.id === id)
    if (index !== -1) {
      mockInformationContents.splice(index, 1)
      return true
    }
    throw new Error("콘텐츠를 찾을 수 없습니다.")
  },
}

export const userService = {
  getCurrentUser: async () => {
    return mockUsers[0]
  },
}

export const diaryService = {
  getUserDiaries: async (userId) => {
    return mockDiaries.filter((diary) => diary.userId === userId)
  },
  createDiary: async (userId, emotion, content) => {
    const newDiary = {
      id: Math.random().toString(36).substring(2, 15),
      userId,
      emotion,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    mockDiaries.push(newDiary)
    return newDiary
  },
  updateDiary: async (diaryId, emotion, content) => {
    const diaryIndex = mockDiaries.findIndex((diary) => diary.id === diaryId)
    if (diaryIndex !== -1) {
      mockDiaries[diaryIndex] = {
        ...mockDiaries[diaryIndex],
        emotion,
        content,
        updatedAt: new Date().toISOString(),
      }
      return mockDiaries[diaryIndex]
    }
    throw new Error("일기를 찾을 수 없습니다.")
  },
  hasTodayDiary: async (userId) => {
    const today = new Date().toISOString().slice(0, 10)
    return mockDiaries.some((diary) => diary.userId === userId && diary.createdAt.slice(0, 10) === today)
  },
  // 새로 추가하는 함수
  getDiaryById: async (diaryId) => {
    const diary = mockDiaries.find((diary) => diary.id === diaryId)
    if (!diary) {
      throw new Error("일기를 찾을 수 없습니다.")
    }
    return diary
  },
  // 일기 삭제 기능도 추가
  deleteDiary: async (diaryId) => {
    const diaryIndex = mockDiaries.findIndex((diary) => diary.id === diaryId)
    if (diaryIndex !== -1) {
      mockDiaries.splice(diaryIndex, 1)
      return true
    }
    throw new Error("일기를 찾을 수 없습니다.")
  },
}

export const diagnosisService = {
  getQuestions: async (type) => {
    if (type === "PHQ-9") {
      return [
        { id: 1, text: "입맛이 없거나 식사하기가 불편하다." },
        { id: 2, text: "기분이 가라앉거나, 우울하거나, 희망이 없다." },
        { id: 3, text: "잠들기가 어렵거나 잠을 푹 자지 못한다." },
        { id: 4, text: "자신을 실패자라고 느끼거나, 자신이나 가족을 실망시켰다고 생각한다." },
        { id: 5, text: "무언가를 하는 데 흥미나 즐거움을 느끼지 못한다." },
        { id: 6, text: "피곤함을 느끼거나 기운이 없다." },
        { id: 7, text: "사람들이 평소에 하는 것처럼 말하거나 행동하는 데 어려움을 느낀다." },
        { id: 8, text: "혹시라도 내가 부주의했거나 잘못한 점은 없을까 걱정한다." },
        { id: 9, text: "차라리 죽는 것이 낫겠다고 생각하거나, 어떻게든 자해할 생각을 한다." },
      ]
    } else if (type === "GAD-7") {
      return [
        { id: 1, text: "신경과민, 불안 또는 초조함" },
        { id: 2, text: "어찌될지 모르는 일에 대한 걱정" },
        { id: 3, text: "걱정을 멈추거나 조절하기 어려움" },
        { id: 4, text: "편안하게 가만히 있기가 어려움" },
        { id: 5, text: "너무 안절부절 못해서 가만히 앉아 있기가 어려움" },
        { id: 6, text: "쉽게 짜증이 나거나 화를 냄" },
        { id: 7, text: "무슨 일에든 겁이 남" },
      ]
    }
    return []
  },
  saveResult: async (userId, type, score, answers) => {
    const newResult = {
      id: Math.random().toString(36).substring(2, 15),
      userId,
      type,
      score,
      answers,
      message: "진단 결과가 저장되었습니다.",
      createdAt: new Date().toISOString(),
    }
    mockDiagnosisResults.push(newResult)
    return newResult
  },
  getUserResults: async (userId) => {
    return mockDiagnosisResults.filter((result) => result.userId === userId)
  },
  interpretResult: (type, score) => {
    if (type === "PHQ-9") {
      if (score <= 4) {
        return { level: "정상", message: "우울 증세가 거의 없습니다." }
      } else if (score <= 9) {
        return { level: "경미한 우울증", message: "경미한 우울 증세가 있습니다." }
      } else if (score <= 14) {
        return { level: "중간 정도의 우울증", message: "중간 정도의 우울 증세가 있습니다." }
      } else if (score <= 19) {
        return { level: "심한 우울증", message: "심한 우울 증세가 있습니다." }
      } else {
        return { level: "매우 심한 우울증", message: "매우 심한 우울 증세가 있습니다." }
      }
    } else if (type === "GAD-7") {
      if (score <= 4) {
        return { level: "정상", message: "불안 증세가 거의 없습니다." }
      } else if (score <= 9) {
        return { level: "경미한 불안", message: "경미한 불안 증세가 있습니다." }
      } else if (score <= 14) {
        return { level: "중간 정도의 불안", message: "중간 정도의 불안 증세가 있습니다." }
      } else {
        return { level: "심한 불안", message: "심한 불안 증세가 있습니다." }
      }
    }
    return { level: "알 수 없음", message: "결과를 해석할 수 없습니다." }
  },
}

// 관리자 서비스 추가
export const adminService = {
  getStatistics: async () => {
    // 사용자 수
    const userCount = mockUsers.filter((user) => user.role === "user").length

    // 감정일기 수
    const diaryCount = mockDiaries.length

    // 자가진단 수
    const phq9Count = mockDiagnosisResults.filter((result) => result.type === "PHQ-9").length
    const gad7Count = mockDiagnosisResults.filter((result) => result.type === "GAD-7").length

    // 감정 통계
    const emotionCounts = {}
    mockDiaries.forEach((diary) => {
      emotionCounts[diary.emotion] = (emotionCounts[diary.emotion] || 0) + 1
    })

    const emotionStats = Object.entries(emotionCounts).map(([emotion, count]) => ({
      emotion,
      count,
    }))

    return {
      userCount,
      diaryCount,
      diagnosisCount: {
        phq9: phq9Count,
        gad7: gad7Count,
      },
      emotionStats,
    }
  },
  getDailyEmotionStats: async () => {
    // 일별 감정 통계 (실제로는 날짜별로 그룹화하여 계산)
    const emotionCounts = {}
    mockDiaries.forEach((diary) => {
      const date = diary.createdAt.slice(0, 10)
      if (!emotionCounts[date]) {
        emotionCounts[date] = {}
      }
      emotionCounts[date][diary.emotion] = (emotionCounts[date][diary.emotion] || 0) + 1
    })

    return emotionCounts
  },
  getMonthlyEmotionStats: async () => {
    // 월별 감정 통계 (실제로는 월별로 그룹화하여 계산)
    const emotionCounts = {}
    mockDiaries.forEach((diary) => {
      const month = diary.createdAt.slice(0, 7)
      if (!emotionCounts[month]) {
        emotionCounts[month] = {}
      }
      emotionCounts[month][diary.emotion] = (emotionCounts[month][diary.emotion] || 0) + 1
    })

    return emotionCounts
  },
}
