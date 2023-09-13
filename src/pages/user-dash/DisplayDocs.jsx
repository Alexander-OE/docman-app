import DisplayPdf from "./DisplayPdf"
import { useState } from "react"
import test from './test.json'
import "./Userdash.css"

export default function DisplayDocs({isDocs, docs}){
    const [path, setPath] = useState("https://google.com")
    const changePath = (path) => {setPath(path)}
    const Docs = docs? docs : []
    
    return(
        <div>
            <table className="w-full">
                <thead>
                    <tr className="py-3 h-10 bg-blue-gray-50 border-b border-blue-gray-100 text-blue-gray-600">
                        <th className="px-3">Name</th>
                        <th className="px-3">Id</th>
                        <th className="px-3">Date created</th>
                        <th className="w-36 px-3"></th>
                    </tr>
                </thead>

                <tbody>
                {isDocs && Docs.map(doc => 
                    <TableRow key={doc._id} doc={doc} setPath={changePath}/>
                )}
                </tbody>
            </table>

            <div className="fixed hidden top-0 w-full h-screen left-0 docDiv items-center">
                <DisplayPdf url={path}/>
                <div onClick={
                    () => {document.querySelector(".docDiv").classList.add("hidden")}} 
                    className="absolute top-0 left-0 h-full w-full -z-10 black-transparent"></div>
            </div>
        </div>
    )
}

function TableRow({doc, setPath}){
    const display = (path) => {
        setPath(path)
        document.querySelector(".docDiv").classList.remove("hidden")
        document.querySelector(".docDiv").classList.add("flex")
    }
    
    return(
        <tr className="py-3 px-2 h-10 border-b border-blue-gray-100 text-center text-blue-gray-500">
            <td className="overflow-x-hidden px-2">{doc.name}</td>
            <td className="overflow-x-hidden px-2">{doc._id}</td>
            <td className="overflow-x-hidden px-2">{doc.createdAt}</td>
            <td className="overflow-x-hidden px-2"><button onClick={() => {display(doc.path)}}>View</button></td>
        </tr>
    )
}