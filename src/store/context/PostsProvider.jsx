import { createContext, useMemo, useReducer, useState } from "react";

import { PostsReducer } from "./PostsReducer";
import { initialState } from "../initialState";

const defaultValue = {
  state: initialState,
  showForm: false,
  editPost: null,
  updateStore: () => undefined,
  toggleForm: () => undefined,
  editPostForm: () => undefined,
};

export const PostsContext = createContext(defaultValue);

const PostsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PostsReducer, initialState);
  const [showForm, setShowForm] = useState(false);
  const [editPost, setEditPost] = useState(null);

  const updateStore = (data) => {
    dispatch(data);
  };

  const toggleForm = (val) => {
    setShowForm(val);
  };

  const editPostForm = (post) => {
    setEditPost(post);
  };

  const value = useMemo(() => {
    return {
      state,
      updateStore,
      showForm,
      toggleForm,
      editPost,
      editPostForm,
    };
  }, [state, showForm, editPost]);

  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
};

export default PostsProvider;
