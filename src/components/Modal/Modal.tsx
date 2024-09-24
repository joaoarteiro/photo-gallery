import { motion } from "framer-motion";
import "./modal.css";

type ModalProps = {
  image: string;
  setSelectedImg: React.Dispatch<React.SetStateAction<string | null>>;
};

const Modal = ({ image, setSelectedImg }: ModalProps) => {
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
