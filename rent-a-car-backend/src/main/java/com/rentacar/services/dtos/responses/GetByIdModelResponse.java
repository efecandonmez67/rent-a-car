package com.rentacar.services.dtos.responses;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetByIdModelResponse {

    private int id;
    private String name;
    private String brandName;


}
