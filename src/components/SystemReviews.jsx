import { FaArrowUp, FaArrowDown, FaStar } from "react-icons/fa";
import { useState } from "react";
import Button from "./Button";
import AddReview from "./AddReview";
import { useAddVote } from "../features/Reviews/useAddVote";

function SystemReviews({ reviews }) {
  const [reviewList, setReviewList] = useState(reviews);
  const { addVote, isAdding } = useAddVote();

  const [showAddReviewModal, setShowAddReviewModal] = useState()

  function handleShowModal(){
    setShowAddReviewModal(true)
  }

  function handleCloseModal(){
    setShowAddReviewModal(false)
  }

  const handleVote = async (reviewId, voteType, currentVote) => {
    const isUndoing = voteType === currentVote;

    const formData = {
      review: reviewId,
      vote_type: isUndoing ? null : voteType,
    };

    try {
      await addVote(formData);
      // You can optionally update state here after vote if not auto-refetched
    } catch (error) {
      console.error("Vote failed", error);
    }
  };

  return (
    <>
    {showAddReviewModal && <AddReview close={handleCloseModal} />}
    <div className="px-12 flex flex-col md:flex-row justify-between mb-8">
        <h1 className="my-2 font-extrabold text-3xl">System Reviews</h1>
        <Button onClick={handleShowModal}>Add System Review</Button>
    </div>
    <div className="max-w-7xl mx-auto space-y-4">
      {reviewList
        ?.filter((review) => review.review_type === "system")
        ?.map((review) => (
          <div
            key={review.id}
            className="flex items-start space-x-4 bg-gray-900 p-4 rounded shadow"
          >
            <div className="flex flex-col items-center space-y-1">
              <button
                onClick={() =>
                  handleVote(
                    review.id,
                    review.user_voted === "up" ? null : "up",
                    review.user_voted
                  )
                }
                className={`text-xl ${
                  review.user_voted === "up"
                    ? "text-green-600"
                    : "text-gray-500 hover:text-green-500"
                }`}
                disabled={isAdding}
              >
                <FaArrowUp />
              </button>
              <span className="text-sm text-gray-300 font-bold">{review.upvotes}</span>
              <button
                onClick={() =>
                  handleVote(
                    review.id,
                    review.user_voted === "down" ? null : "down",
                    review.user_voted
                  )
                }
                className={`text-xl ${
                  review.user_voted === "down"
                    ? "text-red-600"
                    : "text-gray-500 hover:text-red-500"
                }`}
                disabled={isAdding}
              >
                <FaArrowDown />
              </button>
              <span className="text-sm text-gray-200 font-bold">{review.downvotes}</span>
            </div>

            <div className="flex-1">
                <div className="flex gap-2 items-center">
                    <img src="https://www.whitechapelgallery.org/wp-content/uploads/2020/07/blank-head-profile-pic-for-a-man.jpg" className="w-10 rounded-full mb-2" alt="" />
                    <span className="font-semibold text-gray-300">
                        {review.user}
                    </span>
                </div>
            
              <p className="text-gray-200">{review.description}</p>
              <div className="text-sm text-gray-400 flex items-center gap-2 mt-1">
                <span>Rating</span> {' '}
                |{" "}
                {[...Array(review.rating)].map((_, index) => (
                  <FaStar size={22} key={index} className="text-yellow-400" />
                ))}
                
              </div>
              <span className="text-xm text-gray-300 flex items-center gap-2 mt-1">
                  {new Date(review.created_at).toLocaleString()}
                </span>
            </div>
          </div>
        ))}
    </div>
    </>
  );

}

export default SystemReviews;
