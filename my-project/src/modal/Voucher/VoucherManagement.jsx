import React, { useEffect, useState } from 'react';
import VoucherCard from './VoucherCard';
import AddVoucher from './AddVoucher';
import { getAllVoucher } from '../../redux/voucherSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';

const VoucherManagement = () => {

    const [addvoucher, setAddVoucher] = useState(false);
    const [searchField, setSearchField] = useState("")
    const [indexPage, setIndexPage] = useState(1)
    const dispatch = useDispatch()
    const {vouchers, loading, error} = useSelector((state) => state.voucher)
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(0);
    const activeButton = "bg-slate-300 shadow-lg p-3 m-2 rounded-lg"
    const button = "bg-slate-50 shadow-lg p-3 m-2"

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };
    const nextPage = () => {
        setIndexPage((prev) => prev + 1)
    }
    const prevPage = () => {
        setIndexPage((prev) => {
            return prev > 0 ? prev - 1 : 0; 
        })
    }

    useEffect(() =>{
        dispatch(getAllVoucher(indexPage))
    }, [indexPage])
    
    if(error){
        toast.error(error)
    }
    return (
        <div className="flex flex-col mt-2 p-2 h-full px-7 w-full relative">
            {addvoucher && (
                <div className="h-[70%] w-[65%] top-[50%]  left-[60%] fixed transform -translate-x-1/2 -translate-y-1/2 bg-white z-10">
                    <AddVoucher ren={() => setAddVoucher(!addvoucher)}/>
                </div>
            )}
            <h1 className="text-2xl font-bold">Voucher Management</h1>
            <div className="flex flex-row gap-10 items-center mt-10 mx-30 w-full h-[90px] justify-between">
                <div className="bg-gray-200 flex flex-col justify-center shrink-0 shadow-lg w-[25%] rounded-xl h-full">
                    <div className="ml-4">Active Vouchers</div>
                    <h1 className="ml-4 text-xl font-semibold">24</h1>
                </div>
                <div className="bg-gray-200 flex flex-col justify-center shrink-0 shadow-lg w-[25%] rounded-xl h-full">
                    <div className="ml-4">Used today</div>
                    <h1 className="ml-4 text-xl font-semibold">24</h1>
                </div>
                <div className="bg-gray-200 flex flex-col justify-center shrink-0 shadow-lg w-[25%] rounded-xl h-full">
                    <div className="ml-4">Expring soon</div>
                    <h1 className="ml-4 text-xl font-semibold">24</h1>
                </div>
            </div>
            <div className="flex flex-row gap-16 mt-9 w-full h-[8%] ">
                <input
                    value={searchField}
                    type="text"
                    onChange={(e) => setSearchField(e.target.value)}
                    className="rounded-lg w-full h-full p-3 shadow-lg border-opacity-30 border-gray-400 bg-slate-50"
                    placeholder="Search Vouchers..."
                />
                <div className="flex flex-row justify-evenly w-full h-full">
                    <select
                        id="1"
                        className="rounded-[7px] text-nowrap w-[40%] h-full font-normal p-2 text-xs border-opacity-30 shadow-lg border-gray-500"
                        defaultValue="Filter voucher"
                    >
                    </select>
                    <button
                        className="h-full flex justify-evenly items-center font-semibold text-lg rounded-lg bg-primary-400 text-white w-[40%]"
                        onClick={() => setAddVoucher(!addvoucher)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            className="fill-current text-white"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M5 12h14"></path>
                            <path d="M12 5v14"></path>
                        </svg>
                        <p>Add voucher</p>
                    </button>
                </div>
            </div>
            <div className="flex flex-wrap w-full gap-10 justify-evenly mt-7 mb-9">
                {vouchers?.map((voucher) =>{
                    return(
                        <div key={voucher.id} className="w-[40%] bg-white rounded-lg shadow-lg p-5 mt-1">
                            <VoucherCard>{voucher}</VoucherCard>
                        </div>
                    )
                })}
            </div>
            {!addvoucher && (
                <div className="w-full flex flex-row justify-center">
                    <button
                        onClick={prevPage}
                        className="bg-slate-50 shadow-lg p-2 m-3">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                            />
                        </svg>
                    </button>
                    <button onClick={(e) => setIndexPage(0)} className={indexPage === 0 ? activeButton : button}>1</button>
                    <button onClick={(e) => setIndexPage(1)} className={indexPage === 1 ? activeButton : button}>2</button>
                    <button onClick={(e) => setIndexPage(2)} className={indexPage === 2 ? activeButton : button}>3</button>
                    <button onClick={nextPage}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                            />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
};
export default VoucherManagement;
