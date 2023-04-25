import { useNavigate } from "react-router-dom";

export const Page404 = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <>
      <div>Page not found</div>
      <button onClick={handleClick}>Back to home</button>
    </>
  );
};
