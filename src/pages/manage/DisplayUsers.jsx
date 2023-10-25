import { useAuth } from "../context/AuthContext"
import { useState, useEffect } from "react"
import endpoint from "../../assets/endpoint.json"
// import "..//Userdash.css"

const url = endpoint.url

export default function DisplayUsers({reload, filter = ''}){
    const {user} = useAuth()
    const [users, setUsers] = useState([])
    const [isUsers, setIsUsers] = useState(!!users)

    const getRegisteredUsers = async () => {
        const requestOptions = {
          method: "GET",
          redirect: "follow",
          headers:{
            authorization: `Bearer ${user.accessToken} backend`
          }
        }
    
        try{
          let response = await fetch(`${url}/users`, requestOptions)
          if (response.status === 200){
            let data = await response.json()
            let modData = data.users
            modData.forEach(user => {
              user.name = `${user.firstName},${user.lastName.toUpperCase()}`
            })
            setUsers(modData)
          }
          else{
            console.log("Response:", response)
            setUsers([])
          }
        }
        catch(error){console.log("error:", error)}
    
        console.log("Successfully gotten users!")
    }

    useEffect(() => {getRegisteredUsers()}, [reload])
    
    return(
        <div className="relative max-h-[450px] overflow-y-scroll">
            <table className="w-full">
                <thead>
                    <tr className="py-3 h-10 bg-blue-gray-50 border-b border-blue-gray-100 text-blue-gray-600 sticky top-0">
                        <th className="px-3">First Name</th>
                        <th className="px-3">Last Name</th>
                        <th className="px-3">Email</th>
                        <th className="w-36 px-3"></th>
                    </tr>
                </thead>

                <tbody>
                {isUsers && users.filter(item => item.name.toLowerCase().includes(filter.toLowerCase())).map(user => 
                    <TableRow key={user._id} user={user}/>
                )}
                </tbody>
            </table>
        </div>
    )
}

function TableRow({user}){

  const handleDelete = async(mail) => {
    const requestOptions = {
      method: 'POST',
      redirect:'follow',
      body: JSON.stringify({email: mail}),
      headers: {
        authorization: `Bearer ${user.accessToken}`,
        'Content-Type': 'application/json'
      }
    }
    try{
      const response = await fetch(`${url}/delete`, requestOptions)
      if (response.status == 200){
        alert("Delete Successful!")
      }
    }
    catch(err){console.log("Error deleting user:", err)}
  }

    return(
        <tr className="py-3 px-2 h-10 border-b border-blue-gray-100 text-center text-blue-gray-500">
            <td className="overflow-x-hidden px-2">{user.firstName}</td>
            <td className="overflow-x-hidden px-2">{user.lastName}</td>
            <td className="overflow-x-hidden px-2">{user.email}</td>
            <td className="overflow-x-hidden px-2 text-red-400 hover:opacity-75 active:opacity-100"><button onClick={() => handleDelete(user.email)}>Delete</button></td>
        </tr>
    )
}