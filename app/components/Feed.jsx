import { Menu, LikeBtn, Bubble, Airplane, BookMark } from '../icons/icons'

export const Feed = () => {
  return (
    <div className='w-[400px] bg-white'>
      <div id='header' className='flex items-center justify-between p-2'>
        {/* profile */}
        <div className='flex items-center'>
          <div 
            className='rounded-full w-10 h-10 
            bg-[url("https://cdn-icons-png.flaticon.com/512/3135/3135707.png")] bg-contain mr-2'></div>
          <div>
            <div className='font-semibold'>Han</div>
            <div className='font-light'>seoul</div>
          </div>
        </div>
        {/* 더보기 버튼 */}
        <div>
          <Menu/>
        </div>
      </div>

      <div id='content' className='w-[400px] h-[400px]'>
        {/* 이미지 */}
        <img 
          className='object-cover w-[400px] h-[400px]'
        src='https://plus.unsplash.com/premium_photo-1681256187605-2d66160926a2?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDh8NnNNVmpUTFNrZVF8fGVufDB8fHx8fA%3D%3D' alt='img' />
      </div>

      <div id='footer' className='flex items-center justify-between p-2'>
        {/* 좋아요버튼, 댓글버튼, DM버튼 */}
        <div className='flex items-center w-1/4 justify-around'>
            <LikeBtn />
            <Bubble />
            <Airplane />
        </div>
        <div>
          <BookMark />
        </div>
      </div>

      <div id='comments' className='p-2'>
        {/* 누가 좋아요? 좋아요 수 */}
        <div>Like by <b>{40} others</b></div>
        <div>
          <b>Han</b> nature photo
        </div>
        {/* 내가 작성한 컨텐츠의 글 */}
        {/* 댓글들 */}
      </div>
    </div>
  )
}