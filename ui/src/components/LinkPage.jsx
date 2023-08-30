import { NavLink,useNavigate} from "react-router-dom"


const LinkPage = () => {
  const navigate = useNavigate()

  const backToHome = ()=>navigate(-1)
  return (
    <section>
      <h1>Links</h1>
      <br />
      <h2>PUBLIC LINK</h2>
      <br />
      <NavLink to="/login">LOGIN</NavLink>
      <br />
      <NavLink to="/register">REGESTER</NavLink>

      <br />
      <br />
      <h2>PRIVATE LINKS</h2>
      <br />
      <NavLink to="/">HOME</NavLink>
      <br />
      <NavLink to="/editor">EDITORS PAGE</NavLink>
      <br />
      <NavLink to="/admin">ADMIN PAGE</NavLink>
      <br />
      <button onClick={backToHome} >Back To Home</button>

    </section>
  )
}

export default LinkPage
