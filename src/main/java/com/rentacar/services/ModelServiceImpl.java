package com.rentacar.services;

import com.rentacar.entities.concretes.Brand;
import com.rentacar.entities.concretes.Model;
import com.rentacar.repositories.BrandRepository;
import com.rentacar.repositories.ModelRepository;
import com.rentacar.services.dtos.requests.CreateModelRequest;
import com.rentacar.services.dtos.requests.UpdateModelRequest;
import com.rentacar.services.dtos.responses.GetAllModelsResponse;
import com.rentacar.services.dtos.responses.GetByIdModelResponse;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ModelServiceImpl implements IModelService{

    private final ModelRepository modelRepository;
    private final ModelMapper modelMapper;
    private final BrandRepository brandRepository;

    @Override
    public List<GetAllModelsResponse> getAll() {
        List<Model> models = modelRepository.findAll();

        List<GetAllModelsResponse> modelsResponse = models.stream()
                .map(model -> modelMapper.map(model, GetAllModelsResponse.class))
                .collect(Collectors.toList());

        return modelsResponse;
    }

    @Override
    public void add(CreateModelRequest createModelRequest) {
        Model model = this.modelMapper.map(createModelRequest, Model.class);

        model.setId(0);

        Brand brand = this.brandRepository.findById(createModelRequest.getBrandId())
                .orElseThrow(() -> new RuntimeException("Böyle bir marka bulunamadı!"));

        model.setBrand(brand);

        this.modelRepository.save(model);
    }

    @Override
    public GetByIdModelResponse getById(int id) {
        Model model= this.modelRepository.findById(id).orElseThrow();
        return this.modelMapper.map(model, GetByIdModelResponse.class);
    }

    @Override
    public void update(UpdateModelRequest updateModelRequest) {

        Model model = this.modelRepository.findById(updateModelRequest.getId())
                .orElseThrow(() -> new RuntimeException("Model bulunamadı."));

        this.modelMapper.map(updateModelRequest, model);

        Brand brand = this.brandRepository.findById(updateModelRequest.getBrandId())
                .orElseThrow(() -> new RuntimeException("Marka bulunamadı."));

        model.setBrand(brand);

        this.modelRepository.save(model);
    }

    @Override
    public void delete(int id) {

        this.modelRepository.deleteById(id);

    }
}
