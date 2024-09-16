import useFirestore from "../../hooks/useFirestore";
import { motion } from "framer-motion";
import "./image_grid.css";

const ImageGrid = ({ setSelectedImg }) => {
  const { docs: images, isLoading } = useFirestore("images");

  if (isLoading) {
    return <div className="loading-spinner" />;
  }

  return images.length ? (
    <div className="img-grid">
      {images.map((img, index) => (
        <motion.div
          className="img-wrap"
          key={index}
          onClick={() => setSelectedImg(img.url)}
          whileHover={{ opacity: 1 }}
          layout
        >
          <motion.img
            src={img.url}
            alt="uploaded image"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          />
        </motion.div>
      ))}
    </div>
  ) : (
    <h1>No images found, please upload some</h1>
  );
};

export default ImageGrid;
