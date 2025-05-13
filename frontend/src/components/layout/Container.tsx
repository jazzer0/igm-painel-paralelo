import React from 'react'

export const Container = (props: {children: React.ReactNode}) => {
  return (
    <div className='max-w-[1280px] !mx-auto w-full p-4 h-screen flex flex-col'>{props.children}</div>
  )
}
