import React from 'react'

export const Container = (props: {children: React.ReactNode}) => {
  return (
    <div className='max-w-[1280px] !mx-auto w-full p-16'>{props.children}</div>
  )
}
