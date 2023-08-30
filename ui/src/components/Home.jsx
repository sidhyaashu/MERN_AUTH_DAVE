import { useNavigate,NavLink } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";


const Home = () => {
  const { setAuth } =useContext(AuthContext)
  const navigate = useNavigate()


  const logout = async()=>{
    setAuth({})
    navigate('/linkpage')
  }
  return (
    <section>
      <h1>Welcome To Home Page</h1>
      <br />
      <p>You are logged in</p>
      <br />
      <NavLink to="/editor">Go to editor page</NavLink>
      <br />
      <NavLink to="/admin">Go to Admin page</NavLink>
      <br />
      <NavLink to="/lounge">Go to Lounge page</NavLink>
      <br />
      <NavLink to="/linkpage">Go to Link page</NavLink>
      <br />
    </section>
  )
}

export default Home
