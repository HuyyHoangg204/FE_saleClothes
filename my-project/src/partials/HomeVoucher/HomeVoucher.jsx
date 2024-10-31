import ButtonSeeMore from "../../components/ButtonSeeMore";
import Voucher from "../../components/Voucher";

function HomeVoucher() {
    const vouchers = [
        {
            name: "Giảm 15%",
            noidung: "Voucher giảm 15% cho đơn từ 299k",
            hsd: "2024-10-31"
        },
        {
            name: "Freeship",
            noidung: "Voucher giảm 20k phí vận chuyển cho đơn từ 89k",
            hsd: "2024-10-31"
        },
        {
            name: "Freeship",
            noidung: "Voucher miễn phí vẫn chuyển cho đơn từ 199k",
            hsd: "2024-10-31"
        },
        {
            name: "Giảm 15%",
            noidung: "Voucher giảm 15% cho đơn từ 299k",
            hsd: "2024-10-31"
        }, {
            name: "Giảm 15%",
            noidung: "Voucher giảm 15% cho đơn từ 299k",
            hsd: "2024-10-31"
        }
    ]
    return ( <div className="flex flex-col items-center">
        <span className="text-3xl font-sans font-normal py-4">Ngập tràn Voucher</span>
        <div className="flex flex-row py-4 space-x-14 mb-4">
            {
                vouchers.slice(0,3).map((voucher,index) => <Voucher ten = {voucher.name} noidung={voucher.noidung} hsd={voucher.hsd}/>)
            }
        </div>
        <ButtonSeeMore/>
    </div> );
}

export default HomeVoucher;