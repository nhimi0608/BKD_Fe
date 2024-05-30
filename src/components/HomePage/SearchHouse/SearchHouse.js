import React, {useEffect, useState} from 'react';
import _ from "lodash";
import {getAllProvinces} from "../../../service/addressService";
import {getAllDistrictsByProvinceId} from "../../../service/addressService";
import {getAllWardsByDistrictId} from "../../../service/addressService";

const SearchHouse = ({setNameSearch, setProvince, setDistrict, setWard, setMinPrice, setMaxPrice, setCurrentPage}) => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [provinceName, setProvinceName] = useState("");
    const [districtName, setDistrictName] = useState("");

    const handleNameSearchChange = (event) => {
        setCurrentPage(1);
        setNameSearch(event.target.value)
    };
    const handleOptionLocalChange = (event) => {
        setCurrentPage(1);
        const provinceOption = event.target.value;
        if (provinceOption !== "Tỉnh") {
            setProvince(event.target.value)
            console.log(event.target.value)
            setProvinceName(event.target.value)   
        }
        else setProvince("");
    };
    const handleOptionLocalChangeDistric = (event) => {
        setCurrentPage(1);
        const districOption = event.target.value;
        if (districOption !== "Huyện") {
            setDistrict = event.target.value
            setDistrictName(event.target.value)
        }
        else setDistrict("");
    };
    const handleOptionLocalChangeWard = (event) => {
        setCurrentPage(1);
        const wardOption = event.target.value;
        if (wardOption !== "Xã") {
            setWard(event.target.value)
        }
        else setWard("");
    };


    useEffect(() => {
        getAllProvinces().then(response => {
            setProvinces(response.data.data);
        }).catch(error => {
            console.log(error)
        })
    }, [])
    useEffect(() => {
        if (provinceName) {
            const province = provinces.find(item => item.ProvinceName === provinceName);
            if (province) {
                getAllDistrictsByProvinceId(province.ProvinceID).then(response => {
                    setDistricts(response.data.data);
                    setDistrictName()
                }).catch(error => {
                    console.log(error)
                })
            }
        } else {
            setDistricts([]);
            setDistrictName("");
        }
    }, [provinceName])
    useEffect(() => {
        if (districtName) {
            const district = districts.find(item => item.DistrictName === districtName);
            if (district) {
                getAllWardsByDistrictId(district.DistrictID).then(response => {
                    setWards(response.data.data);
                }).catch(error => {
                    console.log(error)
                })
            }
        } else {
            setWards([]);
        }
    }, [districtName])



    // //////////

    return (
        <>
        <div className="container-fluid mb-5" style={{padding: "35px", backgroundColor: "rgb(0,185,142)"}}>
            <div className="container">
                <div className="row g-2">
                    <div className="col-md-10">
                        <div className="row g-2">
                            <div className="col-md-3">
                                <input type="text" className="form-control border-0 py-3"
                                       placeholder="Nhập từ khóa tìm kiếm"
                                       onChange={handleNameSearchChange}/>
                            </div>
                            <div className="col-md-3">
                                <select className="form-select border-0 py-3" onChange={handleOptionLocalChange}>
                                    <option>Tỉnh</option>
                                    {!_.isEmpty(provinces) && provinces.map(province => (
                                        <option key={province.ProvinceID}
                                                value={province.ProvinceName}>
                                            {province.ProvinceName}
                                        </option>
                                    ))}
                                </select>
                                
                            </div>
                            <div className="col-md-3">
                                <select className="form-select border-0 py-3" onChange={handleOptionLocalChangeDistric}>
                                    <option>Huyện</option>
                                    {!_.isEmpty(districts) && districts.map(district => (
                                        <option key={district.DistrictID}
                                                value={district.DistrictName}>
                                            {district.DistrictName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-3">
                                <select className="form-select border-0 py-3" onChange={handleOptionLocalChangeWard}>
                                    <option>Xã</option>
                                    {!_.isEmpty(wards) && wards.map(ward => (
                                        <option key={ward.WardCode} value={ward.WardName}>
                                            {ward.WardName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-dark border-0 w-100 py-3">Tìm kiếm</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default SearchHouse;