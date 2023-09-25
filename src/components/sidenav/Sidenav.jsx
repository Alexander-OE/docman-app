import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../pages/context/AuthContext";

export function Sidenav() {
  const {logout} = useAuth()
  const navigate = useNavigate();

  const logOutBtn = () => {
    sessionStorage.clear();
    logout()
    navigate("/");
  };

  return (
    <Card className="h-screen w-full max-w-[20rem] p-4 shadow-2xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Portal
        </Typography>
      </div>
      <List>
        <ListItem onClick={() => {navigate('/user')}}>
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          Documents
        </ListItem>

        <ListItem onClick={() => {navigate('/admin')}}>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Admin
        </ListItem>

        {/* <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem> */}
        <ListItem onClick={logOutBtn}>
          <ListItemPrefix >
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}
