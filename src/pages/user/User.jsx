import { Sidebar } from "../../components/navbar/Navbar";
import { useAuth } from "../context/AuthContext";

const User = () => {
  const { user } = useAuth();
  return (
    <section>
      <div>
        <Sidebar />
      </div>
      <div className=" ">
        <div className="flex justify-end ml-[20rem] mr-10 pr-12  mt-6 border-2 border-solid border-red-500 ">
          {/* {user.firstname} */}
          <h2>yo</h2>
        </div>
      </div>
    </section>
  );
};

export default User;
