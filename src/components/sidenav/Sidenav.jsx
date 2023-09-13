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

export function Sidenav() {
  const navigate = useNavigate();

  const logOutBtn = () => {
    localStorage.removeItem("user-token");
    navigate("/signin");
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
          Dashboard
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
