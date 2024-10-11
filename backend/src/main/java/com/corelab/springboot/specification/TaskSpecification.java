package com.corelab.springboot.specification;

import com.corelab.springboot.domain.Task;
import org.springframework.data.jpa.domain.Specification;
import javax.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class TaskSpecification {
    public static Specification<Task> filterByParams(Long userId, String title, String detail, String color, Boolean favorite, Date startDate, Date endDate) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Filtrar por userId
            if (userId != null) {
                predicates.add(criteriaBuilder.equal(root.get("user").get("id"), userId));
            }

            // Filtrar por título
            if (title != null) {
                predicates.add(criteriaBuilder.like(root.get("title"), "%" + title + "%"));
            }

            // Filtrar por detalhe
            if (detail != null) {
                predicates.add(criteriaBuilder.like(root.get("detail"), "%" + detail + "%"));
            }

            // Filtrar por cor
            if (color != null) {
                predicates.add(criteriaBuilder.equal(root.get("color"), color));
            }

            // Filtrar por favorito
            if (favorite != null) {
                predicates.add(criteriaBuilder.equal(root.get("favorite"), favorite));
            }

            // Filtrar por range de datas (se ambos os parâmetros estiverem presentes)
            if (startDate != null && endDate != null) {
                predicates.add(criteriaBuilder.between(root.get("date"), startDate, endDate));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}

