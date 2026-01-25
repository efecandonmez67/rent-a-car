package com.rentacar.core.utilities.exceptions;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper=true)
public class ValidationProblemsDetails extends ProblemDetails {

    private Map<String, String> validationErrors;


}
