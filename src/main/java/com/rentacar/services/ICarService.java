package com.rentacar.services;

import com.rentacar.services.dtos.requests.CreateCarRequest;
import com.rentacar.services.dtos.requests.UpdateBrandRequest;
import com.rentacar.services.dtos.requests.UpdateCarRequest;
import com.rentacar.services.dtos.responses.GetAllCarsResponse;
import com.rentacar.services.dtos.responses.GetByIdBrandResponse;
import com.rentacar.services.dtos.responses.GetByIdCarResponse;

import java.util.List;

public interface ICarService {

    List<GetAllCarsResponse> getAll();

    void add(CreateCarRequest createCarRequest);

    GetByIdCarResponse getById(int id);

    void update(UpdateCarRequest updateCarRequest);

    void delete(int id);

    List<GetAllCarsResponse> getAll(int page, int pageSize);
}
