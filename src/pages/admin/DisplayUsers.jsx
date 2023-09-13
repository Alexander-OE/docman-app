
export default function DisplayUsers({users}){
    
    return(
        <div>
            <table className="w-full">
                <thead>
                    <tr className="py-3 h-10 bg-blue-gray-50 border-b border-blue-gray-100 text-blue-gray-600">
                        <th className="px-3">Full Name</th>
                        <th className="px-3">Email</th>
                        <th className="px-3">Phone number</th>
                        {/* <th className="w-36 px-3"></th> */}
                    </tr>
                </thead>

                <tbody>
                {users != null && users.map(user => 
                    <TableRow key={user._id} user={user}/>
                )}
                </tbody>
            </table>
        </div>
    )
}

function TableRow({user}){
    
    return(
        <tr className="py-3 px-2 h-10 border-b border-blue-gray-100 text-center text-blue-gray-500">
            <td className="overflow-x-hidden px-2">{`${user.firstName} ${user.lastName}`}</td>
            <td className="overflow-x-hidden px-2">{user.email}</td>
            <td className="overflow-x-hidden px-2">{user.phoneNumber}</td>
            {/* <td className="overflow-x-hidden px-2"><button onClick={() => {display(doc.path)}}>View</button></td> */}
        </tr>
    )
}