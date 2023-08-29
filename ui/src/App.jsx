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


const App = () => {
  return (
    <main className="App">
      {/* <Register/> */}
      <Login/>
    </main>
  )
}

export default App
