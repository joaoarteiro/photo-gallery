import { useState } from "react";
import { Header, ProgressBar, ImageGrid, Modal } from "..";
import useAuth from "../../hooks/useAuth";
import "./home_page.css";

const HomePage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const { user } = useAuth();
  localStorage.setItem("authenticatedUser", user?.email!);
  const isGuestUser = user?.isAnonymous;

  const validTypes = ["image/png", "image/jpeg", "image/jpg"];

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let selected = e.target.files?.[0];

    if (selected && validTypes.includes(selected.type)) {
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError("Please select an image file (png or jpeg)");
    }
  };

  return (
    <div className="page-container">
      <Header />
      <h2>Iceland</h2>
      <form className="upload-form">
        {!isGuestUser && (
          <>
            <label>
              <input
                onChange={changeHandler}
                type="file"
                accept=".png,.jpeg,.jpg"
              />
              <span>+</span>
            </label>
            <div className="output">
              {error && <div className="error-message"> {error}</div>}
              {file && <ProgressBar file={file} setFile={setFile} />}
            </div>
          </>
        )}
        <ImageGrid setSelectedImg={setSelectedImg} />
        {selectedImg && (
          <Modal image={selectedImg} setSelectedImg={setSelectedImg} />
        )}
      </form>
    </div>
  );
};

export default HomePage;
