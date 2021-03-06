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

import styles from "./DeleteColumnModal.module.css";

export default function DeleteColumnModal({
  deleteColumnModalVisible,
  activeColumn,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = useCallback(() => setIsOpen(false), []);

  const router = useRouter();
  const { handleSubmit } = useForm();

  useEffect(() => {
    return () => {
      setIsOpen(!isOpen);
    };
  }, [deleteColumnModalVisible]);

  const onSubmit = async (id) => {
    try {
      const column = await api.getColumn(id);
      await api.createActivity(
        JSON.stringify({
          title: column.title,
          type: 2,
          action: 4,
          timestamp: Date(),
        })
      );
      await api.deleteColumn(id);
      closeModal();
      router.reload(window.location.pathname);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <ModalTransition>
        {isOpen && (
          <Modal onClose={closeModal} className={styles.wrapper}>
            <ModalHeader>
              <ModalTitle>Do you want to delete the column?</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(onSubmit(activeColumn));
                }}
                className={styles.form}
              >
                <p className={styles.title}>
                  The column will be permanently deleted!
                </p>
                <p className={styles.title} d>
                  Proceed?
                </p>

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
                    Accept
                  </button>
                </ModalFooter>
              </form>
            </ModalBody>
          </Modal>
        )}
      </ModalTransition>
    </div>
  );
}
