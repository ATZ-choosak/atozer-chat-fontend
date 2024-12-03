import clsx from "clsx";
import React from "react";

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

function Modal({ children, isOpen, onClose }: ModalProps): React.ReactElement {
  return (
    <div
      onClick={onClose}
      className={clsx(
        isOpen
          ? "bg-opacity-60 pointer-events-auto"
          : "bg-opacity-0 pointer-events-none",

        "w-full h-full fixed left-0 top-0 bg-black duration-200 ease-in-out z-10"
      )}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={clsx(
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
          "flex items-center justify-center w-full h-full"
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
