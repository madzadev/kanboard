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

import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import { api } from "../appwrite";

import styles from "./ViewCardModal.module.css";

export default function ViewCardModal({ viewCardModalVisible, activeCard }) {
  const [cardData, setCardData] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const closeModal = useCallback(() => setIsOpen(false), []);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (id, data) => {
    try {
      const updatePost = await api.updatePost(id, data);
      closeModal();
      router.reload(window.location.pathname);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    setEditMode(false);
    setDeleteMode(false);
    const getCardData = async (id) => {
      try {
        const data = await api.getPost(id);
        console.log(data);
        setCardData(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getCardData(activeCard);
    return () => {
      setIsOpen(!isOpen);
    };
  }, [viewCardModalVisible]);

  return (
    <div>
      {/* <button onClick={openModal}>Open modal</button> */}

      <ModalTransition>
        {isOpen && (
          <Modal onClose={closeModal} className={styles.wrapper}>
            <ModalHeader>
              <div className={styles.head}>
                <ModalTitle>{cardData ? cardData.title : ""}</ModalTitle>
                <div className={styles.buttons}>
                  <EditButton
                    onClick={() => {
                      setEditMode(!editMode);
                      setDeleteMode(false);
                    }}
                  />
                  <DeleteButton
                    onClick={() => {
                      setDeleteMode(!deleteMode);
                      setEditMode(false);
                    }}
                  />
                </div>
              </div>
            </ModalHeader>
            {editMode ? (
              <ModalBody>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(onSubmit(activeCard, cardData));
                  }}
                  className={styles.form}
                >
                  <p className={styles.title}>Edit the title</p>
                  <input
                    {...register("title", { required: true })}
                    className={styles.input}
                    value={cardData.title}
                    onChange={(e) => {
                      setCardData({ ...cardData, title: e.target.value });
                    }}
                  />
                  {errors.title && (
                    <span className={styles.error}>Enter a valid title</span>
                  )}
                  <p className={styles.title}>Edit the description</p>
                  <input
                    {...register("description", { required: true })}
                    className={styles.input}
                    value={cardData.description}
                    onChange={(e) => {
                      setCardData({ ...cardData, description: e.target.value });
                    }}
                  />
                  {errors.description && (
                    <span className={styles.error}>
                      Enter a valid description
                    </span>
                  )}
                  <p className={styles.title}>Enter the due date (optional)</p>
                  <input
                    {...register("due_date")}
                    type="date"
                    className={styles.input}
                    value={cardData.due_date ? cardData.due_date : ""}
                    onChange={(e) => {
                      setCardData({ ...cardData, due_date: e.target.value });
                    }}
                  />
                  {errors.due_date && (
                    <span className={styles.error}>Enter a valid due date</span>
                  )}
                  {/* <input type="submit" className={styles.submit} /> */}
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
                      Save
                    </button>
                  </ModalFooter>
                </form>
              </ModalBody>
            ) : deleteMode ? (
              <ModalBody>
                <p className={styles.title}>
                  The card will be permanently deleted!
                </p>
                <p>Proceed?</p>
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
                  <button
                    className={styles.add}
                    onClick={() => {
                      api.deletePost(activeCard);
                      closeModal();
                      router.reload(window.location.pathname);
                    }}
                  >
                    Accept
                  </button>
                </ModalFooter>
              </ModalBody>
            ) : (
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
                </ModalFooter>
              </ModalBody>
            )}
          </Modal>
        )}
      </ModalTransition>
    </div>
  );
}
