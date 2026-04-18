import api from '../services/api';

export interface CreateRentalRequest {
    carId: number;
    userId: number;
    dateStarted: string;
    rentedForDays: number;
}

export interface RentalResponse {
    id: number;
    carName: string;
    modelBrandName: string;
    dateStarted: string;
    rentedForDays: number;
    totalPrice: number;
}

class RentalService {

    rentCar(request: CreateRentalRequest) {
        return api.post('/rentals', request);
    }

    getRentalsByUserId(userId: number) {
        return api.get(`/rentals/user/${userId}`);
    }

}

export default new RentalService();