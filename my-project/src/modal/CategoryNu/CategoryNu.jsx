import '~/css/header.css';

function CategoryNu() {
  return (
    <div
      style={{ width: "1312px", height: "400px", top: "6rem", left: "50%", transform: "translate(-50%, 0)"}}
      className="top36rem bg-white z-10 border cursor-default flex justify-between px-10 pt-4 fixed rounded-sm shadow font-sans"
    >
      <div className="w-[700px]">
        <div className="flex justify-between ">
          <div >
            <ul >
              <li className="font-semibold pb-2">Áo</li>
              <li className="font-light cursor-pointer hover:font-medium">Áo thun</li>
              <li className="font-light cursor-pointer hover:font-medium">Áo khoác</li>
              <li className="font-light cursor-pointer hover:font-medium">Áo polo</li>
              <li className="font-light cursor-pointer hover:font-medium">Áo sơ mi</li>
              <li className="font-light cursor-pointer hover:font-medium">Áo len</li>
            </ul>
          </div>
          <div>
            <ul>
              <li className="font-semibold pb-2">Quần</li>
              <li className="font-light cursor-pointer hover:font-medium">Quần jean</li>
              <li className="font-light cursor-pointer hover:font-medium">Quần short</li>
              <li className="font-light cursor-pointer hover:font-medium">Quần dài</li>
              <li className="font-light cursor-pointer hover:font-medium">Quần kaki</li>
              <li className="font-light cursor-pointer hover:font-medium">Quần thể thao</li>
              <li className="font-light cursor-pointer hover:font-medium">Quần âu</li>
            </ul>
          </div>
          <div>
            <ul>
              <li className="font-semibold pb-2">Giày</li>
              <li className="font-light cursor-pointer hover:font-medium">Giày sneaker</li>
              <li className="font-light cursor-pointer hover:font-medium">Giày boot nam</li>
              <li className="font-light cursor-pointer hover:font-medium">Giày da</li>
              <li className="font-light cursor-pointer hover:font-medium">Giày đế bệt</li>
              <li className="font-light cursor-pointer hover:font-medium">Giày derby</li>
              <li className="font-light cursor-pointer hover:font-medium">Giày oxford</li>
            </ul>
          </div>
          <div>
            <ul>
              <li className="font-semibold pb-2">Phụ kiện</li>
              <li className="font-light cursor-pointer hover:font-medium">Thắt lưng</li>
              <li className="font-light cursor-pointer hover:font-medium">Túi đeo</li>
              <li className="font-light cursor-pointer hover:font-medium">Mũ nam</li>
              <li className="font-light cursor-pointer hover:font-medium">Cà vạt</li>
            </ul>
          </div>
        </div>
        <div className="flex justify-between pt-6">
          <div>
            <ul>
              <li className="font-semibold pb-2">Áo khoác</li>
              <li className="font-light cursor-pointer hover:font-medium">Măng tô</li>
              <li className="font-light cursor-pointer hover:font-medium">Hoodie</li>
              <li className="font-light cursor-pointer hover:font-medium">Áo khoác dù</li>
              <li className="font-light cursor-pointer hover:font-medium">Áo dạ</li>
            </ul>
          </div>
          <div>
            <ul>
              <li className="font-semibold pb-2">Chân váy</li>
              <li className="font-light cursor-pointer hover:font-medium">Chân váy jean</li>
              <li className="font-light cursor-pointer hover:font-medium">Chân váy chữ A</li>
              <li className="font-light cursor-pointer hover:font-medium">Chân váy bút chì</li>
              <li className="font-light cursor-pointer hover:font-medium">Chân váy xòe</li>
            </ul>
          </div>
          <div>
            <ul>
              <li className="font-semibold pb-2">Đầm/Áo dài</li>
              <li className="font-light cursor-pointer hover:font-medium">Áo dài</li>
              <li className="font-light cursor-pointer hover:font-medium">Đầm công sở</li>
              <li className="font-light cursor-pointer hover:font-medium">Váy đầm</li>
            </ul>
          </div>
          <div>
            <ul>
              <li className="font-semibold pb-2">Set bộ</li>
              <li className="font-light cursor-pointer hover:font-medium">Set bộ công sở</li>
              <li className="font-light cursor-pointer hover:font-medium">Set bộ mùa đông</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex justify-around space-x-3">
        
        <img className="object-cover w-[201px] h-[267px]" src="/images/maunu1.webp" alt="" />
        <img className="object-cover w-[201px] h-[267px]" src="/images/maunu2.webp" alt="" />
        
      </div>
    </div>
  );
}

export default CategoryNu;
