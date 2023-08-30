import { NavLink } from "react-router-dom";
import Users from "./Users";


const Admin = () => {
  return (
    <section>
      <h1>Admin panel</h1>
      <br />
      <Users/>
      <br />
      <div className="flexGrow">
        <NavLink to="/">Home</NavLink>
      </div>
    </section>
  )
}

export default Admin
