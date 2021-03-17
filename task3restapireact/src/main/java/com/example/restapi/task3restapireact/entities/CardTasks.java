package com.example.restapi.task3restapireact.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;

@Entity
@Table(name = "t_card_tasks")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CardTasks implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    private Cards cards;

    @Column(name = "task_text")
    private String taskText;

    @Column(name = "added_date")
    private Timestamp addedDate;

    @Column(name = "is_done")
    private boolean isDone;
}
