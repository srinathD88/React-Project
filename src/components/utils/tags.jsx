const TagsComp = ({tagsList, hadleClick}) => {
  return (
    <div className="tags">
      {tagsList.map((tag, index) => (
        <p key={index} onClick={() => hadleClick ? hadleClick(index) : false}>{tag}</p>
      ))}
    </div>
  );
};

export default TagsComp;
