import { useNavigate } from "react-router-dom";

//Logs out the users, clears username, token and version then navigates to the starting page

function  LogOutBtn({ setLoggedIn, setUsername }){
const navigate = useNavigate();

      const handleLogout = () => {
          
          setLoggedIn(false);
          setUsername("");
          sessionStorage.removeItem("Token"); 
          localStorage.removeItem("username");
          sessionStorage.removeItem("version");
          navigate("/");
        };

    return <button onClick={handleLogout}>Logout</button>
  }


  export default LogOutBtn;