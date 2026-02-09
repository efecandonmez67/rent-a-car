package com.rentacar.services;

import com.rentacar.services.dtos.requests.CreateBrandRequest;
import com.rentacar.services.dtos.requests.UpdateBrandRequest;
import com.rentacar.services.dtos.responses.GetAllBrandsResponse;
import com.rentacar.services.dtos.responses.GetByIdBrandResponse;

import java.util.List;

public interface IBrandService {
    List<GetAllBrandsResponse> getAll();

    void add(CreateBrandRequest createBrandRequest);

    GetByIdBrandResponse getById(int id);

    void update(UpdateBrandRequest updateBrandRequest);

    void delete(int id);
}