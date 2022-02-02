package org.chary.repository;

import org.chary.entity.UserlogEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserlogRepository extends JpaRepository<UserlogEntity, String> {
    // Basis-Funktionalität:       count, delete, deleteAll, deleteAll, deleteAllById, deleteById, existsById, findById, save
    // Extented-Funktionalität     exists, findAll, findBy, findOne
}
