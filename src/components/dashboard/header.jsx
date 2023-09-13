export default function DashboardHead(){
    return(
        <div className="py-5 px-10 border-b-2 text-right flex justify-between items-center">
          <img alt="unilag" src="/unilag.png" width={70}/>
          <h3 className="font-bold text-lg">Welcome, {localStorage.getItem("firstname")}!</h3>
        </div>
    )
}