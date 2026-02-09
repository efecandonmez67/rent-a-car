package com.rentacar.services.dtos.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetByIdCarResponse {

    private int id;
    private String plate;
    private double dailyPrice;
    private int modelYear;
    private int state;
    private String modelName;
    private String modelBrandName;


}
