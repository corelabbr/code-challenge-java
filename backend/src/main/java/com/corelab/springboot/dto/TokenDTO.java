package com.corelab.springboot.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TokenDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private String token;

}
