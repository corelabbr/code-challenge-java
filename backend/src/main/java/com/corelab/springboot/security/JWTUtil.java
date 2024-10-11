package com.corelab.springboot.security;

import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import com.corelab.springboot.domain.User;
import com.corelab.springboot.domain.enums.Authorize;
import com.corelab.springboot.dto.UserTokenDTO;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JWTUtil {

	//importando configurações que foram definidas lá no arquivo aplication.properties
	@Value("${jwt.secret}")
	private String secret;

	@Value("${jwt.expiration}")
	private Long expiration;

	//método que gera o token
	public String generateToken(Long id, String username, String name) {
		UserTokenDTO user = new UserTokenDTO(id, username, name, "");
		Map<String, Object> extraClaims = new HashMap<>();
		extraClaims.put("username", username);
		extraClaims.put("name", name);
		extraClaims.put("sub", String.valueOf(id));
		return Jwts.builder().setSubject(String.valueOf(id)).setClaims(extraClaims).setExpiration(new Date(System.currentTimeMillis() + expiration))
				.signWith(SignatureAlgorithm.HS512, secret.getBytes()).compact();
	}

	public boolean tokenValido(String token) {

		Claims claims = getClaims(token);
		if (claims != null) {
			String username = (String) claims.get("username");
			Date expirationDate = claims.getExpiration();
			Date now = new Date(System.currentTimeMillis());
			if (username != null && expirationDate != null && now.before(expirationDate)) {
				return true;
			}
		}
		return false;

	}

	public String getUsername(String token) {
		Claims claims = getClaims(token);
		if (claims != null) {
			return (String) claims.get("username");
		}
		return null;
	}

	private Claims getClaims(String token) {
		try {
			return Jwts.parser().setSigningKey(secret.getBytes()).parseClaimsJws(token).getBody();
		}
		catch (Exception e) {
			return null;
		}
	}

}
