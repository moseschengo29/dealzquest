
function Spinner() {
  return (
        <div className="relative h-[60vh]">
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-t-transparent border-[#FFF94F] z-50 text-[#FFF94F]"></div>
      </div> 

    </div>
  )
}

export default Spinner