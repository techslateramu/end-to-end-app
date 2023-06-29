package com.tsandbox.musicbackend.controller;

import lombok.Builder;
import lombok.Data;


public class TeacherResponse {
    private String message;

    public void setMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return this.message;
    }
}
