import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProgressBar from "../ProgressBar/ProgressBar";
import useStorage from "../../hooks/useStorage";

import "./home_page.css";

const HomePage = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const validTypes = ["image/png", "image/jpeg", "image/jpg"];

  const changeHandler = (e) => {
    let selected = e.target.files[0];

    if (selected && validTypes.includes(selected.type)) {
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError("Please select an image file (png or jpeg");
    }
  };

  return (
    <div className="something">
      <h1>Photo Gallery</h1>
      <form>
        <label>
          <input
            onChange={changeHandler}
            type="file"
            accept=".png,.jpeg,.jpg"
          />
          <span>+</span>
        </label>
        {error && <div className="error-message"> {error}</div>}
        {file && <div> {file.name}</div>}
        {file && <ProgressBar file={file} setFile={setFile} />}
      </form>

      <Link to="/login">Login</Link>
    </div>
  );
};

export default HomePage;
