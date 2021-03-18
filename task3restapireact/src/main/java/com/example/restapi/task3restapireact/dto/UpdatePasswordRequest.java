package com.example.restapi.task3restapireact.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdatePasswordRequest implements Serializable {

    private String oldPassword;
    private String newPassword;
    private String passwordConfirm;
}
