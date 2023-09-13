import Form from "../../components/dashboard/form";
import DisplayDocs from "../user-dash/DisplayDocs";
import DisplayUsers from "./DisplayUsers";
import { Sidenav } from "../../components/sidenav/Sidenav";
import DashboardHead from "../../components/dashboard/header";
import { useState, useEffect } from "react";
import Loader from "../../components/loader/Loader";
import endpoint from "../../assets/endpoint.json"
// import test from '../user-dash/test.json'

// const user = test.users
const url = endpoint.url
const Admin = () => {

  const [areDocsAvailable, setDocAvailability] = useState(false)
  const [docs, setDocs] = useState(null)
  const [users, setUsers] = useState([])

  const getRegisteredUsers = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
      headers:{
        authorization: `Bearer ${localStorage.getItem("user-token")} backend`
      }
    }

    console.log("Token",requestOptions.headers.authorization)

    try{
      let response = await fetch(`${url}/users`, requestOptions)
      if (response.status === 200){
        let data = await response.json()
        setUsers(data.users)
      }
      else{
        console.log("Response:", response)
        setUsers([])
      }
    }
    catch(error){console.log("error:", error)}
  }

  useEffect(() => {getRegisteredUsers()}, [])

  return (
    <section className="w-full min-h-screen relative box-border">
      <div className="fixed top-0 left-0 w-max">
        <Sidenav />
      </div>

      <div className="board ml-auto flex-grow z-10">
        <DashboardHead/>
        
        <Form setDocAvailability={setDocAvailability} setDocs={setDocs} docs={docs} areDocsAvailable={areDocsAvailable} />

        {/* Available Documents */}
        <div className="available-docs mx-4 py-4 overflow-auto">
          <h2 className="text-4xl text-blue-gray-800 font-bold my-5">Available documents</h2>
          {areDocsAvailable ? 
          <div className="border-blue-gray-100 border-[1px] rounded-2xl overflow-hidden border-separate my-5"><DisplayDocs isDocs={areDocsAvailable} docs={docs}/></div> : 
          <div>
            <p>No documents currently available!</p>  
          </div>
          }
        </div>
        
        {/* Available Users */}
        <div className="available-docs mx-4 py-4 overflow-auto">
          <h2 className="text-4xl text-blue-gray-800 font-bold my-5">Registered Users</h2>

          {users !== null && users != [] ? 
          <div className="border-blue-gray-100 border-[1px] rounded-2xl overflow-hidden border-separate my-5"><DisplayUsers users={users}/></div> : 
          <div>
            <p>No other registered users!</p>  
          </div>
          }
        </div>

        <div className="fixed top-0 left-0 w-full h-screen bg-white opacity-80 hidden loading">
          <Loader/>
        </div>
      </div>
    </section>
  );
};

export default Admin;
