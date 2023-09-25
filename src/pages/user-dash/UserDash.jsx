import { Sidenav } from "../../components/sidenav/Sidenav";
import { useAuth } from "../context/AuthContext";
import Form from "../../components/dashboard/form";
import { useEffect, useState } from "react";
import DisplayDocs from "./DisplayDocs";
import DashboardHead from "../../components/dashboard/header";
import Loader from '../../components/loader/Loader'
import "./Userdash.css"

const UserDash = () => {
  
  const [areDocsAvailable, setDocAvailability] = useState(false)
  const [docs, setDocs] = useState(null)
  const [reload, setReload] = useState(false)

  return (
    <section className="w-full min-h-screen relative box-border">
      <div className="fixed top-0 left-0 w-max">
        <Sidenav />
      </div>

      <div className="board ml-auto flex-grow z-10">
        <DashboardHead/>

        <Form setDocAvailability={setDocAvailability} setDocs={setDocs} areDocsAvailable={areDocsAvailable} setSuccess={setReload}/>

        <div className="available-docs mx-4 py-4 overflow-auto">
          <h2 className="text-4xl text-blue-gray-800 font-bold my-5">Available documents</h2>

          {areDocsAvailable ? 
          
          <div className="border-blue-gray-100 border-[1px] rounded-2xl overflow-hidden border-separate my-5"><DisplayDocs reload={reload}/></div> : 

          <div>
            <p>No documents currently available!</p>  
          </div>
          }
        </div>
      </div>

      <div className="fixed top-0 left-0 w-full h-screen bg-white opacity-80 hidden loading">
        <Loader />
      </div>

    </section>
  );
};

export default UserDash;