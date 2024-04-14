import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num:number){
  const numToStr= num.toString()
  return " ₦ "+ ' ' +numToStr
}
