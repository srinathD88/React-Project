import { createContext, useReducer, useState } from "react";

import { PostsReducer } from "./PostsReducer";
import { initialState } from "../initialState";

export const PostsContext = createContext();

const PostsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PostsReducer, initialState);
  const [showForm, setShowForm] = useState(false);
  const [editPost, setEditPost] = useState(null);

  const updateStore = (data) => {
    dispatch(data);
  };

  const toggleForm = (val) => {
    setShowForm(val);
  }

  const editPostForm = (post) => {
    setEditPost(post);
  }

  const value = {
    state,
    updateStore,
    showForm,
    toggleForm,
    editPost,
    editPostForm
  };

  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
};

export default PostsProvider;
