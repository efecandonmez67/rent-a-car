package com.rentacar.core.utilities.exceptions;

import com.rentacar.core.utilities.exceptions.BusinessException;
import com.rentacar.core.utilities.exceptions.ProblemDetails;
import com.rentacar.core.utilities.exceptions.ValidationProblemsDetails;
import org.springframework.beans.factory.parsing.Problem;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BusinessException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ProblemDetails handleBusinessException(BusinessException exception) {

        ProblemDetails problemDetails = new ProblemDetails();
        problemDetails.setMessage(exception.getMessage());
        problemDetails.setCode("BUSINESS_RULE_VIOLATION");

        return problemDetails;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ValidationProblemsDetails handleValidationProblems(MethodArgumentNotValidException exception) {

        ValidationProblemsDetails validationProblemsDetails = new ValidationProblemsDetails();
        validationProblemsDetails.setMessage("VALIDATION.EXCEPTION");
        validationProblemsDetails.setCode("VALIDATION_ERROR");

        HashMap<String, String> validationErrors = new HashMap<>();

        for(FieldError fieldError : exception.getBindingResult().getFieldErrors()) {
            validationErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
        }

        validationProblemsDetails.setValidationErrors(validationErrors);

        return validationProblemsDetails;

    }
}