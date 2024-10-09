import useFirestore from "../../hooks/useFirestore";
import { motion } from "framer-motion";
import "./image_grid.css";

type ImageGridProps = {
  setSelectedImg: React.Dispatch<React.SetStateAction<string | null>>;
};

const ImageGrid = ({ setSelectedImg }: ImageGridProps) => {
  const { docs: images, isLoading } = useFirestore("images");

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner --primary" />
      </div>
    );
  }

  return images.length ? (
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
  ) : (
    <h1>No images found, please upload some</h1>
  );
};

export default ImageGrid;
