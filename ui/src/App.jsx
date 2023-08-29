import Login from "./components/Login"
import Register from "./components/Register"
import Home from "./components/Home"
import Layout from "./config/Layout"
import Editor from "./components/Editor"
import Admin from "./components/Admin"
import Missing from "./config/Missing"
import Unauthorized from "./config/Unauthorized"
import Lounge from "./config/Lounge"
import LinkPage from "./components/LinkPage"
import RequireAuth from "./config/RequireAuth"
import { Routes,Route } from "react-router-dom"


const ROLES ={
  "User":2001,
  "Editor":1984,
  "Admin":5150
}

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        {/* Public routes  */}
        <Route path="login" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path="linkpage" element={<LinkPage/>}/>
        <Route path="unauthorized" element={<Unauthorized/>}/>


        {/* We want to protect those routes  */}
        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/" element={<Home/>}/>
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
          <Route path="editor" element={<Editor/>}/>
        </Route>
        
        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="admin" element={<Admin/>}/>
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Editor,ROLES.Admin]} />}>
          <Route path="lounge" element={<Lounge/>}/>
        </Route>

        <Route path="*" element={<Missing/>}/>
      </Route>
    </Routes>
  )
}

export default App
