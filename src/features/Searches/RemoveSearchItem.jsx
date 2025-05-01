/* eslint-disable react/no-unescaped-entities */

import Modal from "../../components/Modal";
import MiniSpinner from "../../components/MiniSpinner";
import { useRemoveSearchItem } from "./useRemoveSearchItem";

function RemoveSearchItem({ close, id }) {
    console.log(id)
    const {clearSearchItem, isDeleting} = useRemoveSearchItem()
  const handleClear = () => {
    clearSearchItem(id, {
        onSuccess: () => close()
    })
  }

  return (
    <Modal close={close}>
            <div className="py-6 px-4 text-center bg-gray-800 dark:bg-boxdark">
                    <svg className="w-20 h-20 text-danger mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <h3 className="text-xl font-normal text-gray-300 mt-5 mb-6">Are you sure you want to remove this search item?</h3>
                    <div
                        onClick={handleClear}
                        className="text-white bg-red-500 cursor-pointer font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                        {isDeleting ? <MiniSpinner /> : "Yes, I'm sure"}
                    </div>
                    <div onClick={close}
                        className="text-gray-100 bg-n-7 hover:bg-gray cursor-pointer border-2 border-gray-500 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center">
                        No, cancel
                    </div>
            </div>

        </Modal>
  );
}

export default RemoveSearchItem;
