import { useState, useEffect } from "react"

export default function Permission({label, targets, setPermissions}){
    const [perms, setPerms] = useState({admin: [], read: [], write: [], forbidden: []})

    const changePerm = (email, perm) => {
        switch(perm){
            case "admin": setPerms(prev => ({
                read: prev.read.filter(e => e !== email),
                write: prev.write.filter(e => e !== email),
                forbidden: prev.forbidden.filter(e => e !== email),
                admin: [...prev.admin, email]
            }))
            break;

            case "read": setPerms(prev => ({
                read: [...prev.read, email],
                write: prev.write.filter(e => e !== email),
                forbidden: prev.forbidden.filter(e => e !== email),
                admin: prev.admin.filter(e => e !== email)
            }))
            break;

            case "write": setPerms(prev => ({
                read: prev.read.filter(e => e !== email),
                write: [...prev.write, email],
                forbidden: prev.forbidden.filter(e => e !== email),
                admin: prev.admin.filter(e => e !== email)
            }))
            break;

            case "forbidden": setPerms(prev => ({
                read: prev.read.filter(e => e !== email),
                write: prev.write.filter(e => e !== email),
                forbidden: [...prev.forbidden, email],
                admin: prev.admin.filter(e => e !== email)
            }))
            break;

            default: throw "Invalid permission given"
        }
        console.log(perms)
        setPermissions(perms)
    }
    useEffect(() => console.log("targets:",targets), [targets])
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
                  <td className="p-3"><input onChange={() => {changePerm(target.email, "forbidden")}} name={target.email || target.name} className="w-full hover:cursor-pointer" type="radio"/></td>
                  <td className="p-3"><input onChange={() => {changePerm(target.email, "read")}} name={target.email || target.name} className="w-full hover:cursor-pointer" type="radio"/></td>
                  <td className="p-3"><input onChange={() => {changePerm(target.email, "write")}} name={target.email || target.name} className="w-full hover:cursor-pointer" type="radio"/></td>
                  <td className="p-3"><input onChange={() => {changePerm(target.email, "admin")}} name={target.email || target.name} className="w-full hover:cursor-pointer" type="radio"/></td>
                </tr>
                
              )}
            </tbody>
          </table>
        </div>
      </div>
      </>
    )
  }