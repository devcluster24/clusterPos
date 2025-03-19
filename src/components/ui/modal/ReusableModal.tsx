import React from "react";
import { Button, Modal } from "antd";

interface ReusableModalProps {
  title: string;
  content: React.ReactNode;
  visible: boolean;
  onClose: () => void;
  footer?: React.ReactNode;
  showCancelButton?: boolean;
  showConfirmButton?: boolean;
  onConfirm?: () => void;
  className?: string;
  modalWidth?: string;
}

const ReusableModal: React.FC<ReusableModalProps> = ({
  title,
  content,
  visible,
  onClose,
  onConfirm,
  footer,
  showCancelButton = false,
  showConfirmButton = false,
  className,
  modalWidth,
}) => {
  return (
    <Modal
      width={modalWidth}
      open={visible}
      onCancel={onClose}
      footer={footer || false}
      className={` ${className || ""}`}
    >
      {/* title */}
      <div className={` w-full rounded`}>
        <h2 className="text-xl w-full font-semibold text-white bg-blue-500 py-2.5 px-4 ">
          {title}
        </h2>

        {/* content */}
        <div className="text-gray-600 p-4">{content}</div>
      </div>

      {/* cancel btn and confim btn */}
      <div className="flex justify-end gap-2 pr-4">
        {showCancelButton && (
          <Button
            onClick={onClose}
            className="bg-red-500 rounded-lg text-white font-semibold border-red-500"
          >
            Cancel
          </Button>
        )}
        {showConfirmButton && (
          <Button
            type="primary"
            onClick={() => {
              if (onConfirm) onConfirm();
              onClose();
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold"
          >
            Confirm
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default ReusableModal;
