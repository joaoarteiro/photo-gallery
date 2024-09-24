import { auth } from "../../firebase/config";
import { signOut } from "firebase/auth";

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
    <div className="header-container">
      <h1>Firegram</h1>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default Header;
