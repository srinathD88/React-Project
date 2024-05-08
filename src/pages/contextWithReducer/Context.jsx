import BackToHome from "../../components/utils/BackToHome";
import PostsProvider from "../../store/context/PostsProvider.jsx";
import ContextMain from "./ContextMain.jsx";

const ContextWithReducer = () => {
  return (
    <div className="context">
      <BackToHome />
      <PostsProvider>
        <h2>Context + Reducer</h2>
        <ContextMain />
      </PostsProvider>
    </div>
  );
};

export default ContextWithReducer;
