function Voucher({ten,noidung,hsd}) {
  return (
    <div className="relative w-[402px] h-[152px] border rounded-md border-slate-300 bg-slate-50 flex justify-between items-center">
        <div className="z-1 w-5 h-2.5 rounded-b-full  absolute top-[-1px] right-[118px] bg-white border-b border-slate-300 shadow-md"></div>
        <div className="z-1 w-5 h-2.5 rounded-t-full  absolute bottom-[-1px] right-[118px] bg-white border-t border-slate-300 shadow-[0_-1px_2px_rgba(0,0,0,0.2)]"></div>
      <div className="flex flex-col p-4 w-3/4">
        <div className="flex flex-col mb-8">
          <span className="font-sans font-semibold text-xl">{ten}</span>
          <span className="font-light text-s">{noidung}</span>
        </div>
        <div className="flex space-x-8 items-center">
          <span className="font-sans font-light text-xs">HSD: {hsd}</span>
          <span className="font-sans font-semibold text-xs cursor-pointer">Điều kiện</span>
        </div>
      </div>
      <div className="mr-4">
        <button className="bg-red-500 text-white py-2 px-6 font-sans font-medium">Lưu</button>
      </div>
    </div>
  );
}

export default Voucher;
