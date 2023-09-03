import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();

  const registerBtn = async () => {
    const userDetails = {
      firstname,
      lastname,
      Email,
      Password,
    };
    try {
      // Make a POST request to your authentication API endpoint.
      const response = await axios.post('https://api.example.com/login', userDetails);

      if (response.status === 200) {
        // Save the token in your authentication context or state.
        // This may vary depending on your authentication logic.
        // For example, if you're using a context-based authentication:

        // login(token);

        // Redirect the user to the user dashboard or any desired route.
        navigate('/signin');
      } else {
        // Handle authentication failure, e.g., show an error message.
        console.log('Login failed');
      }
    } catch (error) {
      // Handle any network or request errors.
      console.error('Login error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to register.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={registerBtn}>
          <div className="mb-4 flex flex-col gap-6">
            <Input size="lg" label="First Name" onChange={(e) => setFirstname(e.target.value)} />
            <Input size="lg" label="Last Name" onChange={(e) => setLastname(e.target.value)} />
            <Input size="lg" label="Email" onChange={(e) => setEmail(e.target.value)} />
            <Input type="password" size="lg" label="Password" onChange={(e) => setPassword(e.target.value)} />
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
            Register
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <Link to={"/signin"} className="font-medium text-gray-900">
              {" "}
              Sign In{" "}
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
