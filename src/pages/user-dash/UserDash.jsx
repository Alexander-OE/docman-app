import { Sidenav } from "../../components/sidenav/Sidenav";
import { useAuth } from "../context/AuthContext";
import { MdCloudUpload } from "react-icons/md";
import { Button } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import DisplayDocs from "./DisplayDocs";
import axios from "axios";
import "./Userdash.css"

const docman = "https://docman-ctvx.onrender.com"

const UserDash = () => {
  const { user } = useAuth();

  const [areDocsAvailable, setDocAvailability] = useState(true)

  // useEffect(() => {checkForDocs()}, [])

  const onInputFile = () => {
    const file = document.querySelector("#doc").value.split("\\")
    const name = file[file.length - 1]
    document.querySelector(".filename").innerHTML = name? name: "No file chosen"
  }

  const onsubmit = async (event) => {
    event.preventDefault()
    const filename = document.querySelector(".filename").innerHTML
    console.log(filename)

    if (filename == "No file chosen"){
      console.log("Select valid file")
    }

    else{
      const fileInput = document.getElementById("doc")
      const file = fileInput.files[0]
      let data = new FormData();
      data.append('file', file, "[PROXY]");
      data.append('writeAccess[]', 'williamsnkama@gmail.com');
      data.append('readAccess[]', 'williamsnkama@gmail.com');
      data.append('deleteAccess[]', 'williamsnkama@gmail.com');
      data.append('name', `${filename}`);
      data.append('writeAccess[]', 'williamsnkama@gmail.com');
      data.append('readAccess[]', 'williamsnkama@gmail.com');

      let requestOptions = {
        method: 'POST',
        body: data,
        redirect: 'follow',
        // headers: {
        //   accessToken: localStorage.getItem("accessToken")
        // }
      };

      try{
        let response = await fetch(`${docman}/upload`, requestOptions)
        if (response.status == 201){
          alert("Uploaded successfully")
          document.getElementById("doc").value = null
          onInputFile()
        }
        else if (response.status == 401){
          const data = await response.json()
          console.log("401-message:", data.message)
        }
        else{
          alert("Upload failed. Try again")
        }
      } catch (error) {console.log("error:", error)}
      finally{
        console.log("Done!")
      }

      // fetch(`${docman}/upload`, requestOptions)
      // .then(response => response.json())
      // .then(result => console.log("result:",result.message))
      // .catch(error => console.log('error', error));

    }
  }

  // const checkForDocs = () => {
  //   let requestOptions = {
  //     method: 'GET',
  //     redirect: 'follow'
  //   };

  //   fetch(`${docman}/getAllDocs`, requestOptions)
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log(data)
  //     if (data.message && data.message == 'pls provide access token'){
  //       setDocAvailability(false)
  //     }
  //     else{
  //       setDocAvailability(true)
  //     }
  //   })
  //   .catch(error => console.log("error:", error))
  //   console.log("Checked for docs!")
  // }

  return (
    <section className="w-full min-h-screen relative box-border">
      <div className="fixed top-0 left-0 w-max">
        <Sidenav />
      </div>

      <div className="board ml-auto flex-grow z-10">
        <div className="py-5 px-10 border-b-2 text-right">
          {/*Replace Username placeholder with actual first name */}
          <h3 className="font-bold text-lg">Welcome, Username!</h3>
          {/* {user.firstname} */}
        </div>

        {/* Heading */}
        <h2 className="text-4xl text-blue-gray-800 font-bold my-5 mx-4">Upload documents</h2>
        
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

        </div>

        <div className="available-docs mx-4 py-4 overflow-auto">
          <h2 className="text-4xl text-blue-gray-800 font-bold my-5">Available documents</h2>
          

          {areDocsAvailable ? 
          <div className="border-blue-gray-100 border-[1px] rounded-2xl overflow-hidden border-separate my-5"><DisplayDocs isDocs={areDocsAvailable}/></div> : 

          <div>
            <p>No documents currently available!</p>  
          </div>
          }
        </div>
      </div>

    </section>
  );
};

export default UserDash;