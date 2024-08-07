import axios from 'axios';

const HouseByIdService = {

    updateStatusHouse: (id, status) => {
        return new Promise((resolve, reject) => {
            axios
                .put(`http://localhost:8080/api/houses/owner/${id}?status=${status}`)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },

    getAllHouseByPriceAndProvince: (currentPage = 0, nameSearch = "", province = "",distric = "", ward = "", minPrice = 0, maxPrice = 0) => {
        return new Promise((resolve, reject) => {
            const formattedProvince = province.replace(/\s/g, "_");
            const formattedDistric= distric.replace(/\s/g, "_");
            const formattedWard = ward.replace(/\s/g, "_");

            axios
                .get(`http://localhost:8080/api/doctor/search?page=${currentPage}&nameSearch=${nameSearch}&province=${formattedProvince}&distric=${formattedDistric}&ward=${formattedWard}&minPrice=${minPrice}&maxPrice=${maxPrice}`)
                .then(response => {
                    resolve(response.data);
                })
                .catch(function (err) {
                    reject(err => console.log(err));
                });
        });
    },

    findByOwnerIdAndNameAndStatus: (ownerId, name, status, currentPage) => {
        return new Promise((resolve, reject) => {
            axios
                .get(`http://localhost:8080/api/doctor/owner/search/${ownerId}?name=${name}&status=${status}&page=${currentPage}`)
                .then(response => {
                    resolve(response.data);
                })
                .catch(function (err) {
                    console.log(err)
                });
        })
    },
    findByOwnerId : (ownerId , currentPage) => {
        return new Promise((resolve, reject) => {
            axios
                .get(`http://localhost:8080/api/doctor/owner/listDoctor/${ownerId}?page=${currentPage}`)
                .then(response => {
                    resolve(response.data);
                })
                .catch(function (err) {
                    console.log(err)
                });
        })
    },
    getRevenueByOwnerId : (ownerId ) => {
        return new Promise((resolve, reject) => {
            axios
                .get(`http://localhost:8080/api/doctor/owner/revenue/${ownerId}`)
                .then(response => {
                    resolve(response);
                })
                .catch(function (err) {
                    console.log(err)
                });
        })
    },

};


export default HouseByIdService;
