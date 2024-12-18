import { useState, useEffect } from "react";
import { Header, ProgressBar, ImageGrid, Modal } from "../";
import Footer from "../shared/Footer/Footer";
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

  useEffect(() => {
    console.log(
      "You like to poke around? Find the source code for this project on: https://github.com/joaoarteiro/photo-gallery"
    );
  }, []);

  return (
    <div className="page-container">
      <Header />
      <h2>Iceland</h2>
      {!isGuestUser && (
        <form className="upload-form">
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
        </form>
      )}
      <ImageGrid setSelectedImg={setSelectedImg} />
      {selectedImg && (
        <Modal image={selectedImg} setSelectedImg={setSelectedImg} />
      )}
      <Footer />
    </div>
  );
};

export default HomePage;
