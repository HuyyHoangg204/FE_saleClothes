import '../css/sortProduct.css'

function SortProduct() {
  return <div className="flex flex-col w-[240px] absolute z-10 bg-white border rounded-md space-y-2 px-4 py-2 top-[240px] right-[112px] slide-down">
    <div className="font-sans opacity-80 hover:opacity-100 hover:font-semibold cursor-pointer py-1">Mặc định</div>
    <div className="font-sans opacity-80 hover:opacity-100 hover:font-semibold cursor-pointer py-1">Mới nhất</div>
    <div className="font-sans opacity-80 hover:opacity-100 hover:font-semibold cursor-pointer py-1">Giá: cao đến thấp</div>
    <div className="font-sans opacity-80 hover:opacity-100 hover:font-semibold cursor-pointer py-1">Giá: thấp đến cao</div>
  </div>;
}

export default SortProduct;
