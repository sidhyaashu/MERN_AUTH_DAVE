import { NavLink } from "react-router-dom";

const Missing = () => {
  return (
    <article style={{ padding: "100px" }}>
      <h1>Oops!</h1>
      <p>Page Not Found</p>
      <div className="flexGrow">
        <NavLink to="/">Visit Our Homepage</NavLink>
      </div>
    </article>
  );
};

export default Missing;
