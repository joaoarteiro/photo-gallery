import { useEffect } from "react";
import useStorage from "../../hooks/useStorage";
import "./progress_bar.css";

type ProgressBarProps = {
  file: File;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
};

const ProgressBar = ({ file, setFile }: ProgressBarProps) => {
  const { progress, url } = useStorage(file);

  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]);

  return <div className="progress-bar" style={{ width: progress + "%" }}></div>;
};

export default ProgressBar;
