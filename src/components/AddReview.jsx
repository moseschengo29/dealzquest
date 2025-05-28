/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import MiniSpinner from "./MiniSpinner";
import Modal from "./Modal";
import { useAddReview } from "../features/Reviews/useAddReview";

function AddReview({ close }) {
  const [formData, setFormData] = useState({
    rating: 5,
    review_type: "system",
    description: "",
    product: null, // optional, depends on your logic
  });

  const { addReview, isAdding } = useAddReview(close);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description) return;
    addReview(formData, {
        onSuccess: () => close ()
    });
  };

  return (
    <Modal close={close}>
      <form
        onSubmit={handleSubmit}
        className=" rounded-lg p-6 w-full text-gray-100 space-y-4"
      >
        <h2 className="text-xl font-semibold text-center">Add a System Review</h2>

        <div className="text-left">
          <label className="block mb-1 text-sm">Rating</label>
          <select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
          >
            {[5, 4, 3, 2, 1].map((num) => (
              <option key={num} value={num}>
                {"⭐".repeat(num)} ({num})
              </option>
            ))}
          </select>
        </div>

        <div className="text-left">
          <label className="block mb-1 text-sm">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 resize-none"
            placeholder="Write your review here..."
            required
          />
        </div>


        <div className="flex justify-end space-x-4 mt-4">
          <button
            type="button"
            onClick={close}
            className="px-4 py-2 rounded border border-gray-500 text-gray-300 hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center space-x-2"
            disabled={isAdding}
          >
            {isAdding ? <MiniSpinner /> : <span>Submit Review</span>}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default AddReview;
