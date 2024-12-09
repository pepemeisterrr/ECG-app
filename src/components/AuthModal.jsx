import ReactDOM from "react-dom";

export function AuthModal({ onClose, children }) {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative bg-white rounded-md p-4 shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ×
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root") // Убедитесь, что у вас есть элемент <div id="modal-root"></div> в HTML.
  );
}
