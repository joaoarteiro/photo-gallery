import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProgressBar, ImageGrid } from "../../components";

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
      setError("Please select an image file (png or jpeg)");
    }
  };

  return (
    <div className="something">
      <h1>Photo Gallery</h1>
      <Link to="/login">Login</Link>
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
        {file && <ProgressBar file={file} setFile={setFile} />}
        <ImageGrid />
      </form>
    </div>
  );
};

export default HomePage;
