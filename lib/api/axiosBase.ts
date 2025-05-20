import axios from "axios"

const axiosBase = axios.create({
baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:9000",
  headers: {
    "Content-Type": "application/json",
  },
})

export default axiosBase