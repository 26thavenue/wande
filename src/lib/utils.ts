

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
// utils/getCategoryId.ts
import { useRouter } from 'next/router';


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(number: number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
 
export const truncateText = (text:string) =>{
    return text.length > 25 ? text.substring(0, 100) + '...' : text;
}