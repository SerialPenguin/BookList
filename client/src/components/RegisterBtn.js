import { useNavigate } from "react-router-dom";
import "../stylesheet/pages/_loginForm.scss"

//Navigates to /auth/register when clicking the button "Register"
function RegisterBtn (){
const navigate = useNavigate();

const handleRegister = () => {
    navigate("/auth/register")

  }
  return <button className="register-button" onClick={handleRegister}>Register</button>
};
  export default RegisterBtn;