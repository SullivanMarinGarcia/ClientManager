package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Client;
import com.example.demo.repository.ClientRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/api/clients")
public class ClientController {
    

    @Autowired
    private ClientRepository clientRepository;

    @GetMapping
    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    @PostMapping()
    public void createClient(@RequestBody Client client) {
        clientRepository.save(client);
    }
    

}
