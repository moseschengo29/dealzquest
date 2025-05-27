import { TbError404 } from 'react-icons/tb'

function PageNotFound() {
  return (
    <div className='flex flex-col gap-1 items-center justify-center min-h-[80vh]'>
      <h1 className='text-black text-3xl font-bold dark:text-white'>Page Not Found!</h1>
      <div>
        <TbError404 size={180} className='text-black dark:text-white'/>
      </div>
    </div>  )
}

export default PageNotFound