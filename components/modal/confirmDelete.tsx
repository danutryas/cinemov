import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { Modal } from "flowbite-react";
import Button from "../button/button";

type DeleteLogModal = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: () => void;
};
const ConfirmDelete = (props: DeleteLogModal) => {
  return (
    <Modal
      size="md"
      show={props.showModal}
      popup={true}
      onClose={() => props.setShowModal(false)}
    >
      <Modal.Header></Modal.Header>
      <Modal.Body>
        <div className="text-center">
          <ExclamationCircleIcon className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to <span className="font-bold">Sign Out</span>
            ?
          </h3>
          <div className="flex justify-center gap-4">
            <Button type="red" onClick={props.onSubmit}>
              Yes, Im sure
            </Button>
            <Button
              type="alternative"
              onClick={() => {
                props.setShowModal(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default ConfirmDelete;
