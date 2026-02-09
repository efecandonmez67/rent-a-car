package com.rentacar.services.dtos.requests;


import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateRentalRequest {

    @NotNull
    private LocalDate dateStarted;

    @NotNull
    @Min(1)
    private int rentedForDays;

    @NotNull
    private int carId;
}
