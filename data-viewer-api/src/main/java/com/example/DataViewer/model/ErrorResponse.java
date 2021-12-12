package com.example.DataViewer.model;

import org.springframework.stereotype.Component;

@Component
public class ErrorResponse {

    private String message;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
