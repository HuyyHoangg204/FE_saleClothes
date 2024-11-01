function BreadCrumb({ breadcrumb }) {
  return (
    <div className="flex px-[112px] mt-3 items-center">
      {breadcrumb.map((item, index) => (
        <div className="">
          <span className="font-sans font-light text-[14px]" key={index}>
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
