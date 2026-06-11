package com.enviro.assessment.junior.exception;

public class InvestorNotFoundException extends RuntimeException {
    public InvestorNotFoundException() {
        super("Investor not found with ID");
    }
}