import { motion } from "framer-motion";
import "./modal.css";

const Modal = ({ image, setSelectedImg }) => {
  const handleCloseModal = () => {
    setSelectedImg(null);
  };

  return (
    <motion.div
      className="backdrop"
      onClick={handleCloseModal}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <img src={image} alt="enlarged pic" />
    </motion.div>
  );
};

export default Modal;
