import { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTransition,
} from "@atlaskit/modal-dialog";

import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import { api } from "../appwrite";

import styles from "./ViewCardModal.module.css";

export default function ViewCardModal({ viewCardModalVisible, activeCard }) {
  const [cardData, setCardData] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    return () => {
      setIsOpen(!isOpen);
    };
  }, [viewCardModalVisible]);

  const getCardData = async (id) => {
    try {
      const data = await api.fetchPostById(id);
      console.log(data);
      setCardData(data);
    } catch (err) {
      console.log(err.message);
    }
  };
  getCardData(activeCard);

  return (
    <div>
      {/* <button onClick={openModal}>Open modal</button> */}

      <ModalTransition>
        {isOpen && (
          <Modal onClose={closeModal} className={styles.wrapper}>
            {/* <h1>{addCardModalVisible}</h1> */}
            <ModalHeader>
              <ModalTitle>Card: {cardData ? cardData.title : ""}</ModalTitle>
              <EditButton
                onClick={() => {
                  console.log(activeCard);
                }}
              />
              <DeleteButton
                onClick={() => {
                  console.log(activeCard);
                }}
              />
            </ModalHeader>
            <ModalBody>
              <p className={styles.title}>Title</p>
              <p>{cardData ? cardData.title : ""}</p>

              <p className={styles.title}>Description</p>
              <p>{cardData ? cardData.description : ""}</p>

              <ModalFooter>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    closeModal();
                  }}
                  className={styles.cancel}
                >
                  Close
                </button>
                {/* <button type="submit" className={styles.add}>
                  Add
                </button> */}
              </ModalFooter>
            </ModalBody>
          </Modal>
        )}
      </ModalTransition>
    </div>
  );
}
