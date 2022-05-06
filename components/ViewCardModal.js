import { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTransition,
} from "@atlaskit/modal-dialog";
import { api } from "../appwrite";

import styles from "./AddCardModal.module.css";

export default function ViewCardModal({ viewCardModalVisible, activeCard }) {
  const [cardData, setCardData] = useState();
  const [isOpen, setIsOpen] = useState(false);
  //   const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);
  const router = useRouter();

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
      //   closeModal();
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
            </ModalHeader>
            <ModalBody>
              <p className={styles.title}>Title</p>
              <p>{cardData ? cardData.title : ""}</p>

              <ModalFooter>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    closeModal();
                  }}
                  className={styles.cancel}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.add}>
                  Add
                </button>
              </ModalFooter>
            </ModalBody>
            {/* <ModalFooter>
              <button onClick={closeModal}>Cancel</button>
              <button onClick={closeModal} autoFocus>
                Add
              </button>
            </ModalFooter> */}
          </Modal>
        )}
      </ModalTransition>
    </div>
  );
}
