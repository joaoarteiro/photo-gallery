import useFirestore from "../../hooks/useFirestore";
import { motion } from "framer-motion";
import "./image_grid.css";

type ImageGridProps = {
  setSelectedImg: React.Dispatch<React.SetStateAction<string | null>>;
};

const ImageGrid = ({ setSelectedImg }: ImageGridProps) => {
  //values returned from the hook, are treated as props, thus if any value changes, it will trigger a re-render of ImageGrid
  const { docs: images, isLoading } = useFirestore("images");

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner --primary" />
      </div>
    );
  }

  if (!isLoading && images.length === 0) {
    return (
      <div className="no-images-container">
        <h1>This album is empty, please upload some images</h1>
      </div>
    );
  }

  return (
    <div className="img-grid">
      {images.map((img) => (
        <motion.div
          className="img-wrap"
          key={img.id}
          onClick={() => setSelectedImg(img.url)}
          whileHover={{ opacity: 1 }}
          layout
        >
          <motion.img
            src={img.url}
            alt="uploaded image"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default ImageGrid;
