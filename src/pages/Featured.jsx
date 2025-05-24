import Section from '../components/Section'
import useRecommendedProducts from '../features/Recommended/useRecommended'
import Loader from "../components/Loader"
import RecommendedProducts from '../components/RecommendedProducts'
import useFavourites from '../features/Favourites/useFavourites'


function Featured() {
  const {recommended_products, isLoading} = useRecommendedProducts()
    const {isLoading: isLoadingFavourites, favourites} = useFavourites()
  

  if(isLoading || isLoadingFavourites) return <Loader />
  return (
    <Section>
        <div>
            <RecommendedProducts products={recommended_products} favourites={favourites} />
        </div>
    </Section>
  )
}

export default Featured