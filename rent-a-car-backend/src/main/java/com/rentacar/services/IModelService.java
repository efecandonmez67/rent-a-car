package com.rentacar.services;


import com.rentacar.services.dtos.requests.CreateModelRequest;
import com.rentacar.services.dtos.requests.UpdateModelRequest;
import com.rentacar.services.dtos.responses.GetAllModelsResponse;
import com.rentacar.services.dtos.responses.GetByIdModelResponse;

import java.util.List;

public interface IModelService {
    List<GetAllModelsResponse> getAll();
    void add(CreateModelRequest createModelRequest);

    GetByIdModelResponse getById(int id);

    void update(UpdateModelRequest updateModelRequest);

    void delete(int id);


}
