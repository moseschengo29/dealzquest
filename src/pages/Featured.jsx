import Section from '../components/Section'
import useRecommendedProducts from '../features/Recommended/useRecommended'
import Loader from "../components/Loader"
import RecommendedProducts from '../components/RecommendedProducts'


function Featured() {
  const {recommended_products, isLoading} = useRecommendedProducts()

  if(isLoading) return <Loader />
  return (
    <Section>
        <div>
            <RecommendedProducts products={recommended_products} />
        </div>
    </Section>
  )
}

export default Featured