import '../css/sortProduct.css'

function SortProduct({handleSortProduct}) {
  return <div className="flex flex-col w-[240px] absolute z-10 bg-white border rounded-md space-y-2 px-4 py-2 top-[240px] right-[112px] slide-down">
    <div onClick={() => handleSortProduct(0)} className="font-sans opacity-80 hover:opacity-100 hover:font-semibold cursor-pointer py-1">Mặc định</div>
    <div onClick={() => handleSortProduct(2)} className="font-sans opacity-80 hover:opacity-100 hover:font-semibold cursor-pointer py-1">Giá: cao đến thấp</div>
    <div onClick={() => handleSortProduct(1)} className="font-sans opacity-80 hover:opacity-100 hover:font-semibold cursor-pointer py-1">Giá: thấp đến cao</div>
  </div>;
}

export default SortProduct;
