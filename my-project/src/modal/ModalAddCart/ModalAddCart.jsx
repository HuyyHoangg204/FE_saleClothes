import "./ModalAddCart.css"


function ModalAddCart({ showModalAddCard, listSize }) {
    // Danh sách tất cả các size có thể có
    const allSizes = ["S", "M", "L", "XL", "XXL"];
  
    return (
      <div
        className={`z-5 w-[132px] bg-white absolute bottom-12 right-0 shadow-lg border ${
          showModalAddCard ? "slide-up" : "slide-down"
        }`}
      >
        <div className="flex flex-col w-full items-center justify-center font-sans">
          {allSizes.map((size) => {
            // Kiểm tra xem size có tồn tại trong listSize hay không
            const isSizeAvailable = listSize.includes(size);
  
            return (
              <button
                key={size}
                className={`w-full py-2 ${
                  isSizeAvailable
                    ? "hover:bg-slate-300" // Cho phép hover nếu size có sẵn
                    : "opacity-50 cursor-not-allowed" // Làm mờ và vô hiệu hóa hover nếu size không có sẵn
                }`}
                disabled={!isSizeAvailable} // Vô hiệu hóa nút nếu size không có sẵn
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

export default ModalAddCart;
