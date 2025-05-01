import FavouriteProducts from "../components/FavouriteProducts"
import Loader from "../components/Loader"
import useFavourites from "../features/Favourites/useFavourites"

function Favourites() {
  const {isLoading, favourites} = useFavourites()

  if(isLoading) return <Loader />

  console.log(favourites)


  return (
    <>
      
      <FavouriteProducts prodcuts={favourites}/>
    </>
  )
}

export default Favourites