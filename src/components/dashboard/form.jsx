import { useState, useEffect } from "react"
import { MdCloudUpload } from "react-icons/md";
import { Button } from "@material-tailwind/react";
import Dropdown from "../dropdown/Dropdown";
import endpoint from "../../assets/endpoint.json"

const url = endpoint.url

export default function Form({setDocAvailability, setDocs, docs, areDocsAvailable}){
  const [department, setDepartment] = useState("")
  const [allDept, setAllDept] = useState([])
  const [category, setCategory] = useState("")
  const [allCategories, setAllCategories] = useState([])
  const [users, setUsers] = useState([])

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

          console.log(data)
    
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
        }
        else{
          setDocAvailability(false)
          setDocs([])
        }
        console.log("Checked for docs!")
        console.log("Are docs available:", areDocsAvailable)
    }

  const getDepartments = async () => {
    console.log("Let's go")
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }

    let response = await fetch(`${url}/departments`, requestOptions)
    try{
      if (response.status === 200){
        let data = await response.json()
        console.log("My depts:",data.departments)
        setAllDept(data.departments)
      }
      else{
        console.log("Status:", response.status)
        console.log(response)
      }
    }
    catch(error){
      console.log("Error:", error)
    }
  }

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
        console.log(data.users)
      }
      else{
        console.log("Response:", response)
        setUsers([])
      }
    }
    catch(error){console.log("error:", error)}

    console.log("Successfully gotten users!")
  }
    
  useEffect(() => {
    checkForDocs()
    getDepartments()
    getRegisteredUsers()
    users.forEach(user => {user.name = `${user.firstName},${user.lastName.toUpperCase()}`})
    setUsers(users)
  }, [])

    return(
        <>
        <h2 className="text-4xl text-blue-gray-800 font-bold my-5 mx-4">Upload documents</h2>
        
        <form onSubmit={onsubmit}>
          <h3 className="text-2xl text-center text-blue-gray-800 font-bold my-3 mx-4">Select file to upload</h3>
          <div className="mx-auto my-2 p-5 max-w-sm hover:cursor-pointer">
            <div
            onClick={() => {document.getElementById("doc").click()}}
            className="w-full aspect-square border-2 border-dashed border-[#1475cf] flex flex-col justify-center items-center">

              <MdCloudUpload color='#1475cf' size={100} />
              <label htmlFor="doc" className="text-black text-xl">Select file</label>
              <input className="hidden" id="doc" name="doc" type="file"
              onInput={onInputFile}/>

              <p className="filename my-4 px-2 text-center text-gray-500 w-full overflow-hidden text-ellipsis">No file chosen</p>
            </div>
          </div>

          <div className="mx-auto my-3 max-w-sm">
            <p className="my-2 text-blue-gray-800 font-bold">Assign to department:</p>
            <Dropdown label="Department" choices={allDept} setChoice={setDepartment}/>
          </div>

          <div className="mx-auto my-3 max-w-sm">
            <p className="my-2 text-blue-gray-800 font-bold">Category:</p>
            <Dropdown label="Category" choices={[{"name": "Assignment", "_id": "9983475"}]} setChoice={setCategory}/>
          </div>

          <h3 className="text-2xl text-center text-blue-gray-800 font-bold my-5 mx-4">Permissions</h3>

          <h4 className="text-xl text-blue-gray-800 font-bold my-5 px-4 max-w-5xl sm:m-auto">Department Permissions:</h4>
          <Permission label="Department" targets={allDept}/>

          <h4 className="text-xl text-blue-gray-800 font-bold my-5 px-4 max-w-5xl sm:m-auto">User Permissions:</h4>
          <Permission label="Department" targets={users}/>

          

          <Button className="mt-10 mx-auto max-w-sm" fullWidth type="submit">Upload</Button>
        </form>
        </>
    )
}

function Permission({label, targets, setPermissions}){
  useEffect(() => console.log("targets:",targets), [])
  return(
    <>
    <div className="m-auto my-4 max-w-5xl">
      <div className="mx-4 border-blue-gray-100 border-2 border-separate rounded-2xl overflow-hidden">
        <table className="m-auto w-full max-w-5xl">
          <thead>
            <tr className="bg-blue-gray-50 border-blue-gray-100 border-b-[1px] text-blue-gray-600 font-bold text-center">
              <td className="p-3">{label}</td>
              <td className="p-3">Forbidden</td>
              <td className="p-3">Read</td>
              <td className="p-3">Write</td>
              <td className="p-3">Admin</td>
            </tr>
          </thead>
          
          <tbody>
            {targets.map(target => 
              <tr className="border-b-[1px] border-blue-gray-100 text-center" key={target.createdAt}>
                <td className="p-3">{target.name}</td>
                <td className="p-3"><input name={target.name} className="w-full hover:cursor-pointer" type="radio"/></td>
                <td className="p-3"><input name={target.name} className="w-full hover:cursor-pointer" type="radio"/></td>
                <td className="p-3"><input name={target.name} className="w-full hover:cursor-pointer" type="radio"/></td>
                <td className="p-3"><input name={target.name} className="w-full hover:cursor-pointer" type="radio"/></td>
              </tr>
              
            )}
          </tbody>
        </table>
      </div>
    </div>
    </>
  )
}