package com.rentacar.services;

import com.rentacar.entities.concretes.Brand;
import com.rentacar.repositories.BrandRepository;
import com.rentacar.services.dtos.requests.CreateBrandRequest;
import com.rentacar.services.dtos.requests.UpdateBrandRequest;
import com.rentacar.services.dtos.responses.GetAllBrandsResponse;
import com.rentacar.services.dtos.responses.GetByIdBrandResponse;
import com.rentacar.services.rules.BrandBusinessRules;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class BrandServiceImpl implements IBrandService {

    private final BrandRepository brandRepository;
    private final ModelMapper modelMapper;

    private BrandBusinessRules brandBusinessRules;

    @Override
    public List<GetAllBrandsResponse> getAll() {
        List<Brand> brands = brandRepository.findAll();

        List<GetAllBrandsResponse> brandsResponse = brands.stream()
                .map(brand -> modelMapper.map(brand, GetAllBrandsResponse.class))
                .collect(Collectors.toList());

        return brandsResponse;
    }

    @Override
    public void add(CreateBrandRequest createBrandRequest) {

        this.brandBusinessRules.checkIfBrandExists(createBrandRequest.getName());
        Brand brand = modelMapper.map(createBrandRequest, Brand.class);
        this.brandRepository.save(brand);
    }

    @Override
    public GetByIdBrandResponse getById(int id) {

        Brand brand = this.brandRepository.findById(id).orElseThrow();

        GetByIdBrandResponse getByIdBrandResponse = this.modelMapper.map(brand, GetByIdBrandResponse.class);

        return getByIdBrandResponse;
    }

    @Override
    public void update(UpdateBrandRequest updateBrandRequest) {

        Brand brand = this.modelMapper.map(updateBrandRequest, Brand.class);

        this.brandRepository.save(brand);
    }

    @Override
    public void delete(int id) {

        this.brandRepository.deleteById(id);

    }
}