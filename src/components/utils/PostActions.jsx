import Button from './Button';

const PostActions = ({ post, editPost, deletePost }) => {
  return (
    <div className="post-actions-btn-group">
      <Button text="Edit" hadnleClick={() => editPost(post)} />
      <Button text="Delete" hadnleClick={() => deletePost(post)} />
    </div>
  );
};

export default PostActions;
