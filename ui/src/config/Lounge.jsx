import { NavLink } from "react-router-dom"

const Lounge = () => {
  return (
    <section>
      <h1>Lounge Page</h1>
      <br />
      <p>Admin and Editor Hang out place</p>
      <div className="flexGrow">
        <NavLink to="/">Home</NavLink>
      </div>
    </section>
  )
}

export default Lounge
