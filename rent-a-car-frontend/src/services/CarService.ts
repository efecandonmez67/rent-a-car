import api from "../services/api";

export const getAllCars = async () => {
    return await api.get("/cars");
};