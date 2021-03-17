package com.example.restapi.task3restapireact.services;

import com.example.restapi.task3restapireact.entities.CardTasks;
import com.example.restapi.task3restapireact.entities.Cards;

import java.util.List;

public interface CardServices {

    List<Cards> getAllCards();
    Cards addCard(Cards cards);
    Cards saveCard(Cards cards);
    Cards getCard(Long id);
    void deleteCard(Cards cards);

    List<CardTasks> getAllCardTasks();
    CardTasks addCardTask(CardTasks cardTasks);
    CardTasks saveCardTask(CardTasks cardTasks);
    CardTasks getCardTask(Long id);
    void deleteCardTask(CardTasks cardTasks);

    List<CardTasks> getOneCardTasks(Long id);

}
