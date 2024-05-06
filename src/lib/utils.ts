

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"



export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(number: number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
 
export const truncateText = (text:string) =>{
    return text.length > 25 ? text.substring(0, 100) + '...' : text;
}

export const parseImageUrl = (url: string) => {
    if (!url) return '';

    if (url.startsWith('http') || url.startsWith('data:image')) {
        return url;
    }
    const parts = url.split(/[\\\/]/);
     
    const relativePath = "/" + parts[parts.length - 1];
    return relativePath;
}