package com.example.restapi.task3restapireact.services.impl;

import com.example.restapi.task3restapireact.entities.CardTasks;
import com.example.restapi.task3restapireact.entities.Cards;
import com.example.restapi.task3restapireact.repositories.CardRepository;
import com.example.restapi.task3restapireact.repositories.CardTasksRepository;
import com.example.restapi.task3restapireact.services.CardServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CardServiceImpl implements CardServices {

    @Autowired
    CardRepository cardRepository;

    @Autowired
    CardTasksRepository cardTasksRepository;

    @Override
    public List<Cards> getAllCards() {
        return cardRepository.findAll();
    }

    @Override
    public Cards addCard(Cards cards) {
        return cardRepository.save(cards);
    }

    @Override
    public Cards saveCard(Cards cards) {
        return cardRepository.save(cards);
    }

    @Override
    public Cards getCard(Long id) {
        return cardRepository.findById(id).get();
    }

    @Override
    public void deleteCard(Cards cards) {
        cardRepository.delete(cards);
    }

    @Override
    public List<CardTasks> getAllCardTasks() {
        return cardTasksRepository.findAll();
    }

    @Override
    public CardTasks addCardTask(CardTasks cardTasks) {
        return cardTasksRepository.save(cardTasks);
    }

    @Override
    public CardTasks saveCardTask(CardTasks cardTasks) {
        return cardTasksRepository.save(cardTasks);
    }

    @Override
    public CardTasks getCardTask(Long id) {
        return cardTasksRepository.findById(id).get();
    }

    @Override
    public void deleteCardTask(CardTasks cardTasks) {
        cardTasksRepository.delete(cardTasks);
    }

    @Override
    public List<CardTasks> getOneCardTasks(Long id) {
        return cardTasksRepository.findAllByCards_Id(id);
    }
}
