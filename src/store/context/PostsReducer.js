export const PostsReducer = (state, action) => {
  switch (action.type) {
    case "add":
      const post = action.value;
      post["id"] = new Date().getTime();
      return { ...state, posts: [...state.posts, post] };

    case "delete":
      const postsAfterDelete = state.posts.filter((post) => post.id !== action.value);
      return { ...state, posts: postsAfterDelete };

    case "update":
      const postsAfterUpdate = state.posts.map((post) => {
        if (post.id === action.value.id) return action.value;
        return post;
      });
      return { ...state, posts: postsAfterUpdate };

    default:
      return state;
  }
};
