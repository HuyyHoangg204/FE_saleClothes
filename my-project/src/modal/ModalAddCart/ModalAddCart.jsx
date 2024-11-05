import "./ModalAddCart.css"


function ModalAddCart({showModalAddCard}) {
    return (
        <div  className={`z-5 w-[132px]  bg-white absolute bottom-12 left-0 border ${showModalAddCard ? "slide-up" : "slide-down"}`}>
            <div className="flex flex-col w-full items-center justify-center font-sans">
                <button className="w-full py-2 hover:bg-slate-300">S</button>
                <button className="w-full py-2 hover:bg-slate-300">M</button>
                <button className="w-full py-2 hover:bg-slate-300">L</button>
                <button className="w-full py-2 hover:bg-slate-300">XL</button>
                <button className="w-full py-2 hover:bg-slate-300">XXL</button>
            </div>
        </div>
    );
}

export default ModalAddCart;
