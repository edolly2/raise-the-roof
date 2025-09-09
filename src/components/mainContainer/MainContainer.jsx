import "./MainContainer.css";

const MainContainer = ({ children, className }) => {
  return <main className={className}>{children}</main>;
};

export default MainContainer;
