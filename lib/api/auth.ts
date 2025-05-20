import axiosBase from "./axiosBase"

// 1. 회원가입 요청에 사용할 타입 정의
export interface SignupPayload {
  name: string
  email: string
  password: string
  passwordConfirm: string
}

// 2. 회원가입 API 호출 함수
export const signupUser = async (payload: SignupPayload) => {
  const res = await axiosBase.post("/api/auth/signup", payload)
  return res.data
}