import "./modal.css";

const Modal = ({ image, setSelectedImg }) => {
  const handleCloseModal = () => {
    setSelectedImg(null);
  };

  return (
    <div className="backdrop" onClick={handleCloseModal}>
      <img src={image} alt="enlarged pic" />
    </div>
  );
};

export default Modal;
