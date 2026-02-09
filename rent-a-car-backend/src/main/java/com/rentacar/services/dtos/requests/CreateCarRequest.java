package com.rentacar.services.dtos.requests;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateCarRequest {

    @NotNull
    @Min(1)
    private int modelId;

    @NotNull
    @Min(0)
    private double dailyPrice;

    @Min(2000)
    private int modelYear;

    @NotBlank
    @Pattern(regexp = "^(0[1-9]|[1-7][0-9]|8[01]) [A-Z]{1,3} \\d{2,4}$", message = "Plaka formatı geçersiz! (Örn: 34 ABC 123)")
    private String plate;

    @Min(1)
    @jakarta.validation.constraints.Max(3)
    private int state;
}