import { Sidebar } from "../../components/navbar/Navbar";
import { useAuth } from "../context/AuthContext";
import DisplayPdf from "./DisplayPdf";

const User = () => {
  const { user } = useAuth();
  return (
    <section>
      <div>
        <Sidebar />
      </div>
      <div className=" ">
        <div className="flex justify-end ml-[20rem] mr-10 pr-12 rounded  mt-6 border-2 border-solid border-gray-200 max-W-[200px] ">
          {/* {user.firstname} */}
          <h2>Username: <span>John legend</span> </h2>
        </div>
      </div>
      <div>
        <DisplayPdf />
      </div>
    </section>
  );
};

export default User;
