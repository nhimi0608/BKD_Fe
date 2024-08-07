import React, {useEffect, useState} from 'react';
import houseByIdService from "../../service/HouseByIdService";
import Banner from "./Banner/Banner";
import SearchHouse from "./SearchHouse/SearchHouse";
import Top5BookingHouse from "./Top5/Top5BookingHouse";
import HouseComponent from "./House/HouseComponent";
import AdminTeam from "./AdminTeam/AdminTeam";
import StarsReview from "./StarsReview/StarsReview";
const HomePage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [nameSearch, setNameSearch] = useState("");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [province, setProvince] = useState("");
    const [district, setDistrict] = useState("");
    const [ward, setWard] = useState("");
    const [houses, setHouses] = useState([]);
    const changePage = (e, value) => {
        setCurrentPage(value);
    }

    const getAllHouseByPriceAndProvince = (currentPage, nameSearch, province, district, ward, minPrice, maxPrice) => {
        houseByIdService.getAllHouseByPriceAndProvince(currentPage, nameSearch, province, district, ward, minPrice, maxPrice)
            .then((houses) => {
                setHouses(houses.content);
                setTotalPages(houses.totalPages);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getAllHouseByPriceAndProvince(currentPage - 1, nameSearch, province,district,ward, minPrice, maxPrice)
    }, [currentPage, nameSearch, province,district,ward, minPrice, maxPrice])


    return (
        <div className="container-home">
            <Banner/>

            <div className="container py-3">
                <h2 className="text-center mb-5">Top 5 bác sĩ có nhiều lượt đặt nhất</h2>
                <Top5BookingHouse/>
                <br/>
                <br/>
                {/*Search begin*/}
                <SearchHouse setNameSearch={setNameSearch} setMinPrice={setMinPrice}
                             setMaxPrice={setMaxPrice} setProvince={setProvince} setDistrict={setDistrict} 
                             setWard={setWard} setCurrentPage={setCurrentPage}/>
                {/*Search End*/}
                <h2 className="text-center m-5">Danh sách các bác sĩ</h2>
                <HouseComponent houses={houses} totalPages={totalPages} changePage={changePage}/>

                <AdminTeam/>
            </div>
        </div>
    );
};

export default HomePage;
