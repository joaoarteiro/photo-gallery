import useFirestore from "../../hooks/useFirestore";

const ImageGrid = () => {
  const { docs: images, isLoading } = useFirestore("images");

  if (isLoading) {
    return <div className="loading-spinner"></div>;
  }

  return (
    <div className="img-grid">
      <h3>Image Grid</h3>
    </div>
  );
};

export default ImageGrid;
