import {
    useState,
    useEffect,
}from 'react'
// import axios from "axios"
import useRefreshToken from '../hook/useRefreshToken'
// const GET_USER_URL = "http://localhost:5000/users"
// import useAxiosPrivate from '../hook/useAxiosPrivate'
import useAxiosPrivate from "../hook/useAxiosPrivate"
// import useAxiosPrivate from '../hook/useAxiosPrivate'

const Users = () => {
    const axiosPrivate = useAxiosPrivate()
    const [users, setUsers] = useState();
    const refresh = useRefreshToken()

    useEffect(()=>{
        let isMounted = true;
        const controller = new AbortController()

        const getUser =async()=>{
        try {
            const response = await axiosPrivate.get("/users",{
                signal:controller.signal
            })
            // console.log(response.data)
            isMounted && setUsers(response.data)

        } catch (error) {
            console.log(error)
        }
    }

        getUser()
        return ()=>{
            isMounted = false;
            controller.abort()
        }

    },[])
  return (
    <article>
        <h2>Users List</h2>
        { users?.length
            ?(
                <ul>
                    {users.map((user,i)=> <li key={i} >{user?.username}</li> )}
                </ul>
            ): <p>No users to display</p>
        }
        <br />
        <button onClick={()=>refresh()}>Refresh</button>
        <br />
    </article>
  )
}

export default Users
