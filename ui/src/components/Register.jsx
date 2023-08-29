import { 
    useRef,
    useState,
    useEffect
 } from "react";

import { 
  faCheck,
  faTimes,
  faInfoCircle
 } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import axios from '../api/axios'
import axios from "axios"

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "http://localhost:5000/register"

const Register = () => {

  const userRef = useRef()
  const errRef = useRef()

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(()=>{
    if (userRef.current) {
    userRef.current.focus();
  }
  },[])

  useEffect(()=>{
    setValidName(USER_REGEX.test(user))
  },[user])

  useEffect(()=>{
    setValidPwd(PWD_REGEX.test(pwd))
    setValidMatch(pwd === matchPwd)
  },[pwd, matchPwd])

  useEffect(()=>{
    setErrMsg('')
  },[user,pwd,matchPwd])


  /** Form submitting function */
  const handleSubmit =async(e)=>{
    e.preventDefault()

    const v1 = USER_REGEX.test(user)
    const v2 = PWD_REGEX.test(pwd)

    if(!v1 || !v2){
      setErrMsg("Invalid Inputs")
      return;
    }
    try{
      const response = await axios.post(REGISTER_URL,
      JSON.stringify({ user, pwd }),{
        headers:{
          'Content-Type':'application/json'
        },
        withCredentials:true
      })

      console.log(response.data)
      setSuccess(true)
      /**Clear the input feilds */

    } catch(err){
      if(!err?.response){
        setErrMsg("No server response")
      }else if(err?.response?.status === 409){
        setErrMsg("Username Taken")
      }else{
        setErrMsg("Registration Failed")
      }
      errRef.current.focus();
    }
  }


  return (
    <>
    {success ? (
        <section>
          <h1>Success</h1>
          <p>
            <a href="#">Sign In</a>
          </p>
        </section>
      ):(
    <section>
      <p ref={errRef} className={errMsg?"errmsg":"offscreen"} aria-live="assertive" >{errMsg}</p>
      <h1>Register</h1>
      <form onSubmit={handleSubmit} >


        <label htmlFor="username">
            Username:
            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
            <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
        </label>
        <input
        type="text"
        id="username"
        ref={userRef}
        autoComplete="off"
        onChange={(e)=>setUser(e.target.value)}
        required
        aria-describedby="uidnote"
        value={user}
        aria-invalid={validName ? "false" : "true"}
        onFocus={()=>setUserFocus(true)}
        onBlur={()=>setUserFocus(false)}
        />
        <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
            <FontAwesomeIcon icon={faInfoCircle} />
            4 to 24 characters.<br />
            Must begin with a letter.<br />
            Letters, numbers, underscores, hyphens allowed.
        </p>




        <label htmlFor="password">
            Password:
            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
        </label>
        <input
        type="password"
        id="password"
        value={pwd}
        // ref={userRef}
        onChange={(e)=>setPwd(e.target.value)}
        required
        aria-invalid={validPwd ? "false" : "true"}
        aria-describedby="pwdnote"
        onFocus={()=>setPwdFocus(true)}
        onBlur={()=>setPwdFocus(false)}
        />
        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions":"offscreen"} >
          <FontAwesomeIcon icon={faInfoCircle}/>
          8 to 24 charecter. <br />
          must include uppercase and lower case letter, number and special cheracter. <br />
          Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
        </p>




        <label htmlFor="confirm_pwd">
          Confirm Password:
          <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
          <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
        </label>
        <input
          type="password"
          id="confirm_pwd"
          aria-invalid={validMatch ? "false" : "true"}
          aria-describedby="confirmnote"
          onChange={(e) => setMatchPwd(e.target.value)}
          required
          value={matchPwd}
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
          />
          <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.
          </p>

          <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>

      </form>
      <p>
                        Already registered?<br />
                        <span className="line">
                            {/*put router link here*/}
                            <a href="#">Sign In</a>
                        </span>
                    </p>
    </section>
    )
    }
    </>
  )
}

export default Register

