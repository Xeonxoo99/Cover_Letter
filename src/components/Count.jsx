import React from 'react'

function Count() {
  // finished, projects opacity가 1개씩 0 → 1로 변하면서 늘어나는 것 처럼 보임
  // count 숫자 증가 0~4
  return (
    <div className='relative block h-[200vh] -mb-[115vh] pt-[6vw] pr-[3vw] pb-[8vw] pl-[3vw] uppercase font-aeonik font-semibold'>
      <div className='sticky top-0 mt-[3vw] flex w-full h-[100vh] items-center justify-between'>
        {/* finished */}
        <div className='flex flex-col w-[50%]'>
          <span className='text-2xl '>finished</span>
          <span className='text-2xl '>finished</span>
          <span className='text-2xl '>finished</span>
          <span className='text-2xl '>finished</span>
        </div>
        {/* count 숫자 */}
        <span className='text-[42vw] text-center w-[50%]'>0</span>
        {/* projects */}
        <div className='flex flex-col w-[50%] justify-end text-right'>
          <span className='text-2xl '>projects</span>
          <span className='text-2xl '>projects</span>
          <span className='text-2xl '>projects</span>
          <span className='text-2xl '>projects</span>
        </div>
      </div>
    </div>
  )
}

export default Count
