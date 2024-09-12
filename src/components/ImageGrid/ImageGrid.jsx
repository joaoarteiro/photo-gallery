import useFirestore from "../../hooks/useFirestore";
import "./image_grid.css";

const ImageGrid = ({ setSelectedImg }) => {
  const { docs: images, isLoading } = useFirestore("images");

  if (isLoading) {
    return <div className="loading-spinner" />;
  }

  return images.length ? (
    <div className="img-grid">
      {images.map((img, index) => (
        <div
          className="img-wrap"
          key={index}
          onClick={() => setSelectedImg(img.url)}
        >
          <img src={img.url} alt="uploaded image" />
        </div>
      ))}
    </div>
  ) : (
    <h1>No images found, please upload some</h1>
  );
};

export default ImageGrid;
