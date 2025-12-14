package com.rentacar.services.dtos.requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateModelRequest {

    private int id;

    @NotBlank
    @Size(min = 3, max = 20)
    private String name;

    private int brandId;

}
