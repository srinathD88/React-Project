import { useContext } from "react";
import TagsComp from "./utils/tags.jsx";
import { PostsContext } from "../store/context/PostsProvider.jsx";
import PostActions from "./utils/PostActions.jsx";

const List = () => {
  const { state, updateStore, toggleForm, editPostForm } =
    useContext(PostsContext);

  const editPost = (post) => {
    toggleForm(true);
    editPostForm(post);
  };

  const deletePost = (post) => {
    updateStore({
      type: "delete",
      value: post.id,
    });
  };

  return (
    <div className="list">
      <h3>Posts</h3>
      <section>
        {state?.posts?.length ? (
          state.posts.map((post) => (
            <div key={post.id}>
              <h4>{post.title}</h4>
              <p>{post.description}</p>
              {post?.tags?.length > 0 && <TagsComp tagsList={post.tags} />}
              <PostActions
                post={post}
                editPost={editPost}
                deletePost={deletePost}
              />
            </div>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </section>
    </div>
  );
};

export default List;
