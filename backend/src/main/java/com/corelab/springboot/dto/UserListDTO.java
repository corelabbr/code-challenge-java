package com.corelab.springboot.dto;

import com.corelab.springboot.domain.enums.Authorize;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

import java.io.Serializable;
import java.util.Collection;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserListDTO implements Serializable {
    private Long id;
    private String name;
    private String username;
    private String authorities;

    public void setAuthorities(String authorities) {
        String authoritiesStr = authorities;
        if (authorities.contains("[")) {
            authorities = authorities.replaceAll("\\[", "");
            authorities = authorities.replaceAll("]", "");
            String[] list = authorities.split(", ");
            authoritiesStr = "";
            for (String roleName : list) {
                authoritiesStr += Authorize.toEnum(roleName).getCod() + ",";
            }
            authoritiesStr = authoritiesStr.substring(0, authoritiesStr.length() - 1);
        }

        this.authorities = authoritiesStr;
    }

}
