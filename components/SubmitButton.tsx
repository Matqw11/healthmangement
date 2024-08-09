import React from 'react'
import { Button } from './ui/button';
import  Image  from 'next/image';
interface ButtonProps{
    isLoading: boolean;
    className?: string;
    children: React.ReactNode;
  
}

const submitButton = ({isLoading, className, children}: ButtonProps) => {
  return (
    <Button type='submit' disabled={isLoading} className={className ?? 'shad-primary-btn w-full'}>
      {isLoading? (
        <div className='flex items-center gap-4'>
        <Image 
        src = '/assets/icons/loader.svg'
        alt = 'loading'
        height = {24}
        width = {24}
        />
        'Loading...'
        </div>
       ): children}  
        {/* If isLoading is true, show 'Loading...' else show children */}
    </Button>
  )
}

export default submitButton