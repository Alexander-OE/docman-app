import { useAuth } from "../../pages/context/AuthContext"

export default function DashboardHead(){
  const {user} = useAuth()
    return(
        <div className="py-5 px-10 border-b-2 text-right flex justify-between items-center">
          <img alt="unilag" src="/unilag.png" width={70}/>
          <h3 className="font-bold text-lg">Welcome, {user.firstName}!</h3>
        </div>
    )
}