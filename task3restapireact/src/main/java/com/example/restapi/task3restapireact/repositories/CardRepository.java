package com.example.restapi.task3restapireact.repositories;

import com.example.restapi.task3restapireact.entities.Cards;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface CardRepository extends JpaRepository<Cards, Long> {

}
