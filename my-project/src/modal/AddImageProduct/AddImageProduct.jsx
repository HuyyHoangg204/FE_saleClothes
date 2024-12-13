import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
function AddImageProduct({ closeAddImage, idImageModal, handleImageProductVariant,imagesProductVariant }) {
    // State variables
    const [images, setImages] = useState([]);

    useEffect(() => {
      const temp = imagesProductVariant.find(images => images.id === idImageModal)
 
      if(temp) {
        setImages(temp.images)
      }
      
    },[])
   
    

    // Handle click change
    const handleChange = () => {
        if(images.length === 0) {
          toast.warn("Bạn chưa chọn ảnh nào!");
          closeAddImage()
        }
        handleImageProductVariant(images);
        toast.success("Sửa ảnh thành công!!!")
        closeAddImage()
    };
    // Handle event onChange images
    const handleImageChange = (e) => {
      
        const files = Array.from(e.target.files); // Lấy danh sách file từ input
       
        const newImages = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file), // Tạo preview URL cho ảnh
        }));

        setImages((prevImages) => [...prevImages, ...newImages]); // Thêm ảnh mới vào state
        
    };
    const handleRemoveImage = (index) => {
        setImages((prev) => prev.filter((_, i) => i !== index)); // Xóa ảnh theo index
    };

    return (
        <div onClick={(e) => e.stopPropagation()} className="w-[380px] h-full bg-white absolute right-0 p-4">
            <div className="flex justify-between font-sans font-medium text-[20px]">
                <span>Ảnh sản phẩm</span>
                <CloseIcon onClick={() => closeAddImage()} className="cursor-pointer" />
            </div>
            <div className="flex mt-6 gap-4 flex-wrap">
                {images.map((img, index) => (
                    <div key={index} className="flex relative">
                        <img
                            className="w-[100px] h-[100px] object-cover rounded-md"
                            src={img.preview}
                            alt={`Image ${index}`}
                        />
                        <CloseIcon
                            className="absolute -top-2 -right-2 text-red-600 bg-white rounded-full cursor-pointer"
                            onClick={() => handleRemoveImage(index)}
                        />
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-center w-full mt-4">
                <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-30 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                            aria-hidden="true"
                            className="w-10 h-10 mb-3 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Click to upload</span>
                            or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                    </div>
                    <input id="dropzone-file" multiple type="file" className="hidden" onChange={handleImageChange} />
                </label>
            </div>
            <div className="flex justify-center mt-4 items-center">
                <button onClick={handleChange} type="button" className="bg-primary-600 text-white w-32 h-10 rounded-xl">
                    Sửa
                </button>
            </div>
        </div>
    );
}

export default AddImageProduct;
