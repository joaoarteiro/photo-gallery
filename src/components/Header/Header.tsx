import { auth } from "../../firebase/config";
import { signOut } from "firebase/auth";
import "./header.css";

const Header = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("authenticatedUser");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <header>
      <h1>Snapvault</h1>
      <button onClick={handleLogout}>Log Out</button>
    </header>
  );
};

export default Header;
