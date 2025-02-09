import { useNavigate } from "react-router-dom";

function BreadCrumb({ breadcrumb }) {
  const navigate = useNavigate();

  const hanleClick = (item) => {

    
    if(item === "Trang chủ") {
      navigate("/")
    }
  }

  return (
    <div className="flex px-[112px] mt-3 items-center">
      {breadcrumb.map((item, index) => (
        <div className="">
          <span onClick={() => hanleClick(item)} className="font-sans font-light text-[14px] cursor-pointer" key={index}>
            {item}
          </span>
          <span className="font-sans font-light text-[18px] mx-3">
            {index < breadcrumb.length - 1 && "|"}
          </span>
        </div>
      ))}
    </div>
  );
}

export default BreadCrumb;
