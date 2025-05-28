import { useEffect } from 'react'
import Loader from '../components/Loader'
import ReviewsTab from '../components/ReviewsTab'
import useReviews from '../features/Reviews/useReviews'

function Reviews() {
  const {reviews, isLoading:isLoadingReviews} = useReviews()

  useEffect(() => {}, [reviews])

  if(isLoadingReviews) return <Loader />
  return (
    <div>
      <ReviewsTab reviews={reviews} />
    </div>
  )
}

export default Reviews