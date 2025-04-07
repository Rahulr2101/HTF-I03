import React from 'react'
import { Package, Ship } from 'lucide-react';

import { cn } from "@/lib/utils"
export const Logo = ({className}) => {
  return (
    <div className={cn('flex items-center gap-2',className)}>
      <div className="relative flex items-center justify-center">
        <div className="relative p-1.5">
        <Package 
  size={32} 
  className="text-blue-600 dark:text-blue-400 sm:size-36 md:size-42 lg:size-12"
  strokeWidth={2.5} 
/>
        </div>
      </div>
      
      {  (
        <div className={"font-bold text-lg lg:text-3xl tracking-tight"}>
          <span className="text-slate-900 dark:text-white">Ship</span>
          <span className="text-blue-600 dark:text-blue-400">Well</span>
        </div>
      )}
    </div>
  )
}
