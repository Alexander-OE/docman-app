import { useState, useEffect } from "react"
import { useAuth } from "../../pages/context/AuthContext"

export default function Permission({label, targets, setPermissions, exception}){
  const {user} = useAuth()
    const [perms, setPerms] = useState({read: [], write: [], forbidden: [], delete:[]})

    const filters = (e) => {
      if (exception){
        return e.name !== exception
      }
      else{
        return e.email !== user.email
      }
    }

    const changePerm = (email, perm) => {
        switch(perm){

            case "read": setPerms(prev => ({
                read: [...prev.read, email],
                write: prev.write.filter(e => e !== email),
                forbidden: prev.forbidden.filter(e => e !== email),
                delete: prev.delete.filter(e => e !== email)
            }))
            break;

            case "write": setPerms(prev => ({
                read: prev.read.filter(e => e !== email),
                write: [...prev.write, email],
                forbidden: prev.forbidden.filter(e => e !== email),
                delete: prev.delete.filter(e => e !== email)
            }))
            break;

            case "forbidden": setPerms(prev => ({
                read: prev.read.filter(e => e !== email),
                write: prev.write.filter(e => e !== email),
                forbidden: [...prev.forbidden, email],
                delete: prev.delete.filter(e => e !== email)
            }))
            break;

            case "delete": setPerms(prev => ({
              read: prev.read.filter(e => e !== email),
              write: prev.write.filter(e => e !== email),
              forbidden: prev.forbidden.filter(e => e !== email),
              delete: [...prev.delete, email]
          }))
          break;

            default: throw "Invalid permission given"
        }
        console.log(perms)
        setPermissions(perms)
    }
    useEffect(()=> {
      console.log(targets)
    }, [])
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
                <td className="p-3">Delete</td>
              </tr>
            </thead>
            
            <tbody>
              {targets.filter(filters).map(target => 
                <tr className="border-b-[1px] border-blue-gray-100 text-center" key={target._id}>
                  <td className="p-3">{target.name}</td>
                  <td className="p-3"><input onChange={() => {changePerm(target.email||target.name, "forbidden")}} name={target.email || target.name} className="w-full hover:cursor-pointer" type="radio"/></td>
                  <td className="p-3"><input onChange={() => {changePerm(target.email||target.name, "read")}} name={target.email || target.name} className="w-full hover:cursor-pointer" type="radio" checked/></td>
                  <td className="p-3"><input onChange={() => {changePerm(target.email||target.name, "write")}} name={target.email || target.name} className="w-full hover:cursor-pointer" type="radio"/></td>
                  <td className="p-3"><input onChange={() => {changePerm(target.email||target.name, "delete")}} name={target.email || target.name} className="w-full hover:cursor-pointer" type="radio"/></td>
                </tr>
                
              )}
            </tbody>
          </table>
        </div>
      </div>
      </>
    )
  }