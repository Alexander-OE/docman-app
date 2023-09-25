import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "../../components/loader/Loader";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import endpoint from "../../assets/endpoint.json"

const url = endpoint.url

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const loginBtn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const userDetails = {
      email: email,
      password: password,
    };

    try {
      // Make a POST request to your authentication API endpoint.
      const response = await axios.post(
        `${url}/auth/users/login`,
        userDetails
      );

      // Assuming your API returns a token upon successful login.

      const accessToken = response.data.accessToken;
      const docs = response.data.documents
      const firstname = response.data.firstName
      const email = response.data.email



      console.log(response);
      console.log("This is the token: " + accessToken);

      // Save the token in your authentication context or state.
      // This may vary depending on your authentication logic.
      // For example, if you're using a context-based authentication:

      login(response.data);

      // Redirect the user to the user dashboard or any desired route.

      // const accessToken = response.data.accessToken;

      if (!accessToken) {
        alert("Unable to login. Please try after some time.");
        return;
      }
      sessionStorage.clear()
      sessionStorage.setItem("docs", JSON.stringify(docs))

      setTimeout(() => {
        navigate("/user");
      }, 500);
      // navigate("/user");
    } catch (error) {
      // Handle any network or request errors.
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10" onSubmit={loginBtn}>
      {isLoading ? (
        <Loader />
      ) : (
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            Sign In
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Enter your details to Login.
          </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-4 flex flex-col gap-6">
              <Input
                size="lg"
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                size="lg"
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Checkbox
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center font-normal"
                >
                  I agree the
                  <a
                    href="#"
                    className="font-medium transition-colors hover:text-gray-900"
                  >
                    &nbsp;Terms and Conditions
                  </a>
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            />
            <Button className="mt-6" fullWidth type="submit">
              Login
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Don't an account?{" "}
              <Link to={"/register"} className="font-medium text-gray-900">
                {" "}
                Sign Up{" "}
              </Link>
            </Typography>
          </form>
        </Card>
      )}
    </div>
  );
}
