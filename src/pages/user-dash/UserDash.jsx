import { Sidenav } from "../../components/sidenav/Sidenav";
import { useAuth } from "../context/AuthContext";
import Form from "../../components/dashboard/form";
import { useEffect, useState } from "react";
import DisplayDocs from "./DisplayDocs";
import DashboardHead from "../../components/dashboard/header";
import Loader from '../../components/loader/Loader'
import "./Userdash.css"
import endpoint from "../../assets/endpoint.json"

const url = endpoint.url

const UserDash = () => {
  const { user } = useAuth();
  
  const [areDocsAvailable, setDocAvailability] = useState(false)
  const [docs, setDocs] = useState(null)
  
  async function getAllDocs() {
    let requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: {
        authorization: `Bearer ${localStorage.getItem("user-token")} backend`
      }
    }
  
    try{
      let response = await fetch(`${url}/getAllDocs`,requestOptions)
      if (response.status == 201){
        let data = await response.json()
        localStorage.setItem("docs", JSON.stringify(data.Documents))
        setDocs(JSON.parse(localStorage.getItem("docs")))
        console.log(localStorage.getItem('docs'))
      }
      else{
        console.log("Fetch documents failed!")
      }
    }
    catch(error){console.log("error:", error)}
  }
  useEffect(() => {getAllDocs()}, [])

  return (
    <section className="w-full min-h-screen relative box-border">
      <div className="fixed top-0 left-0 w-max">
        <Sidenav />
      </div>

      <div className="board ml-auto flex-grow z-10">
        <DashboardHead/>

        {/* Heading */}
        {/* <h2 className="text-4xl text-blue-gray-800 font-bold my-5 mx-4">Upload documents</h2>
        
        <div className="mx-auto my-10 p-5 max-w-sm hover:cursor-pointer">
          <form onSubmit={onsubmit}>
            <div
            onClick={() => {document.getElementById("doc").click()}}
            className="w-full aspect-square border-2 border-dashed border-[#1475cf] flex flex-col justify-center items-center">

              <MdCloudUpload color='#1475cf' size={100} />
              <label htmlFor="doc" className="text-black text-xl">Select file</label>
              <input className="hidden" id="doc" name="doc" type="file"
              onInput={onInputFile}/>

              <p className="filename my-4 px-2 text-center text-gray-500 w-full overflow-hidden text-ellipsis">No file chosen</p>
            </div>

            <Button className="mt-10" fullWidth type="submit">Upload</Button>
          </form>
        </div> */}
        <Form setDocAvailability={setDocAvailability} setDocs={setDocs} docs={docs} areDocsAvailable={areDocsAvailable} />

        <div className="available-docs mx-4 py-4 overflow-auto">
          <h2 className="text-4xl text-blue-gray-800 font-bold my-5">Available documents</h2>

          {areDocsAvailable ? 
          
          <div className="border-blue-gray-100 border-[1px] rounded-2xl overflow-hidden border-separate my-5"><DisplayDocs isDocs={areDocsAvailable} docs={docs}/></div> : 

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