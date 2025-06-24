import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import {
    loginFailed,
    loginStart,
    loginSuccess,
    logoutStart,
    registerFailed,
    registerStart,
    registerSuccess,
} from './authSlice';
import {
    deleteUserStart,
    getAddressFailed,
    getAddressStart,
    getAddressSuccess,
    getUserFailed,
    getUsersFailed,
    getUsersStart,
    getUsersSuccess,
    getUserStart,
    getUserSuccess,
} from './userSlice';
import axiosInstance from './axiosConfig';
import {
    getAllSubCategoryFailed,
    getAllSubCategoryStart,
    getAllSubCategorySuccess,
    getCategoryFailed,
    getCategoryStart,
    getCategorySuccess,
    getSubCategoryFailed,
    getSubCategoryStart,
    getSubCategorySuccess,
} from './categorySlice';
import {
    addProductStart,
    addProductSuccess,
    addProductFailed,
    getAllProductStart,
    getAllProductSuccess,
    getAllProductFailed,
    getImageProductStart,
    getImageProductSuccess,
    getImageProductFailed,
    getAllImageProductStart,
    getAllImageProductSuccess,
    getAllImageProductFailed,
    getAllProductFavoriteStart,
    getAllProductFavoriteSuccess,
} from './productSlice';
import { config } from 'react-transition-group';
import { addProductToCartFailed, addProductToCartStart, addProductToCartSuccess } from './cartSlice';


//  const REST_AUTH_BASE_URL = "http://51.79.167.161:8081/auth";
//  const REST_API_BASE_URL = "http://51.79.167.161:8081/api";
const REST_AUTH_BASE_URL = import.meta.env.VITE_REST_AUTH_BASE_URL;
const REST_API_BASE_URL = import.meta.env.VITE_REST_API_BASE_URL;
const REST_API_V1_URL = import.meta.env.VITE_REST_API_V1_URL;



//get cookie
const getCookie = (name) => {
    const cookies = document.cookie.split('; ').find((row) => row.startsWith(name + '='));
    return cookies ? JSON.parse(cookies.split('=')[1]) : [];
};

//Login
export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const guestCartId = localStorage.getItem('guestCartId');
        const res = await axios.post(REST_AUTH_BASE_URL + `/login?guestCartId=${guestCartId}`, user);
        dispatch(loginSuccess(res.data));
        const accessToken = res.data.result.token;
        localStorage.setItem('token', accessToken);
        const decodedToken = jwtDecode(accessToken);
        if (decodedToken.scope === 'ADMIN') {
            navigate('/admin');
        } else {
            navigate('/');
        }
    } catch (error) {
        console.log(error);
        const errorPayload = { usernameError: '', passwordError: '' };
        if (error.response) {
            const { code, message } = error.response.data;
            if (code == 1001) {
                errorPayload.usernameError = message;
            } else if (code == 1002) {
                errorPayload.passwordError = message;
            }
        }
        dispatch(loginFailed(errorPayload));
    }
};

//Refresh token

// Register
export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        await axios.post(REST_API_BASE_URL + '/add-khachhang', user);
        dispatch(registerSuccess());
        navigate('/login');
    } catch (error) {
        const errorPayload = { usernameError: '', emailError: '' }; // Khởi tạo payload lỗi
        if (error.response) {
            const { code, message } = error.response.data; // Lấy code và message từ response

            // Kiểm tra mã lỗi và thông báo để gán cho trường tương ứng
            if (code === 1004) {
                errorPayload.usernameError = message; // Gán lỗi cho trường username
            }
            // Giả sử mã lỗi cho email là 1005
            else if (code === 1003) {
                errorPayload.emailError = message; // Gán lỗi cho trường email
            }
        }
        dispatch(registerFailed(errorPayload));
    }
};

