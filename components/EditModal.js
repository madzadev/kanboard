import { useCallback, useState, useEffect } from "react";

import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTransition,
} from "@atlaskit/modal-dialog";

export default function EditModal({ editModalVisible }) {
  const [isOpen, setIsOpen] = useState(false);
  //   const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    return () => {
      setIsOpen(!isOpen);
    };
  }, [editModalVisible]);

  return (
    <div>
      {/* <button onClick={openModal}>Open modal</button> */}

      <ModalTransition>
        {isOpen && (
          <Modal onClose={closeModal}>
            <h1>{editModalVisible}</h1>
            <ModalHeader>
              <ModalTitle>Duplicate this page</ModalTitle>
            </ModalHeader>
            <ModalBody>
              Duplicating this page will make it a child page of{" "}
              <span>Search - user exploration</span>, in the{" "}
              <span>Search & Smarts</span> space.
            </ModalBody>
            <ModalFooter>
              <button onClick={closeModal}>Cancel</button>
              <button onClick={closeModal} autoFocus>
                Add
              </button>
            </ModalFooter>
          </Modal>
        )}
      </ModalTransition>
    </div>
  );
}
