package com.rentacar.services.rules;

import com.rentacar.core.utilities.exceptions.BusinessException;
import com.rentacar.repositories.BrandRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class BrandBusinessRules {

    private BrandRepository brandRepository;

    public void checkIfBrandExists(String name) {
        if(brandRepository.existsByName(name)) {
            throw new BusinessException("Brand name already exists");
        }
    }
}
