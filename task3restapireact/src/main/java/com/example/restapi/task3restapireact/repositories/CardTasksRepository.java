package com.example.restapi.task3restapireact.repositories;

import com.example.restapi.task3restapireact.entities.CardTasks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface CardTasksRepository extends JpaRepository<CardTasks, Long> {
    List<CardTasks> findAllByCards_Id(Long id);
}
