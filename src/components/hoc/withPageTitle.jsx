import { useEffect } from "react";

export const withPageTitle = (Component, title) => {
  
  return (props) => {
    useEffect(() => {
        document.title = title;
      }, [title]);
    return <Component {...props} />;
  };
};