// get all khachhang
export const getAllUsers = async (token, dispatch) => {
    dispatch(getUsersStart());
    try {
        const res = await axios.get(REST_API_BASE_URL + '/khachhangs', {
            headers: { Authorization: `Bearer ${token}` }, // Sử dụng 'Authorization' thay vì 'token'
        });
        dispatch(getUsersSuccess(res.data));
    } catch (error) {
        console.error(error);
        dispatch(getUsersFailed());
    }
};

// get khachhang by id
export const getUserById = async (username, token, dispatch) => {
    dispatch(getUserStart());
    try {
        const res = await axiosInstance.get(REST_API_BASE_URL + `/khachhang/${username}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(getUserSuccess(res.data.result));
    } catch (error) {
        console.error(error);
        dispatch(getUserFailed());
    }
};
// update khachhang
export const updateUser = async (username, user) => {
    try {
        const token = localStorage.getItem('token');
        const res = await axiosInstance.put(REST_API_BASE_URL + `/update-khachhang/${username}`, user, {
            headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Cập nhật thông tin cá nhân thành công');
    } catch (error) {
        console.error(error);
        toast.error('Cập nhật thông tin cá nhân thất bại!');
    }
};

// delete user
export const deleteUser = async (token, dispatch, username) => {
    dispatch(deleteUserStart());
    try {
    } catch (error) {}
};

//refresh token
export const refreshToken = async (token) => {
    try {
        const res = await axios.post('http://localhost:8081/auth/refresh', {
            token,
        });
        const accessToken = res.data.result.token;
        localStorage.setItem('token', accessToken);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

//Logout
export const logout = async (dispatch, token) => {
    dispatch(logoutStart());
    try {
        const res = await axios.post(REST_AUTH_BASE_URL + '/logout', { token });
        dispatch(loginSuccess());
    } catch (error) {
        dispatch(loginFailed());
        console.log(error);
    }
};

//Get all danh muc
export const getAllDanhMuc = async (dispatch, token) => {
    dispatch(getCategoryStart());
    try {
        const res = await axiosInstance(REST_API_BASE_URL + '/danhmucs', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch(getCategorySuccess(res.data));
    } catch (error) {
        console.log(error);
        dispatch(getCategoryFailed());
    }
};
// Get  danh muc con by dmMa
export const getDanhMucConBydmMa = async (dispatch, dmMa, token) => {
    dispatch(getSubCategoryStart());
    try {
        const res = await axiosInstance(REST_API_BASE_URL + `/danhmuccon/${dmMa}`);
        dispatch(getSubCategorySuccess(res.data));
    } catch (error) {
        console.log(error);
        dispatch(getSubCategoryFailed());
    }
};
// Get all danh muc con
export const getAllDanhMucCon = async (dispatch, token) => {
    dispatch(getAllSubCategoryStart());
    try {
        const res = await axiosInstance(REST_API_BASE_URL + '/danhmuccons', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch(getAllSubCategorySuccess(res.data));
    } catch (error) {
        dispatch(getAllSubCategoryFailed());
        console.log(error);
    }
};

// Upload image to server
export const uploadImageToFileSystem = async (selectedFile, variant_id) => {
    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('spMa', variant_id);
    try {
        const res = await axiosInstance.post('http://localhost:8081/image/fileSystem', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res.data;
    } catch (error) {
        console.error('Error uploading file', error);
    }
};
// DownLoad image product from server
export const downloadAllImageFromServerBySpMa = async (spMa) => {
    try {
        const token = localStorage.getItem('token');
        const res = await axiosInstance.get(`http://localhost:8081/image/fileSystems/${spMa}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data.result;
    } catch (error) {
        console.log(error);
    }
};
// Download all image products from server
export const downloadAllImage = async (token, dispatch) => {
    try {
        dispatch(getAllImageProductStart());
        const response = await axiosInstance.get('http://localhost:8081/images', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch(getAllImageProductSuccess(response.data));
    } catch (error) {
        dispatch(getAllImageProductFailed());
        console.log(error);
    }
};
// add product
export const addProduct = async (product, dispatch, token) => {
    dispatch(addProductStart());
    try {
        const res = await axiosInstance.post(REST_API_V1_URL + '/add-sanpham', product, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        dispatch(addProductSuccess(res.data));
        return res.data;
    } catch (error) {
        console.log(error);
        dispatch(addProductFailed());
    }
};
// get all product
export const getAllProduct = async (dispatch, token) => {
    dispatch(getAllProductStart());
    try {
        const res = await axiosInstance.get(REST_API_BASE_URL + '/sanphams', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch(getAllProductSuccess(res.data));
    } catch (error) {
        dispatch(getAllProductFailed());
        console.log(error);
    }
};

// delete product
export const deleteProduct = async (spMa, token) => {
    try {
        await axiosInstance.delete(REST_API_V1_URL + `/delete-sanpham/${spMa}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.log(error);
    }
};
// update product =================================================================
export const updateProduct = async (spMa, product) => {
    try {
        const token = localStorage.getItem('token');
        const res = await axiosInstance.put(REST_API_V1_URL + `/sanpham/${spMa}`, product, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.log(error);
    }
};

// update image product ==============================================================

export const updateImageProduct = async (files, variant_id) => {
    try {
        if (!files || files.length === 0) {
            throw new Error('Không có file nào được chọn để tải lên.');
        }

        const formData = new FormData();

        // Đảm bảo chỉ thêm File vào FormData
        files.forEach((fileObj) => {
            if (fileObj.file instanceof File) {
                formData.append('files', fileObj.file);
            } else {
                throw new Error('Dữ liệu không hợp lệ. file phải là File hoặc Blob.');
            }
        });

        formData.append('variant_id', variant_id);

        const token = localStorage.getItem('token');
        const res = await axiosInstance.post('http://localhost:8081/images/fileSystem', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data', // Đảm bảo header đúng
            },
        });
    } catch (error) {
        console.error('Lỗi khi tải lên ảnh:', error);
    }
};

// delete image product =============================================================
export const deleteImageById = async (id) => {
    try {
        const token = localStorage.getItem('token');
        await axiosInstance.delete(`http://localhost:8081/image/fileSystem/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.log(error);
    }
};

export const addColorProduct = async (color, token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        await axiosInstance.post(REST_API_BASE_URL + '/v1/add_color', color, config);
        toast.success('Thêm màu sản phẩm thành công!');
    } catch (error) {
        console.log(error);
        if (error.response && error.response.data && error.response.data.message) {
            toast.error(`Lỗi: ${error.response.data.message}`);
        } else {
            toast.error('Đã xảy ra lỗi khi thêm màu sản phẩm!');
        }
    }
};

export const getAllColorProduct = async () => {
    try {
        const res = await axiosInstance.get(REST_API_V1_URL + '/colors');
        return res.data.result;
    } catch (err) {
        console.error(err);
    }
};
export const getColorById = async (id) => {
    try {
        const res = await axiosInstance.get(REST_API_V1_URL + `/color/${id}`);
        return res.data;
    } catch (err) {
        console.error(err);
    }
};

export const addProductVariant = async (productVariant) => {
    try {
        const accessToken = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        const res = await axiosInstance.post(REST_API_V1_URL + '/add_product_variant', productVariant, config);
        return res.data;
    } catch (error) {
        toast.error('Đã xảy ra lỗi khi thêm phiên bản sản phẩm!');
        console.log(error);
    }
};

export const updateProductVariant = async (productVariant, variant_id) => {
    try {
        const accessToken = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        const res = await axiosInstance.put(
            REST_API_V1_URL + `/update_productVariant/${variant_id}`,
            productVariant,
            config,
        );
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getProductToShowManager = async () => {
    try {
        const accessToken = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        const res = await axiosInstance.get(REST_API_V1_URL + '/showSanPham', config);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const getProductById = async (id) => {
    try {
        const accessToken = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        const res = await axiosInstance.get(REST_API_V1_URL + `/sanpham/${id}`, config);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const getAllProductsVariantByProductID = async (id) => {
    try {
        const accessToken = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        const res = await axiosInstance.get(REST_API_V1_URL + `/productVariantsByProductID/${id}`, config);
        return res.data.result;
    } catch (error) {
        console.log(error);
    }
};
export const deleteProductVariant = async (id) => {
    try {
        const accessToken = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        await axiosInstance.delete(REST_API_V1_URL + `/delete_product_variant/${id}`, config);
    } catch (error) {
        console.log(error);
    }
};

export const getNewProduct = async () => {
    try {
        const res = await axiosInstance.get(REST_API_V1_URL + `/newProduct`);
        return res.data.result;
    } catch (error) {
        console.log(error);
    }
};
export const getBestSellerProduct = async () => {
    try {
        const res = await axiosInstance.get(REST_API_V1_URL + `/bestSellerProduct`);
        return res.data.result;
    } catch (error) {
        console.log(error);
    }
};
export const getFlashSaleProduct = async () => {
    try {
        const res = await axiosInstance.get(REST_API_V1_URL + `/flashSaleProduct`);
        return res.data.result;
    } catch (error) {
        console.log(error);
    }
};

export const getRecommendProduct = async () => {
    try {
        const res = await axiosInstance.get(REST_API_V1_URL + `/recommendProduct`);
        return res.data.result;
    } catch (error) {
        console.log(error);
    }
};
export const getProductDetail = async (productId) => {
    try {
        const res = await axiosInstance.get(REST_API_V1_URL + `/detailProduct/${productId}`);
        return res.data.result;
    } catch (error) {
        console.log(error);
    }
};

export const getListProductByIds = async () => {
    try {
        const productIds = getCookie('productIds');
        if (productIds.length === 0) return []; // Nếu không có ID nào, trả về mảng rỗng
        const queryString = productIds.join(','); // Chuyển mảng thành chuỗi query string
        const res = await axiosInstance.get(`${REST_API_V1_URL}/productsByIds?ids=${queryString}`);
        return res.data.result;
    } catch (error) {
        console.log(error);
        return [];
    }
};

//Get product by category
export const getListProductByCategory = async (dmcId, page, size, isSort) => {
    try {
        const res = await axiosInstance.get(
            `${REST_API_V1_URL}/productsByCategory/${dmcId}?page=${page}&size=${size}&isSort=${isSort}`,
        );
        return res.data.result;
    } catch (error) {
        console.log(error);
        return [];
    }
};

//Filter product
export const filterListProductByCategory = async (
    dmcId,
    page,
    size,
    isSort,
    sizeClothes = '',
    colorID = 0,
    fromPrice = 0,
    toPrice = 0,
) => {
    try {
        // Tạo một đối tượng queryParams để chỉ bao gồm các tham số cần thiết
        let queryParams = `?page=${page}&size=${size}&isSort=${isSort}`;

        // Chỉ thêm tham số nếu chúng không phải là giá trị mặc định
        if (sizeClothes) {
            queryParams += `&sizeClothes=${sizeClothes}`;
        }
        if (colorID) {
            queryParams += `&color=${colorID}`;
        }
        if (fromPrice) {
            queryParams += `&fromPrice=${fromPrice}`;
        }
        if (toPrice) {
            queryParams += `&toPrice=${toPrice}`;
        }

        const res = await axiosInstance.get(`${REST_API_V1_URL}/filterProduct/${dmcId}${queryParams}`);
        return res.data.result;
    } catch (error) {
        console.log(error);
        return [];
    }
};

//Add product to cart (before login)
export const addProductToCartRedis = async (productId, color, size, quantity) => {
    try {
        const guestCartId = localStorage.getItem('guestCartId');
        const res = await axios.post(
            `${REST_API_V1_URL}/${guestCartId}/add?productId=${productId}&size=${size}&color=${color}&quantity=${quantity}`,
        );
    } catch (error) {
        console.log(error);
    }
};
//Add product to cart (after login)

export const addProductToCart = async (username, productId, color, size, quantity) => {
    try {
        const accessToken = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        const res = await axiosInstance.post(
            `${REST_API_V1_URL}/addToCartAfterLogin?username=${username}&productID=${productId}&size=${size}&colorId=${color}&quantity=${quantity}`,
            config,
        );
    } catch (error) {
        console.log(error);
    }
};

// Get Product from cart before login
export const getProductFromCartRedis = async (dispatch) => {
    try {
        dispatch(addProductToCartStart());
        const guestCartId = localStorage.getItem('guestCartId');
        const res = await axios.get(REST_API_V1_URL + `/getCart/${guestCartId}`);
        dispatch(addProductToCartSuccess(res.data));
    } catch (error) {
        dispatch(addProductToCartFailed());
        console.log(error);
    }
};
// Get Product from cart after login
export const getProductFromCart = async (dispatch, username) => {
    try {
        dispatch(addProductToCartStart());
        const accessToken = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        const res = await axiosInstance.get(REST_API_V1_URL + `/getCartAfterLogin/${username}`, config);
        dispatch(addProductToCartSuccess(res.data));
    } catch (error) {
        dispatch(addProductToCartFailed());
        console.log(error);
    }
};

export const getProductInCart = async (productId, colorId) => {
    try {
        const res = await axios.get(`${REST_API_V1_URL}/productCart/${productId}?idColor=${colorId}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

//delete product in cart before login
export const deleteProductInCart = async (productid, size, colorId) => {
    try {
        const guestCartId = localStorage.getItem('guestCartId');
        const res = await axios.delete(
            `${REST_API_V1_URL}/${guestCartId}/removeCart?productId=${productid}&size=${size}&color=${colorId}`,
        );
    } catch (error) {
        console.log(error);
    }
};

//delete product in cart after login
export const deleteProductInCartAfterlogin = async (username, productId, color, size) => {
    try {
        const accessToken = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        const res = await axiosInstance.delete(
            `${REST_API_V1_URL}/removeCartAfterLogin?username=${username}&productId=${productId}&size=${size}&colorId=${color}`,
            config,
        );
    } catch (error) {
        console.log(error);
    }
};
//Get total price in cart
export const getTotalPriceInCart = async () => {
    try {
        const accessToken = localStorage.getItem('token');
        const decodedToken = jwtDecode(accessToken);
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        const res = await axiosInstance.get(`${REST_API_V1_URL}/priceCart/${decodedToken.sub}`, config);
        return res.data.result;
    } catch (error) {
        console.log(error);
    }
};

//Add product to favorites product
export const addProductToFavoritesProduct = async (username, productId) => {
    try {
        const accessToken = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        const res = await axiosInstance.post(
            `${REST_API_V1_URL}/favorite/add?username=${username}&productId=${productId}`,
            config,
        );
        return res.data.message;
    } catch (error) {
        console.log(error);
    }
};
//Get all favorites product by username
export const getAllProductsFavoriteByUsername = async (username, dispatch) => {
    dispatch(getAllProductFavoriteStart());
    try {
        const accessToken = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        const res = await axiosInstance.get(`${REST_API_V1_URL}/favorite/findAll/${username}`, config);
        dispatch(getAllProductFavoriteSuccess(res.data.result));
    } catch (error) {
        console.log(error);
    }
};

// Add new a address
export const addAddress = async (address) => {
    try {
        const accessToken = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        const res = await axiosInstance.post(`${REST_API_V1_URL}/address/add`, address, config);
        toast.success('Thêm địa chỉ thành công ');
    } catch (error) {
        console.log(error);
        toast.error('Thêm địa chỉ thất bại');
    }
};

// Get all addresses by username
export const getAllAddressByUsername = async (username, dispatch) => {
    dispatch(getAddressStart());
    try {
        const accessToken = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        const res = await axiosInstance.get(`${REST_API_V1_URL}/address/${username}`, config);
        dispatch(getAddressSuccess(res.data.result));
    } catch (error) {
        console.log(error);
        dispatch(getAddressFailed());
    }
};

//Delete the address
export const deleteAddress = async (username, idAddress) => {
    try {
        const accessToken = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        const res = await axiosInstance.delete(
            `${REST_API_V1_URL}/address/delete?username=${username}&id=${idAddress}`,
            config,
        );
    } catch (error) {
        console.log(error);
    }
};
//Update the address

export const updateAddress = async (address, idAddress) => {
    try {
        const accessToken = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        const res = await axiosInstance.put(`${REST_API_V1_URL}/address/update/${idAddress}`, address, config);
        toast.success('Cập nhật địa chỉ thành công ');
    } catch (error) {
        console.log(error);
        toast.error('Cập nhật địa chỉ thất bại');
    }
};
// Get suggestion when user searching
export const getSuggestion = async (query) => {
    try {
        const res = await axiosInstance.get(`${REST_API_V1_URL}/suggestion?query=${query}`);
        return res.data.result;
    } catch (error) {
        console.log(error);
    }
};
// Voucher api start at here
export const getAllVoucher = async () => {
    try {
        const accessToken = localStorage.getItem('token');
        if (!accessToken) {
            throw new Error('Không tìm thấy token!');
        }
        const res = await axiosInstance.get(`${REST_API_V1_URL}/khuyen-mai`, config);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

//Get product by category
export const getListProductBySearchLetters = async (
    query,
    page,
    size,
    isSort,
    sizeClothes = '',
    colorID = 0,
    fromPrice = 0,
    toPrice = 0,
) => {
    try {
        // Tạo một đối tượng queryParams để chỉ bao gồm các tham số cần thiết
        let queryParams = `?query=${encodeURIComponent(query)}&page=${page}&size=${size}&isSort=${isSort}`;

        // Chỉ thêm tham số nếu chúng không phải là giá trị mặc định
        if (sizeClothes) queryParams += `&sizeClothes=${encodeURIComponent(sizeClothes)}`;
        if (colorID) queryParams += `&color=${colorID}`;
        if (fromPrice) queryParams += `&fromPrice=${fromPrice}`;
        if (toPrice) queryParams += `&toPrice=${toPrice}`;

        const res = await axiosInstance.get(`${REST_API_V1_URL}/search${queryParams}`);
        return res.data.result;
    } catch (error) {
        console.log(error);
        return [];
    }
};

//Create Order
export const handleOrder = async (data) => {
    try {
        const accessToken = localStorage.getItem('token');
        if (!accessToken) {
            throw new Error('Không tìm thấy token!');
        }
        const res = await axiosInstance.post(`${REST_API_V1_URL}/order`, data, config);
        toast.success('Đặt hàng thành công!');
    } catch (err) {
        console.log(err);
    }
};
//Get all order by username
export const getAllOrderByUsername = async (username) => {
    try {
        const accessToken = localStorage.getItem('token');
        if (!accessToken) {
            throw new Error('Không tìm thấy token!');
        }
        const res = await axiosInstance.get(`${REST_API_V1_URL}/order/${username}`, config);
        return res.data.result;
    } catch (err) {
        console.log(err);
    }
};

//Get information product to show order managet(user)
export const getDataProductToShowOrder = async (variant_id, username) => {
    try {
        const accessToken = localStorage.getItem('token');
        if (!accessToken) {
            throw new Error('Không tìm thấy token!');
        }
        const res = await axiosInstance.get(
            `${REST_API_V1_URL}/productOrder/${variant_id}?username=${username}`,
            config,
        );
        return res.data.result;
    } catch (err) {
        console.log(err);
    }
};

//Get all order for page admin
export const getAllOrder = async (page) => {
    try {
        const accessToken = localStorage.getItem('token');

        if (!accessToken) {
            throw new Error('Không tìm thấy token!');
        }
        const res = await axiosInstance.get(`${REST_API_V1_URL}/orders?page=${page}`, config);
        return res.data.result;
    } catch (err) {
        console.log(err);
    }
};
// Lấy dữ liệu cho chức năng chỉnh sửa đơn hàng
export const getDataOrderToEdit = async (orderId) => {
    try {
        const accessToken = localStorage.getItem('token');
        if (!accessToken) {
            throw new Error('Không tìm thấy token!');
        }
        const res = await axiosInstance.get(`${REST_API_V1_URL}/order-edit/${orderId}`, config);
        return res.data.result;
    } catch (err) {
        console.log(err);
    }
};

// Duyệt đơn hàng
export const updateStatusOrder = async (orderId, data) => {
    try {
        const accessToken = localStorage.getItem('token');
        if (!accessToken) {
            throw new Error('Không tìm thấy token!');
        }
        const res = await axiosInstance.put(`${REST_API_V1_URL}/order-status/${orderId}`, data, config);
        toast.success('Cập nhật đơn hàng thành công!');
    } catch (err) {
        console.log(err);
        toast.error('Cập nhật đơn hàng không thành công!');
    }
};
// Get all data for feature order detail
export const getAllDataDetail = async (orderId) => {
    try {
        const accessToken = localStorage.getItem('token');
        if (!accessToken) {
            throw new Error('Không tìm thấy token!');
        }
        const res = await axiosInstance.get(`${REST_API_V1_URL}/order-detail/${orderId}`, config);
        return res.data.result;
    } catch (err) {
        console.log(err);
    }
};

// Dashboard ====================================================================================
// Get data fulldaily
export const getAllDataFullDaily = async () => {
    try {
        const accessToken = localStorage.getItem('token');
        if (!accessToken) {
            throw new Error('Không tìm thấy token!');
        }
        const res = await axiosInstance.get(`${REST_API_V1_URL}/revenue-fullDaily`, config);
        return res.data.result;
    } catch (err) {
        console.log(err);
    }
};

// Get data weekly
export const getAllDataWeekly = async () => {
    try {
        const accessToken = localStorage.getItem('token');
        if (!accessToken) {
            throw new Error('Không tìm thấy token!');
        }
        const res = await axiosInstance.get(`${REST_API_V1_URL}/revenue-weekly`, config);
        return res.data.result;
    } catch (err) {
        console.log(err);
    }
};

// Get data monthly
export const getAllDataMonthly = async () => {
    try {
        const accessToken = localStorage.getItem('token');
        if (!accessToken) {
            throw new Error('Không tìm thấy token!');
        }
        const res = await axiosInstance.get(`${REST_API_V1_URL}/revenue-monthly`, config);
        return res.data.result;
    } catch (err) {
        console.log(err);
    }
};

// Get data yearly
export const getAllDataYearly = async () => {
    try {
        const accessToken = localStorage.getItem('token');
        if (!accessToken) {
            throw new Error('Không tìm thấy token!');
        }
        const res = await axiosInstance.get(`${REST_API_V1_URL}/revenue-yearly`, config);
        return res.data.result;
    } catch (err) {
        console.log(err);
    }
};
// Chatbot ======================================================================
export const getResponseChatbot = async (question) => {
  try {
    const res = await axiosInstance.post(`${REST_API_V1_URL}/chatbot/ask`, { question }, config);
    return res.data.answer;
  } catch (err) {
    console.error(err);
    return "Xin lỗi, đã xảy ra lỗi khi xử lý yêu cầu.";
  }
};
// Payment
// Payment
// Payment
export const createPayment = async (amount, bankCode) => {
    try {
      const res = await axiosInstance.get(
        `${REST_API_V1_URL}/payment/create_payment?amount=${amount}&bankCode=${bankCode}&language=vn`
      );
      const urlPayment = res.data.data;
      return urlPayment; // ✅ Chỉ return URL
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  