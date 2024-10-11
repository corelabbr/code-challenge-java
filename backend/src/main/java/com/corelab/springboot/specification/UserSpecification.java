package com.corelab.springboot.specification;

import com.corelab.springboot.domain.User;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;

public class UserSpecification {
    public static Specification<User> filterByParams(String name, String username) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Filtrar por título
            if (name != null) {
                predicates.add(criteriaBuilder.like(root.get("name"), "%" + name + "%"));
            }

            // Filtrar por detalhe
            if (username != null) {
                predicates.add(criteriaBuilder.like(root.get("username"), "%" + username + "%"));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}

