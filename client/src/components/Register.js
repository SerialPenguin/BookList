import { useNavigate } from "react-router-dom";
import "../stylesheet/pages/_loginForm.scss"


function RegisterBtn (){
const navigate = useNavigate();

const handleRegister = (username) => {
    navigate("/auth/register")

  }
  return <button className="register-button" onClick={handleRegister}>Register</button>
};
  export default RegisterBtn;
