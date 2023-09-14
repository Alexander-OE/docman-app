import { useState, useEffect } from "react"
import { MdCloudUpload } from "react-icons/md";
import { Button } from "@material-tailwind/react";
import endpoint from "../../assets/endpoint.json"

const url = endpoint.url

export default function Form({setDocAvailability, setDocs, docs, areDocsAvailable}){
    const onInputFile = () => {
        const file = document.querySelector("#doc").value.split("\\")
        const name = file[file.length - 1]
        document.querySelector(".filename").innerHTML = name? name: "No file chosen"
    }

    const getDocs = async () => {
        let requestOptions = {
          method: "GET",
          redirect: "follow",
          headers: {
            authorization: localStorage.getItem("user-token")
          }
        }
        let response = await fetch(`${url}/getAllDocs`, requestOptions)
        if (response.status === 201){
          let data = await response.json()
          localStorage.setItem("docs", JSON.stringify(data.Documents))
          checkForDocs()
        }
    
    }

    const onsubmit = async (event) => {
        event.preventDefault()
        const filename = document.querySelector(".filename").innerHTML
        console.log(filename)
    
        if (filename == "No file chosen"){
          console.log("Select valid file")
        }
    
        else{
          document.querySelector(".loading").classList.remove("hidden")
          console.log('token:',localStorage.getItem('user-token'))
        //   console.log(user.email)
    
          const fileInput = document.getElementById("doc")
          const file = fileInput.files[0]
    
          let data = new FormData();
          data.append('file', file, "[PROXY]");
          data.append('writeAccess[]', `${localStorage.getItem("email")}`);
          data.append('readAccess[]', `${localStorage.getItem("email")}`);
          data.append('deleteAccess[]', `${localStorage.getItem("email")}`);
          data.append('name', `${filename}`);
          data.append('writeAccess[]', `${localStorage.getItem("email")}`);
          data.append('readAccess[]', `${localStorage.getItem("email")}`);
    
          let requestOptions = {
            method: 'POST',
            body: data,
            redirect: 'follow',
            headers: {
              authorization: `Bearer ${localStorage.getItem("user-token")} backend`
            }
          };
    
          try{
            let response = await fetch(`${url}/upload`, requestOptions)
            if (response.status == 201){
              alert("Uploaded successfully")
              document.getElementById("doc").value = null
              onInputFile()
              getDocs()
            }
    
            else if (response.status == 401){
              const data = await response.json()
              console.log("401-message:", data.message)
            }

            else if (response.status == 403){
              alert("Not an admin, cannot upload documents")
            }
            
            else if (response.status == 503){
                alert("Service unavailable, try again later!")
            }

            else{
              alert("Upload failed. Try again")
            }
    
          }
          catch (error) {
            console.log("error:", error)
            alert("Something went wrong. Contact our support or try again later!")
        }
          finally{
            console.log("Done!")
            document.querySelector(".loading").classList.add("hidden")
          }
    
        }
    }

    const checkForDocs = () => {
        let documents = JSON.parse(localStorage.getItem("docs"))
        if (documents.length > 1){
          setDocAvailability(true)
          setDocs(documents)
          console.log("DOCUMENTS!", docs)
        }
        else{
          setDocAvailability(false)
          setDocs([])
        }
        console.log("Checked for docs!")
        console.log("Are docs available:", areDocsAvailable)
    }
    
    useEffect(() => checkForDocs, [])

    return(
        <>
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
        </>
    )
}