import React, { useEffect, useRef, useState } from 'react';
import 'flowbite/dist/flowbite.min.css'; // Import CSS của Flowbite
import 'flowbite'; // Import JavaScript của Flowbite

import {
    addProduct,
    getAllDanhMuc,
    getAllProduct,
    getDanhMucConBydmMa,
    uploadImageToFileSystem,
    getAllDanhMucCon,
    deleteProduct,
} from '../redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';
import ProductTable from '../components/ProductTable';
import SuccessMessage from '../components/SuccessMessage';
import DrawerUpdate from '../components/DrawerUpdate';
import DrawerPreview from '../components/DrawerPreview';
import AddProductElement from '../components/AddProductElement';

function Product() {
    const inputRef = useRef();

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDrawerUpdateOpen, setIsDrawerUpdateOpen] = useState(false);
    const [isDrawerPreviewOpen, setIsDrawerPreviewOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isFillterDropDownOpen, setIsFillterDropDownOpen] = useState(false);
    const [keyDm, setKeyDm] = useState(null);
    const [dmcMa, setSubKeyDm] = useState(null);
    const [spGiaCu, setOldPrice] = useState(0);
    const [spGia, setNewPrice] = useState(0);
    const [spSoLuong, setStock] = useState(0);

    const [spMoTaNgan, setShortDescription] = useState('');
    const [spMoTaChiTiet, setFullDescription] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [spTen, setProductName] = useState('');
    const [spMa, setSpMa] = useState(null);
    const [color, setColor] = useState('#000000'); // State để lưu mã HEX
    const [typeProduct, setTypeProduct] = useState([1]);

    const dispatch = useDispatch();

    //Handle category
    const category = useSelector((state) => state.category?.getCategory?.currentCategory);

    useEffect(() => {
        const accessToken = localStorage.getItem('token');
        if (accessToken) {
            getAllDanhMuc(dispatch, accessToken); // Gọi API sau khi token đã được lấy
        }
    }, [dispatch]);

    const handleCategoryChange = (e) => {
        const selectDm = e.target.value;
        if (selectDm) {
            setKeyDm(selectDm);
        }
    };
    //Handle subCategory ======================================================================
    const subCategory = useSelector((state) => state.category.getSubCategory?.currentSubCategory);
    const allSubCategory = useSelector((state) => state.category.getAllSubCategory?.currentAllSubCategory);
    useEffect(() => {
        const accessToken = localStorage.getItem('token');
        if (accessToken && keyDm) {
            getDanhMucConBydmMa(dispatch, keyDm, accessToken); // Gọi API sau khi token đã được lấy
        }
    }, [keyDm, dispatch]);
    useEffect(() => {
        const accessToken = localStorage.getItem('token');
        getAllDanhMucCon(dispatch, accessToken);
    }, []);

    const handleChangeSubKeyDm = (e) => {
        setSubKeyDm(e.target.value);
    };
    // Handle Add Product=======================================================================

    const handleAddProduct = async (e) => {
        try {
            const accessToken = localStorage.getItem('token');
            const spNgayCapNhat = new Date().toISOString().split('T')[0];
            const product = {
                spTen,
                spGia,
                spGiaCu,
                spMoTaNgan,
                spMoTaChiTiet,
                spNgayCapNhat,
                spSoLuong,
                spColor,
                dmcMa,
            };

            const response = await addProduct(product, dispatch, accessToken);
            console.log(response);
            // Get spMa from the response
            const spMa = response.result.spMa; // Adjust this based on your actual response structure

            if (spMa && selectedFile) {
                const res = await uploadImageToFileSystem(selectedFile, spMa);
                const checked = res.split(':')[0];
            } else {
                console.error('Image file is not defined or spMa is missing');
            }
            fetchProduct();
            closeModal();
            if (response.code == 1000) {
                setShowSuccessMessage(true);
                console.log(true); // Log this after state has been updated
                setTimeout(() => {
                    setShowSuccessMessage(false);
                }, 2000);
            }
        } catch (error) {
            console.error('Error adding product or uploading image', error);
        }
    };

    // handle get ma san pham
    const handleGetMaSp = (maSp) => {
        setSpMa(maSp);
    };

    // Handle Get all product ========================================================
    const stateAllProduct = useSelector((state) => state?.product?.getAllProduct?.currentAllProduct);
    const isLoading = useSelector((state) => state.product.getAllProduct.isFetching);

    const allProduct = stateAllProduct?.result || [];
    const fetchProduct = () => {
        const accessToken = localStorage.getItem('token');
        getAllProduct(dispatch, accessToken);
    };

    useEffect(() => {
        fetchProduct();
    }, []);
    // if (isLoading) {
    //   return <div>Loading...</div>;
    // }
    // Get Product by Sp ma=========================================================================
    const productBySpMa = allProduct.find((product) => product.spMa == spMa);

    // handle delete product ====================================================================

    const handleDeleteProduct = async () => {
        const accessToken = localStorage.getItem('token');
        try {
            // Wait for the delete operation to complete
            await deleteProduct(selectedProductId, accessToken);

            // Now call fetchProducts to update the product list
            fetchProduct(); // Refresh the product list after deletion

            // Close the modal after successful deletion
            closeDeleteModal();
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Failed to delete product'); // Handle any errors that occur
        }
    };

    //Handel Input============================================================================

    const handleOldPriceChange = (e) => {
        setOldPrice(e.target.value);
    };
    const handleNewPriceChange = (e) => {
        setNewPrice(e.target.value);
    };
    const handleStockChange = (e) => {
        setStock(e.target.value);
    };
    const handleColorChange = (event) => {
        setColor(event.target.value); // Cập nhật mã HEX khi chọn màu
    };
    const handleShortDescriptionChange = (e) => {
        setShortDescription(e.target.value);
    };
    const handleFullDescriptionChange = (e) => {
        setFullDescription(e.target.value);
    };
    const handleProductNameChange = (e) => {
        setProductName(e.target.value);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };
    const handleAddTypeProduct = () => {
        setTypeProduct([...typeProduct, 1]);
    };
    const handleRemoveTypeProduct = (index) => {
        const newTypeProduct = [...typeProduct];
        newTypeProduct.splice(index, 1);
        setTypeProduct(newTypeProduct);
    }

    //Handle popup

    const openModal = () => {
        setTypeProduct([1])
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsDrawerUpdateOpen(false);
        setIsModalOpen(false);
        setSelectedFile(null);
        setColor('');
        setFullDescription('');
        setShortDescription('');
        setStock(0);
        setNewPrice(0);
        setOldPrice(0);
        setProductName('');
    };

    const onpenDrawerUpdate = () => {
        setIsDrawerUpdateOpen(true);
    };

    const closeDrawerUpdate = () => {
        setIsDrawerUpdateOpen(false);
    };
    const openDrawerPreview = () => {
        setIsDrawerPreviewOpen(true);
    };

    const closeDrawerPreview = () => {
        setIsDrawerPreviewOpen(false);
    };

    const openDeleteModal = (id) => {
        setSelectedProductId(id);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };
    const openFillterDropDown = () => {
        if (isFillterDropDownOpen) {
            setIsFillterDropDownOpen(false);
        } else setIsFillterDropDownOpen(true);
    };

    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
                <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
                    <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <div className="flex-1 flex items-center space-x-2">
                                <h5>
                                    <span className="text-gray-500">All Products:</span>
                                    <span className="dark:text-white">123456</span>
                                </h5>
                                <h5 className="text-gray-500 dark:text-gray-400 ml-1">1-100 (436)</h5>
                                <button type="button" className="group" data-tooltip-target="results-tooltip">
                                    <svg
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span className="sr-only">More info</span>
                                </button>
                                <div
                                    id="results-tooltip"
                                    role="tooltip"
                                    className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                                >
                                    Showing 1-100 of 436 results
                                    <div className="tooltip-arrow" data-popper-arrow=""></div>
                                </div>
                            </div>
                            <div className="flex-shrink-0 flex flex-col items-start md:flex-row md:items-center lg:justify-end space-y-3 md:space-y-0 md:space-x-3">
                                <button
                                    type="button"
                                    className="flex-shrink-0 inline-flex items-center justify-center py-2 px-3 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="mr-2 w-4 h-4"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M11.828 2.25c-.916 0-1.699.663-1.85 1.567l-.091.549a.798.798 0 01-.517.608 7.45 7.45 0 00-.478.198.798.798 0 01-.796-.064l-.453-.324a1.875 1.875 0 00-2.416.2l-.243.243a1.875 1.875 0 00-.2 2.416l.324.453a.798.798 0 01.064.796 7.448 7.448 0 00-.198.478.798.798 0 01-.608.517l-.55.092a1.875 1.875 0 00-1.566 1.849v.344c0 .916.663 1.699 1.567 1.85l.549.091c.281.047.508.25.608.517.06.162.127.321.198.478a.798.798 0 01-.064.796l-.324.453a1.875 1.875 0 00.2 2.416l.243.243c.648.648 1.67.733 2.416.2l.453-.324a.798.798 0 01.796-.064c.157.071.316.137.478.198.267.1.47.327.517.608l.092.55c.15.903.932 1.566 1.849 1.566h.344c.916 0 1.699-.663 1.85-1.567l.091-.549a.798.798 0 01.517-.608 7.52 7.52 0 00.478-.198.798.798 0 01.796.064l.453.324a1.875 1.875 0 002.416-.2l.243-.243c.648-.648.733-1.67.2-2.416l-.324-.453a.798.798 0 01-.064-.796c.071-.157.137-.316.198-.478.1-.267.327-.47.608-.517l.55-.091a1.875 1.875 0 001.566-1.85v-.344c0-.916-.663-1.699-1.567-1.85l-.549-.091a.798.798 0 01-.608-.517 7.507 7.507 0 00-.198-.478.798.798 0 01.064-.796l.324-.453a1.875 1.875 0 00-.2-2.416l-.243-.243a1.875 1.875 0 00-2.416-.2l-.453.324a.798.798 0 01-.796.064 7.462 7.462 0 00-.478-.198.798.798 0 01-.517-.608l-.091-.55a1.875 1.875 0 00-1.85-1.566h-.344zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                                        />
                                    </svg>
                                    Table settings
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 py-4 border-t dark:border-gray-700">
                            <div className="w-full md:w-1/2">
                                <form className="flex items-center">
                                    <label htmlFor="simple-search" className="sr-only">
                                        Search
                                    </label>
                                    <div className="relative w-full">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg
                                                aria-hidden="true"
                                                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            id="simple-search"
                                            placeholder="Search for products"
                                            required=""
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                <button
                                    type="button"
                                    id="createProductButton"
                                    onClick={openModal}
                                    className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                                >
                                    <svg
                                        className="h-3.5 w-3.5 mr-1.5 -ml-1"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                    >
                                        <path
                                            clipRule="evenodd"
                                            fillRule="evenodd"
                                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                        />
                                    </svg>
                                    Add product
                                </button>
                                <button
                                    id="filterDropdownButton"
                                    onClick={openFillterDropDown}
                                    className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                    type="button"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                        className="h-4 w-4 mr-1.5 -ml-1 text-gray-400"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Filter options
                                    <svg
                                        className="-mr-1 ml-1.5 w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                    >
                                        <path
                                            clipRule="evenodd"
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        />
                                    </svg>
                                </button>

                                {isFillterDropDownOpen && (
                                    <div
                                        id="filterDropdown"
                                        className="z-10 px-3 pt-1 bg-white rounded-lg shadow-lg w-80 dark:bg-gray-700 right-0 absolute top-[8rem] "
                                    >
                                        <div className="flex items-center justify-between pt-2">
                                            <h6 className="text-sm font-medium text-black dark:text-white">Filters</h6>
                                            <div className="flex items-center space-x-3">
                                                <a
                                                    href="#"
                                                    className="flex items-center text-sm font-medium text-primary-600 dark:text-primary-500 hover:underline"
                                                >
                                                    Save view
                                                </a>
                                                <a
                                                    href="#"
                                                    className="flex items-center text-sm font-medium text-primary-600 dark:text-primary-500 hover:underline"
                                                >
                                                    Clear all
                                                </a>
                                            </div>
                                        </div>
                                        <div className="pt-3 pb-2">
                                            <label htmlFor="input-group-search" className="sr-only">
                                                Search
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                                    <svg
                                                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                                        aria-hidden="true"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </div>
                                                <input
                                                    type="text"
                                                    id="input-group-search"
                                                    className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    placeholder="Search keywords..."
                                                />
                                            </div>
                                        </div>
                                        <div
                                            id="accordion-flush"
                                            data-accordion="collapse"
                                            data-active-classes="text-black dark:text-white"
                                            data-inactive-classes="text-gray-500 dark:text-gray-400"
                                        >
                                            {/*Category */}
                                            <h2 id="category-heading">
                                                <button
                                                    type="button"
                                                    className="flex items-center justify-between w-full py-2 px-1.5 text-sm font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                                                    data-accordion-target="#category-body"
                                                    aria-expanded="true"
                                                    aria-controls="category-body"
                                                >
                                                    <span>Category</span>
                                                    <svg
                                                        aria-hidden="true"
                                                        data-accordion-icon=""
                                                        className="w-5 h-5 rotate-180 shrink-0"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        />
                                                    </svg>
                                                </button>
                                            </h2>
                                            <div
                                                id="category-body"
                                                className="hidden"
                                                aria-labelledby="category-heading"
                                            >
                                                <div className="py-2 font-light border-b border-gray-200 dark:border-gray-600">
                                                    <ul className="space-y-2">
                                                        <li className="flex items-center">
                                                            <input
                                                                id="apple"
                                                                type="checkbox"
                                                                value=""
                                                                className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                            />
                                                            <label
                                                                htmlFor="apple"
                                                                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                                                            >
                                                                Apple (56)
                                                            </label>
                                                        </li>
                                                        <li className="flex items-center">
                                                            <input
                                                                id="microsoft"
                                                                type="checkbox"
                                                                value=""
                                                                className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                            />
                                                            <label
                                                                htmlFor="microsoft"
                                                                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                                                            >
                                                                Microsoft (45)
                                                            </label>
                                                        </li>
                                                        <li className="flex items-center">
                                                            <input
                                                                id="logitech"
                                                                type="checkbox"
                                                                value=""
                                                                defaultChecked={true}
                                                                className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                            />
                                                            <label
                                                                htmlFor="logitech"
                                                                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                                                            >
                                                                Logitech (97)
                                                            </label>
                                                        </li>
                                                        <li className="flex items-center">
                                                            <input
                                                                id="sony"
                                                                type="checkbox"
                                                                value=""
                                                                className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                            />
                                                            <label
                                                                htmlFor="sony"
                                                                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                                                            >
                                                                Sony (234)
                                                            </label>
                                                        </li>
                                                        <li className="flex items-center">
                                                            <input
                                                                id="asus"
                                                                type="checkbox"
                                                                value=""
                                                                defaultChecked={true}
                                                                className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                            />
                                                            <label
                                                                htmlFor="asus"
                                                                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                                                            >
                                                                Asus (97)
                                                            </label>
                                                        </li>
                                                        <li className="flex items-center">
                                                            <input
                                                                id="dell"
                                                                type="checkbox"
                                                                value=""
                                                                className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                            />
                                                            <label
                                                                htmlFor="dell"
                                                                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                                                            >
                                                                Dell (56)
                                                            </label>
                                                        </li>
                                                        <li className="flex items-center">
                                                            <input
                                                                id="msi"
                                                                type="checkbox"
                                                                value=""
                                                                className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                            />
                                                            <label
                                                                htmlFor="msi"
                                                                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                                                            >
                                                                MSI (97)
                                                            </label>
                                                        </li>
                                                        <li className="flex items-center">
                                                            <input
                                                                id="canon"
                                                                type="checkbox"
                                                                value=""
                                                                defaultChecked={true}
                                                                className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                            />
                                                            <label
                                                                htmlFor="canon"
                                                                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                                                            >
                                                                Canon (49)
                                                            </label>
                                                        </li>
                                                        <li className="flex items-center">
                                                            <input
                                                                id="benq"
                                                                type="checkbox"
                                                                value=""
                                                                className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                            />
                                                            <label
                                                                htmlFor="benq"
                                                                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                                                            >
                                                                BenQ (23)
                                                            </label>
                                                        </li>
                                                        <li className="flex items-center">
                                                            <input
                                                                id="razor"
                                                                type="checkbox"
                                                                value=""
                                                                className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                            />
                                                            <label
                                                                htmlFor="razor"
                                                                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                                                            >
                                                                Razor (49)
                                                            </label>
                                                        </li>
                                                        <a
                                                            href="#"
                                                            className="flex items-center text-sm font-medium text-primary-600 dark:text-primary-500 hover:underline"
                                                        >
                                                            View all
                                                        </a>
                                                    </ul>
                                                </div>
                                            </div>
                                            {/*Price */}
                                            <h2 id="price-heading">
                                                <button
                                                    type="button"
                                                    className="flex items-center justify-between w-full py-2 px-1.5 text-sm font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                                                    data-accordion-target="#price-body"
                                                    aria-expanded="true"
                                                    aria-controls="price-body"
                                                >
                                                    <span>Price</span>
                                                    <svg
                                                        aria-hidden="true"
                                                        data-accordion-icon=""
                                                        className="w-5 h-5 rotate-180 shrink-0"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        />
                                                    </svg>
                                                </button>
                                            </h2>
                                            <div id="price-body" className="hidden" aria-labelledby="price-heading">
                                                <div className="flex items-center py-2 space-x-3 font-light border-b border-gray-200 dark:border-gray-600">
                                                    <select
                                                        id="price-from"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    >
                                                        <option disabled="" value="">
                                                            From
                                                        </option>
                                                        <option>$500</option>
                                                        <option>$2500</option>
                                                        <option>$5000</option>
                                                    </select>
                                                    <select
                                                        id="price-to"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    >
                                                        <option disabled="" value="">
                                                            To
                                                        </option>
                                                        <option>$500</option>
                                                        <option>$2500</option>
                                                        <option>$5000</option>
                                                    </select>
                                                </div>
                                            </div>
                                            {/* Worldwide Shipping*/}
                                            <h2 id="worldwide-shipping-heading">
                                                <button
                                                    type="button"
                                                    className="flex items-center justify-between w-full py-2 px-1.5 text-sm font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                                                    data-accordion-target="#worldwide-shipping-body"
                                                    aria-expanded="true"
                                                    aria-controls="worldwide-shipping-body"
                                                >
                                                    <span>Worldwide Shipping</span>
                                                    <svg
                                                        aria-hidden="true"
                                                        data-accordion-icon=""
                                                        className="w-5 h-5 rotate-180 shrink-0"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        />
                                                    </svg>
                                                </button>
                                            </h2>
                                            <div
                                                id="worldwide-shipping-body"
                                                className="hidden"
                                                aria-labelledby="worldwide-shipping-heading"
                                            >
                                                <div className="py-2 space-y-2 font-light border-b border-gray-200 dark:border-gray-600">
                                                    <label className="relative flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            value=""
                                                            className="sr-only peer"
                                                            name="shipping"
                                                            defaultChecked={true}
                                                        />
                                                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                                                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                            North America
                                                        </span>
                                                    </label>
                                                    <label className="relative flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            value=""
                                                            className="sr-only peer"
                                                            name="shipping"
                                                        />
                                                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                                                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                            South America
                                                        </span>
                                                    </label>
                                                    <label className="relative flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            defaultValue="Giá trị ban đầu" // Sử dụng defaultValue thay vì value
                                                            className="sr-only peer"
                                                            name="shipping"
                                                        />
                                                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                                                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                            Asia
                                                        </span>
                                                    </label>
                                                    <label className="relative flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            value=""
                                                            className="sr-only peer"
                                                            name="shipping"
                                                            defaultChecked={true}
                                                        />
                                                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                                                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                            Australia
                                                        </span>
                                                    </label>
                                                    <label className="relative flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            value=""
                                                            className="sr-only peer"
                                                            name="shipping"
                                                        />
                                                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                                                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                            Europe
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                            {/*Rating */}
                                            <h2 id="rating-heading">
                                                <button
                                                    type="button"
                                                    className="flex items-center justify-between w-full py-2 px-1.5 text-sm font-medium text-left text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                                                    data-accordion-target="#rating-body"
                                                    aria-expanded="true"
                                                    aria-controls="rating-body"
                                                >
                                                    <span>Rating</span>
                                                    <svg
                                                        aria-hidden="true"
                                                        data-accordion-icon=""
                                                        className="w-5 h-5 rotate-180 shrink-0"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        />
                                                    </svg>
                                                </button>
                                            </h2>
                                            <div id="rating-body" className="hidden" aria-labelledby="rating-heading">
                                                <div className="py-2 space-y-2 font-light border-b border-gray-200 dark:border-gray-600">
                                                    <div className="flex items-center">
                                                        <input
                                                            id="five-stars"
                                                            type="radio"
                                                            value=""
                                                            name="rating"
                                                            className="w-4 h-4 bg-gray-100 border-gray-300 text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                        />
                                                        <label htmlFor="five-stars" className="flex items-center ml-2">
                                                            <svg
                                                                aria-hidden="true"
                                                                className="w-5 h-5 text-yellow-400"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <title>First star</title>
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                            <svg
                                                                aria-hidden="true"
                                                                className="w-5 h-5 text-yellow-400"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <title>Second star</title>
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                            <svg
                                                                aria-hidden="true"
                                                                className="w-5 h-5 text-yellow-400"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <title>Third star</title>
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                            <svg
                                                                aria-hidden="true"
                                                                className="w-5 h-5 text-yellow-400"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <title>Fourth star</title>
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                            <svg
                                                                aria-hidden="true"
                                                                className="w-5 h-5 text-yellow-400"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <title>Fifth star</title>
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <input
                                                            id="four-stars"
                                                            type="radio"
                                                            value=""
                                                            name="rating"
                                                            className="w-4 h-4 bg-gray-100 border-gray-300 text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                        />
                                                        <label htmlFor="four-stars" className="flex items-center ml-2">
                                                            <svg
                                                                aria-hidden="true"
                                                                className="w-5 h-5 text-yellow-400"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <title>First star</title>
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                            <svg
                                                                aria-hidden="true"
                                                                className="w-5 h-5 text-yellow-400"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <title>Second star</title>
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                            <svg
                                                                aria-hidden="true"
                                                                className="w-5 h-5 text-yellow-400"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <title>Third star</title>
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                            <svg
                                                                aria-hidden="true"
                                                                className="w-5 h-5 text-yellow-400"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <title>Fourth star</title>
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                            <svg
                                                                aria-hidden="true"
                                                                className="w-5 h-5 text-gray-300 dark:text-gray-500"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <title>Fifth star</title>
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <input
                                                            id="three-stars"
                                                            type="radio"
                                                            value=""
                                                            name="rating"
                                                            defaultChecked={true}
                                                            className="w-4 h-4 bg-gray-100 border-gray-300 text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                        />
                                                        <label htmlFor="three-stars" className="flex items-center ml-2">
                                                            <svg
                                                                aria-hidden="true"
                                                                className="w-5 h-5 text-yellow-400"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <title>First star</title>
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                            <svg
                                                                aria-hidden="true"
                                                                className="w-5 h-5 text-yellow-400"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <title>Second star</title>
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                            <svg
                                                                aria-hidden="true"
                                                                className="w-5 h-5 text-yellow-400"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <title>Third star</title>
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                            <svg
                                                                aria-hidden="true"
                                                                className="w-5 h-5 text-gray-300 dark:text-gray-500"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <title>Fourth star</title>
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                            <svg
                                                                aria-hidden="true"
                                                                className="w-5 h-5 text-gray-300 dark:text-gray-500"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <title>Fifth star</title>
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <input
                                                            id="two-stars"
                                                            type="radio"
                                                            value=""
                                                            name="rating"
                                                            className="w-4 h-4 bg-gray-100 border-gray-300 text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                        />
                                                        <label htmlFor="two-stars" className="flex items-center ml-2">
                                                            <svg
                                                                aria-hidden="true"
                                                                className="w-5 h-5 text-yellow-400"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <title>First star</title>
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                            <svg
                                                                aria-hidden="true"
                                                                className="w-5 h-5 text-yellow-400"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <title>Second star</title>
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                            <svg
                                                                aria-hidden="true"
                                                                className="w-5 h-5 text-gray-300 dark:text-gray-500"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <title>Third star</title>
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                            <svg
                                                                aria-hidden="true"
                                                                className="w-5 h-5 text-gray-300 dark:text-gray-500"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <title>Fourth star</title>
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                            <svg
                                                                aria-hidden="true"
                                                                className="w-5 h-5 text-gray-300 dark:text-gray-500"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <title>Fifth star</title>
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <input
                                                            id="one-star"
                                                            type="radio"
                                                            value=""
                                                            name="rating"
                                                            className="w-4 h-4 bg-gray-100 border-gray-300 text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                        />
                                                        <label htmlFor="one-star" className="flex items-center ml-2">
                                                            <svg
                                                                aria-hidden="true"
                                                                className="w-5 h-5 text-yellow-400"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <title>First star</title>
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                            <svg
                                                                aria-hidden="true"
                                                                className="w-5 h-5 text-gray-300 dark:text-gray-500"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <title>Second star</title>
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                            <svg
                                                                aria-hidden="true"
                                                                className="w-5 h-5 text-gray-300 dark:text-gray-500"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <title>Third star</title>
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                            <svg
                                                                aria-hidden="true"
                                                                className="w-5 h-5 text-gray-300 dark:text-gray-500"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <title>Fourth star</title>
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                            <svg
                                                                aria-hidden="true"
                                                                className="w-5 h-5 text-gray-300 dark:text-gray-500"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <title>Fifth star</title>
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="flex items-center space-x-3 w-full md:w-auto">
                                    <button
                                        id="actionsDropdownButton"
                                        data-dropdown-toggle="actionsDropdown"
                                        className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                        type="button"
                                    >
                                        Actions
                                        <svg
                                            className="-mr-1 ml-1.5 w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                            aria-hidden="true"
                                        >
                                            <path
                                                clipRule="evenodd"
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            />
                                        </svg>
                                    </button>
                                    <div
                                        id="actionsDropdown"
                                        className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                                    >
                                        <ul
                                            className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                            aria-labelledby="actionsDropdownButton"
                                        >
                                            <li>
                                                <a
                                                    href="#"
                                                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                >
                                                    Mass Edit
                                                </a>
                                            </li>
                                        </ul>
                                        <div className="py-1">
                                            <a
                                                href="#"
                                                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                            >
                                                Delete all
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ProductTable
                            productBySpMa={productBySpMa}
                            allProduct={allProduct}
                            allSubCategory={allSubCategory}
                            onpenDrawerUpdate={onpenDrawerUpdate}
                            openDrawerPreview={openDrawerPreview}
                            openDeleteModal={openDeleteModal}
                            handleGetMaSp={handleGetMaSp}
                        />
                    </div>
                </div>
            </section>

            {/**Modal */}
            {isModalOpen && (
                <div
                    id="createProductModal"
                    tabIndex="-1"
                    aria-hidden="true"
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto "
                    onClick={closeModal}
                >
                    <div className="relative  p-4 w-full max-w-3xl h-full md:h-auto ">
                        {/** Modal content */}
                        <div
                            className="relative top-2 p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 overflow-y-auto max-h-[80vh]"
                            onClick={(e) => e.stopPropagation()} // Ngăn chặn sự kiện click từ lan ra ngoài
                        >
                            {/**Modal header */}
                            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Product</h3>
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
                                            onChange={handleProductNameChange}
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
                                                onChange={handleOldPriceChange}
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
                                                type="number"
                                                name="newPrice"
                                                id="newPrice"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                placeholder="Nhập tên màu"
                                                required=""
                                                onChange={handleNewPriceChange}
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
                                            <button className="bg-primary-700 w-full rounded-lg h-1/2 text-white">
                                                Thêm màu
                                            </button>
                                        </div>
                                    </div>
                                    {typeProduct.map((product, index) => (
                                        <div key={index} className="sm:col-span-2">
                                            <AddProductElement handleRemoveTypeProduct = {handleRemoveTypeProduct} index={index}/>
                                        </div>
                                    ))}
                                    <div className="sm:col-span-2 flex justify-center items-center">
                                        <span onClick={handleAddTypeProduct} className="h-10 bg-primary-700 text-white px-6 rounded-xl cursor-pointer">Thêm</span>
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
                                            onChange={handleShortDescriptionChange}
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
                                            onChange={handleFullDescriptionChange}
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
                                            onChange={handleFullDescriptionChange}
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                                    <button
                                        type="button"
                                        className="w-full sm:w-auto justify-center text-white inline-flex bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                        onClick={handleAddProduct}
                                    >
                                        Add product
                                    </button>
                                    <button className="w-full sm:w-auto text-white justify-center inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                        <svg
                                            className="mr-1 -ml-1 w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Schedule
                                    </button>
                                    <button
                                        onClick={closeModal}
                                        type="button"
                                        className="w-full justify-center sm:w-auto text-gray-500 inline-flex items-center bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                    >
                                        <svg
                                            className="mr-1 -ml-1 w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Discard
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            {showSuccessMessage && <SuccessMessage />}

            {/**drawer component */}

            {isDrawerUpdateOpen && (
                <DrawerUpdate
                    isDrawerUpdateOpen={isDrawerUpdateOpen}
                    closeDrawerUpdate={closeDrawerUpdate}
                    handleProductNameChange={handleProductNameChange}
                    category={category}
                    handleChangeSubKeyDm={handleChangeSubKeyDm}
                    subCategory={subCategory}
                    closeModal={closeModal}
                    handleCategoryChange={handleCategoryChange}
                    productBySpMa={productBySpMa}
                    dmcMa={dmcMa}
                    fetchProduct={fetchProduct}
                />
            )}
            {/*Preview Drawer */}
            {isDrawerPreviewOpen && (
                <DrawerPreview
                    isDrawerPreviewOpen={isDrawerPreviewOpen}
                    closeDrawerPreview={closeDrawerPreview}
                    productBySpMa={productBySpMa}
                />
            )}

            {/*Delete Modal */}
            {isDeleteModalOpen && (
                <div
                    tabIndex="-1"
                    aria-hidden="true"
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto "
                >
                    <div
                        id="delete-modal"
                        tabIndex="-1"
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto "
                    >
                        <div className="relative w-full h-auto max-w-md max-h-full">
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <button
                                    onClick={closeDeleteModal}
                                    type="button"
                                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                                >
                                    <svg
                                        aria-hidden="true"
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                                <div className="p-6 text-center">
                                    <svg
                                        aria-hidden="true"
                                        className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                        Are you sure you want to delete this product?
                                    </h3>
                                    <button
                                        type="button"
                                        className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                                        onClick={handleDeleteProduct}
                                    >
                                        Yes, I'm sure
                                    </button>
                                    <button
                                        onClick={closeDeleteModal}
                                        type="button"
                                        className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                    >
                                        No, cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Product;
