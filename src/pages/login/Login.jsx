import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const loginBtn = async () => {
    const userDetails = {
      email,
      password,
    };

    try {
      // Make a POST request to your authentication API endpoint.
      const response = await axios.post(
        "https://api.example.com/login",
        userDetails
      );

      // Assuming your API returns a token upon successful login.
      // const { token } = response.data;

      if (response.status === 200) {
        // Save the token in your authentication context or state.
        // This may vary depending on your authentication logic.
        // For example, if you're using a context-based authentication:

        // login(token);

        // Redirect the user to the user dashboard or any desired route.

        const token = response.token;
        if (!token) {
          alert("Unable to login. Please try after some time.");
          return;
        }
        localStorage.clear();
        localStorage.setItem("user-token", token);

        setTimeout(() => {
          navigate('/user');
      }, 500);
        // navigate("/user");
      } else {
        // Handle authentication failure, e.g., show an error message.
        console.log("Login failed");
      }
    } catch (error) {
      // Handle any network or request errors.
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10" onSubmit={loginBtn}>
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
          <Button className="mt-6" fullWidth>
            Login
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <Link to={"/"} className="font-medium text-gray-900">
              {" "}
              Sign Up{" "}
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
