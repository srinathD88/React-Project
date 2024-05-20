import { useContext } from "react";
import Form from "../../components/Form";
import List from "../../components/List";
import Button from "../../components/utils/Button";
import { PostsContext } from "../../store/context/PostsProvider";
import Modal from "../../components/utils/Modal";

const ContextMain = () => {
  const { showForm, toggleForm, editPostForm } = useContext(PostsContext);

  const addPostBtnHandler = () => {
    toggleForm(true);
    editPostForm(null);
  };

  const closeModal = () => {
    toggleForm(false);
    editPostForm(null);
  }

  return (
    <div className="context-layout">
      <Button
        text="Add Post"
        hadnleClick={addPostBtnHandler}
        classTitle="add-form-btn"
      />
      {showForm && (
        <Modal closeModal={closeModal}>
          <Form />
        </Modal>
      )}
      <List />
    </div>
  );
};

export default ContextMain;
