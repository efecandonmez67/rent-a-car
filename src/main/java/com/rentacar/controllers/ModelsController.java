package com.rentacar.controllers;


import com.rentacar.services.IModelService;
import com.rentacar.services.dtos.requests.CreateBrandRequest;
import com.rentacar.services.dtos.requests.CreateModelRequest;
import com.rentacar.services.dtos.requests.UpdateBrandRequest;
import com.rentacar.services.dtos.requests.UpdateModelRequest;
import com.rentacar.services.dtos.responses.GetAllModelsResponse;
import com.rentacar.services.dtos.responses.GetByIdBrandResponse;
import com.rentacar.services.dtos.responses.GetByIdModelResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/models")
@AllArgsConstructor
public class ModelsController {

    private final IModelService modelService;

    @GetMapping
    public List<GetAllModelsResponse> getAll() {
        return modelService.getAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void add(@RequestBody @Valid CreateModelRequest createModelRequest) {
        this.modelService.add(createModelRequest);
    }

    @GetMapping("/{id}")
    public GetByIdModelResponse getById(@PathVariable int id) {
        return modelService.getById(id);
    }

    @PutMapping
    public void update(@RequestBody UpdateModelRequest updateModelRequest) {
        this.modelService.update(updateModelRequest);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
        this.modelService.delete(id);
    }
}
