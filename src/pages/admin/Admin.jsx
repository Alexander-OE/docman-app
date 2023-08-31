import { Dashboard } from "../../components/dashboard/dashboard";
import { Sidebar } from "../../components/navbar/Navbar";
import Uploader from "../../components/uploader/Uploader";

const Admin = () => {
  return (
    <section>
      <div>
        <Sidebar />
      </div>
      <div>
        <Uploader />
      </div>
      <div>
        <Dashboard />
      </div>
    </section>
  );
};

export default Admin;
