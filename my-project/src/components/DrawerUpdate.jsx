import { useEffect, useState } from 'react';
import {
    addColorProduct,
    addProduct,
    addProductVariant,
    deleteProductVariant,
    downloadAllImageFromServerBySpMa,
    getAllColorProduct,
    getAllProductsVariantByProductID,
    getProductById,
    updateImageProduct,
    updateProduct,
    updateProductVariant,
} from '../redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';
import AddProductElement from './AddProductElement';
import UpdateProductElement from './UpdateProductElemet';
import UpdateImageProduct from '../modal/UpdateImageProduct/UpdateImageProduct';
import { toast } from 'react-toastify';

function DrawerUpdate({
    handleCategoryChange,
    category,
    handleChangeSubKeyDm,
    subCategory,
    closeModal,
    productBySpMa,
    dmcMa,
    fetchProduct,
    closeDrawerUpdate,
    maSp,
    selectedProductId,
}) {
    const [product, setProduct] = useState({});
    const [productName, setProductName] = useState(product?.name);
    const [price, setPrice] = useState(product?.base_price);
    const [discount, setDiscount] = useState(product?.discount_percentage);
    const [description, setDescription] = useState(product?.description);
    const [material, setMaterial] = useState(product?.material);
    const [instruction, setInstruction] = useState(product?.instruction);
    const [colorName, setColorName] = useState('');
    const [color, setColor] = useState('#000000'); // State để lưu mã HEX
    const [typeProduct, setTypeProduct] = useState([]);
    const [colors, setColors] = useState([]);
    const [showUpdateImage, setShowUpdateImageProduct] = useState(false);
    const [variantId, setVariantId] = useState(null);

    const [deleteTypeProduct, setDeleteTypeProduct] = useState([]);
    const [updateNewTypeProduct, setUpdateNewTypeProduct] = useState([]);
    const [productVariantData, setProductVariantData] = useState([]);

    useEffect(() => {
        if (product) {
            setProductName(product.name || '');
            setPrice(product.base_price || 0);
            setDiscount(product.discount_percentage || 0);
            setDescription(product.description || '');
            setMaterial(product.material || '');
            setInstruction(product.instruction || '');
        }
    }, [product]);

    const callApiGetProductById = async () => {
        const res = await getProductById(selectedProductId);
        setProduct(res.result);
    };
    useEffect(() => {
        callApiGetProductById();
        setDeleteTypeProduct([]);
    }, []);

    const callAPIGetProductVariant = async () => {
        const res = await getAllProductsVariantByProductID(selectedProductId);
        setTypeProduct(res);
    };

    useEffect(() => {
        callAPIGetProductVariant();
    }, []);

    // Handle add color =============================================================
    const handleAddColorProduct = async () => {
        const accessToken = localStorage.getItem('token');
        const newColor = {
            colorName: colorName,
            colorCode: color,
        };
        try {
            await addColorProduct(newColor, accessToken);
            handleClickChooseColor();
        } catch (error) {
            console.log(error);
        }
    };
    //Handle click choose color =================================================================
    const handleClickChooseColor = async () => {
        try {
            const data = await getAllColorProduct();
            setColors(data.result);
        } catch (error) {}
    };
    useEffect(() => {
        handleClickChooseColor();
    }, []);
    //Handle click update product =================================================================
    // useEffect(() => {
    //     console.log(typeProduct)
    // }, [typeProduct])
    const handleClickUpdateProduct = () => {
        const newProduct = {
            name: productName,
            base_price: price,
            description: description,
            discount_percentage: Number(discount),
            material: material,
            instruction: instruction,
            dmcMaId: dmcMa,
        };
        if (validateNewProduct(newProduct)) {
            callAPIUpdateProduct(newProduct);

            if (deleteTypeProduct.length > 0) {
                deleteTypeProduct.forEach((productVariantId) => {
                    callAPIDeleteTypeProduct(productVariantId);
                });
            }
            if (updateNewTypeProduct.length > 0) {
                console.log(updateNewTypeProduct);
                updateNewTypeProduct.forEach((variant) => {
                    if (variant.id) {
                        const newVariant = {
                            product_id: selectedProductId,
                            color_id: variant.color_id,
                            size: variant.size,
                            stockQuantity: variant.stockQuantity,
                        };
                        if (validateNewVariant(newVariant)) {
                            addProductVariant(newVariant);
                        }
                    } else {
                        const newVariant = {
                            color_id: variant.color_id,
                            size: variant.size,
                            stockQuantity: variant.stockQuantity,
                        };
                        updateProductVariant(newVariant, variant.variant_id);
                    }
                });
            }
            closeDrawerUpdate();
            fetchProduct();
            toast.success('Update sản phẩm thành công.');
        }
    };
    const callAPIUpdateProduct = async (product) => {
        try {
            await updateProduct(selectedProductId, product);
        } catch (error) {
            console.log(error);
        }
    };
    const callAPIDeleteTypeProduct = async (variantId) => {
        try {
            await deleteProductVariant(variantId);
        } catch (error) {
            console.log(error);
        }
    };
    //Handle validate product =================================================================
    const validateNewProduct = (product) => {
        let checked = true;

        if (!product.name || product.name.trim() === '') {
            toast.error('Tên sản phẩm không được để trống.');
            checked = false;
        }

        if (product.base_price === undefined || product.base_price === null || isNaN(product.base_price)) {
            toast.error('Giá sản phẩm phải là một số và không được để trống.');
            checked = false;
        } else if (product.base_price <= 0) {
            toast.error('Giá sản phẩm phải lớn hơn 0.');
            checked = false;
        }

        if (!product.description || product.description.trim() === '') {
            toast.error('Mô tả sản phẩm không được để trống.');
            checked = false;
        }

        if (
            isNaN(product.discount_percentage) ||
            product.discount_percentage < 0 ||
            product.discount_percentage > 100
        ) {
            toast.error('Phần trăm giảm giá phải là một số từ 0 đến 100.');
            checked = false;
        }

        if (!product.material || product.material.trim() === '') {
            toast.error('Chất liệu sản phẩm không được để trống.');
            checked = false;
        }

        if (!product.instruction || product.instruction.trim() === '') {
            toast.error('Hướng dẫn sử dụng không được để trống.');
            checked = false;
        }

        if (!product.dmcMaId || product.dmcMaId.trim() === '') {
            toast.error('Danh mục sản phẩm không được để trống.');
            checked = false;
        }
        return checked;
    };
    const validateNewVariant = (variant) => {
        let checked = true;
        if (variant.color_id == undefined) {
            toast.error('Vui lòng chọn màu sản phẩm!!!');
            checked = false;
        }
        if (variant.size.length < 1) {
            toast.error('Vui lòng chọn size sản phẩm!!!');
            checked = false;
        }
        if (variant.stockQuantity <= 0) {
            toast.error('Vui lòng nhập đúng số lượng sản phẩm!!!');
            checked = false;
        }
        return checked;
    };
    //Handle add product variant =================================================================
    const handleAddTypeProduct = () => {
        const newProduct = {
            id: Date.now(),
            stockQuantity: 0,
            size: [],
            color_id: null,
            colorCode: null,
            colorName: '',
        };
        setTypeProduct((prev) => [...prev, newProduct]);
        setUpdateNewTypeProduct((prev) => [...prev, newProduct]);
    };
    //Handle remove product variant =================================================================
    const handleRemoveTypeProduct = (productVariant) => {
        if (typeProduct.length > 1) {
            const newTypeProduct = typeProduct.filter(
                (product) => product.variant_id !== productVariant.variant_id || product.id !== productVariant.id,
            );
            setTypeProduct(newTypeProduct);
            if (!productVariant.id) {
                const removedProduct = typeProduct.find((product) => product.variant_id === productVariant.variant_id);

                if (removedProduct?.variant_id) {
                    setDeleteTypeProduct((prev) => [...prev, removedProduct.variant_id]);
                }
            } else {
                const removedNewTypeProduct = updateNewTypeProduct.filter(
                    (product) => product.id !== productVariant.id,
                );

                setUpdateNewTypeProduct(removedNewTypeProduct);
            }
        } else {
            toast.error('Phải có tối thiểu 1 loại sản phẩm!!!');
        }
    };

    const handleAddProductVariantData = (index, color_id, size, stockQuantity, colorCode, colorName) => {
        const data = [...typeProduct];
        data[index] = {
            ...data[index],
            color_id: color_id,
            size: size,
            stockQuantity: stockQuantity,
            colorCode: colorCode,
            colorName: colorName,
        };
        setProductVariantData(data);
    };
    useEffect(() => {
        setUpdateNewTypeProduct(productVariantData);
        setTypeProduct(productVariantData);
    }, [productVariantData]);

    const handleProductNameChange = (e) => {
        setProductName(e.target.value);
    };

    const handleChangePrice = (e) => {
        const rawValue = e.target.value.replace(/[^0-9,]/g, ''); // Giữ lại số và dấu phẩy
        const formattedValue = rawValue.replace(/,/g, ''); // Loại bỏ dấu phẩy khi lưu
        setPrice(formattedValue);
    };

    const handleChangeDiscount = (e) => {
        setDiscount(e.target.value);
    };
    const handleChangeDescription = (e) => {
        setDescription(e.target.value);
    };
    const handleMaterialChange = (e) => {
        setMaterial(e.target.value);
    };

    const handleChangeInstruction = (e) => [setInstruction(e.target.value)];
    const handleChangeNameColor = (e) => {
        setColorName(e.target.value);
    };
    const handleColorChange = (event) => {
        setColor(event.target.value); // Cập nhật mã HEX khi chọn màu
    };

    const openAddImageModal = () => {
        setShowUpdateImageProduct(true);
    };
    const closeAddImageModal = () => {
        setShowUpdateImageProduct(false);
    };
    const handleChangeVariantID = (id) => {
        setVariantId(id);
    };

    return (
        <div
            id="createProductModal"
            tabIndex="-1"
            aria-hidden="true"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto "
            onClick={closeModal}
        >
            {showUpdateImage && <UpdateImageProduct variantId={variantId} closeAddImageModal={closeAddImageModal} />}
            <div className="relative  p-4 w-full max-w-3xl h-full md:h-auto ">
                {/** Modal content */}
                <div
                    className="relative top-2 p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 overflow-y-auto max-h-[80vh]"
                    onClick={(e) => e.stopPropagation()} // Ngăn chặn sự kiện click từ lan ra ngoài
                >
                    {/**Modal header */}
                    <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Update Product</h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            <svg
                                aria-hidden="true"
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                                onClick={closeModal}
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    {/**Modal body */}
                    <form action="#">
                        <div className="grid gap-4 mb-4 sm:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Tên sản phẩm
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Type product name"
                                    required=""
                                    value={productName}
                                    onChange={handleProductNameChange}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="category"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Danh mục
                                </label>
                                <select
                                    id="category"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    onChange={handleCategoryChange}
                                >
                                    <option value="">Select category</option>
                                    {category?.result.map((category) => (
                                        <option key={category.dmMa} value={category.dmMa}>
                                            {category.dmTen}/{category.dmType}{' '}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label
                                    htmlFor="object"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Loại sản phẩm
                                </label>
                                <select
                                    onChange={handleChangeSubKeyDm}
                                    id="object"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                >
                                    <option value="">Select subcatelogy</option>
                                    {subCategory?.result.map((subCategory) => (
                                        <option key={subCategory.dmcMa} value={subCategory.dmcMa}>
                                            {subCategory.dmcTen}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Giá
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Type product price"
                                    required=""
                                    value={new Intl.NumberFormat('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND',
                                        minimumFractionDigits: 0,
                                    }).format(price || 0)} // Định dạng giá trị hiển thị
                                    onChange={handleChangePrice}
                                />
                            </div>
                            <div className="grid gap-4 sm:col-span-2 md:gap-6 sm:grid-cols-4">
                                <div>
                                    <label
                                        htmlFor="oldPrice"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Sale (%)
                                    </label>
                                    <input
                                        type="number"
                                        name="oldPrice"
                                        id="oldPrice"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="ex:10%"
                                        required=""
                                        value={discount}
                                        onChange={handleChangeDiscount}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="newPrice"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Nhập màu sản phẩm
                                    </label>
                                    <input
                                        type="text"
                                        name="newPrice"
                                        id="newPrice"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Nhập tên màu"
                                        required=""
                                        onChange={handleChangeNameColor}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="stock"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Chọn mã màu
                                    </label>
                                    {/* Hiển thị mã HEX */}
                                    <div className="flex items-center">
                                        <input
                                            type="text"
                                            value={color} // Hiển thị mã HEX
                                            onChange={handleColorChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full"
                                        />
                                        <input
                                            type="color"
                                            name="color"
                                            id="stock"
                                            value={color}
                                            style={{ backgroundColor: color }} // Áp dụng màu nền động
                                            className="rounded-full h-[30px] w-[30px] cursor-pointer "
                                            onChange={handleColorChange}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label
                                        htmlFor="color"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Color
                                    </label>
                                    <div
                                        onClick={handleAddColorProduct}
                                        className="bg-primary-700 w-full rounded-lg h-1/2 text-white flex justify-center items-center cursor-pointer"
                                    >
                                        <span>Thêm màu</span>
                                    </div>
                                </div>
                            </div>
                            {typeProduct.map((product, index) => (
                                <div key={index} className="sm:col-span-2">
                                    <UpdateProductElement
                                        variant_id={product.variant_id}
                                        handleChangeVariantID={handleChangeVariantID}
                                        colors={colors}
                                        colorID={product.color_id}
                                        listSize={product.size}
                                        stock={product.stockQuantity}
                                        openAddImageModal={openAddImageModal}
                                        handleRemoveTypeProduct={handleRemoveTypeProduct}
                                        indexTypeProduct={index}
                                        productVariant={product}
                                        handleAddProductVariantData={handleAddProductVariantData}
                                    />
                                </div>
                            ))}
                            <div className="sm:col-span-2 flex justify-center items-center">
                                <span
                                    onClick={handleAddTypeProduct}
                                    className="h-10 bg-primary-700 text-white px-6 rounded-xl cursor-pointer"
                                >
                                    Thêm
                                </span>
                            </div>
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="description"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Mô tả
                                </label>
                                <textarea
                                    id="description"
                                    rows="4"
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Nhập mô tả"
                                    value={description}
                                    onChange={handleChangeDescription}
                                ></textarea>
                            </div>

                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="description"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Chất liệu
                                </label>
                                <textarea
                                    id="description"
                                    rows="4"
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Nhập chất liệu"
                                    value={material}
                                    onChange={handleMaterialChange}
                                ></textarea>
                            </div>
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="description"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Hướng dẫn sử dụng
                                </label>
                                <textarea
                                    id="description"
                                    rows="4"
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Nhập hướng dẫn sử dụng"
                                    value={instruction}
                                    onChange={handleChangeInstruction}
                                ></textarea>
                            </div>
                        </div>

                        <div className="items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                            <button
                                type="button"
                                className="w-full sm:w-auto justify-center text-white inline-flex bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                onClick={handleClickUpdateProduct}
                            >
                                Update product
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default DrawerUpdate;
