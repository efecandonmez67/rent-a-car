package com.rentacar.services.dtos.responses;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetAllRentalsResponse {

    private int id;
    private LocalDate dateStarted;
    private double totalPrice;
    private String carPlate; //modelmapper -- car -> plate




}
