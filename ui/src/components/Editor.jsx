import { NavLink } from "react-router-dom";

const Editor = () => {
  return (
    <section>
      <h1>Editors Page</h1>
      <br />
      <p>You must have been assigned an Editor role.</p>
      <div className="flexGrow">
        <NavLink to="/">Home</NavLink>
      </div>
    </section>
  );
};

export default Editor;
