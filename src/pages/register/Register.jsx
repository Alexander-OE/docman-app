import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import Dropdown from "../../components/dropdown/Dropdown";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Loader from "../../components/loader/Loader";
import endpoint from "../../assets/endpoint.json"

const url = endpoint.url
export function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [allDepartments, setAllDepartments] = useState([])
  const [department, setDepartment] = useState(null)
  const navigate = useNavigate();

  const registerBtn = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const userDetails = {
      firstName: firstname,
      lastName: lastname,
      email: email,
      password: Password,
      phoneNumber: Phone,
      departmentName: department
    };
    // console.log(userDetails);
    try {
      console.log(userDetails)
      const response = await axios.post(
        `${url}/users`,
        userDetails
      );

      if (response.status === 201) {
        navigate("/");
        alert("Account successfully created! ");
      } 
      else {
        console.log("Register failed");
      }
    } catch (error) {
      // Handle any network or request errors.
      console.error("Registration error:", error);
      if (/409/.test(error.message)){
        alert("Choose a valid department!")
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getDepartments = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    }

    try{
      let response = await fetch(`${url}/departments`, requestOptions)
      if (response.status === 200){
        let data = await response.json()
        setAllDepartments(data.departments)
        sessionStorage.setItem("departments", allDepartments)
      }
      else{
        console.log("Response:", response)
        setAllDepartments([])
      }
    }
    catch(error){
      console.log("error:", error)
      setAllDepartments([])
    }
    console.log("All departments:", allDepartments)
  }

  const setDept = (dept) => {
    // let dept = document.getElementById("department").value
    setDepartment(dept)
    console.log("Current dept:", department)
  }

  useEffect(() => {
    getDepartments()
  }, [])

  const no = {name: 'None', value: ""}

  const mockdept = [{name: "Computer Science"}, {name: "Botany"}, {name: "Cybersecurity"}]

  return (
    <div className="flex flex-col items-center mt-10">
      {isLoading ? (
        <Loader />
      ) : (
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            Sign Up
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Enter your details to register.
          </Typography>
          <form
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            onSubmit={registerBtn}
          >
            <div className="mb-4 flex flex-col gap-6">
              <Input
                size="lg"
                label="First Name"
                onChange={(e) => setFirstname(e.target.value)}
              />
              <Input
                size="lg"
                label="Last Name"
                onChange={(e) => setLastname(e.target.value)}
              />
              <Input
                size="lg"
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                size="lg"
                label="Phone Number"
                onChange={(e) => setPhone(e.target.value)}
              />
              {/* <Select
              id="department"
              label="Department"
              value={department}
              onChange={setDept}
              >
                <Option value={no.value}>{no.name}</Option>
                {
                  allDepartments.map(dept => 
                    <Option key={dept._id} value={dept.name}>{dept.name}</Option>  
                  )
                }
              </Select> */}
              <Dropdown label="Department" choices={allDepartments} setChoice={setDepartment}/>
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
              Register
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?{" "}
              <Link to={"/"} className="font-medium text-gray-900">
                {" "}
                Sign In{" "}
              </Link>
            </Typography>
          </form>
        </Card>
      )}
    </div>
  );
}
