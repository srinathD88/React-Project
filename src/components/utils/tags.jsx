const TagsComp = ({ tagsList, hadleClick }) => {
  if (!tagsList?.length) return null;

  return (
    <div className="tags">
      {tagsList.map((tag, index) => (
        <p
          role="tag"
          key={index}
          onClick={() => (hadleClick ? hadleClick(index) : false)}
        >
          {tag}
        </p>
      ))}
    </div>
  );
};

export default TagsComp;
