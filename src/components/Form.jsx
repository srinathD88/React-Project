import { useState, useContext, useMemo } from "react";
import TagsComp from "./utils/tags.jsx";
import { PostsContext } from "../store/context/PostsProvider.jsx";
import Button from "./utils/Button.jsx";

const Form = () => {
  const { updateStore, toggleForm, editPost } = useContext(PostsContext);

  const [tags, setTags] = useState(editPost?.tags ?? []);
  const [errors, setErrors] = useState(null);
  const hadnleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    if (isValidForm(form)) {
      setErrors(null);
      const fd = new FormData(form);
      const values = Object.fromEntries(fd);
      updateStore({
        type: editPost?.id ? "update" : "add",
        value: { ...editPost, ...values, tags },
      });
      form.reset();
      setTags([]);
      closeForm();
    }
  };

  const onTagsUpdate = (e) => {
    if (e.keyCode === 13) {
      e.stopPropagation();
      const val = e.target.value.trim();
      if (val.length) {
        setTags((tags) => [...tags, val]);
      }
      e.target.value = "";
    }
  };

  const hadnleTagsClick = (index) => {
    tags.splice(index, 1);
    setTags([...tags]);
  };

  const isValidForm = (form) => {
    let valid = true;

    if (!form["title"].value || form["title"].value?.length < 3) {
      setErrors((errors) => ({ ...errors, title: "title error" }));
      valid = false;
    }

    if (!form["description"].value || form["description"].value?.length < 3) {
      setErrors((errors) => ({ ...errors, description: "description error" }));
      valid = false;
    }

    return valid;
  };

  const closeForm = () => {
    toggleForm(false);
  };

  const formTitle = useMemo(
    () => <h3>{editPost?.id ? "Edit Post" : "Add Post"}</h3>,
    [editPost]
  );

  return (
    <div className="form" onSubmit={hadnleSubmit}>
      {formTitle}
      <form>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            defaultValue={editPost?.title}
            required
          />
          {errors?.title && <span>{errors.title}</span>}
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            placeholder="Description"
            defaultValue={editPost?.description}
            required
          />
          {errors?.description && <span>{errors.description}</span>}
        </div>

        <div>
          <label htmlFor="tags">Tags</label>
          <textarea
            name="tags"
            id="tags"
            placeholder="Type tag and click enter key to add tags"
            onKeyDown={onTagsUpdate}
          />
          {tags?.length > 0 && (
            <TagsComp tagsList={tags} hadleClick={hadnleTagsClick} />
          )}
        </div>

        <div className="form-btn-group">
          <Button text="Submit" type="submit" />

          <Button text="Close" hadnleClick={closeForm} />
        </div>
      </form>
    </div>
  );
};

export default Form;
