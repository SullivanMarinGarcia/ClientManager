package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Client;
import com.example.demo.repository.ClientRepository;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;




@RestController
@RequestMapping("/api/clients")
@CrossOrigin(origins = "http://127.0.0.1:5500")

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

    @DeleteMapping("/{id}")
    public void deleteClient(@PathVariable Long id) {
        clientRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    public Client updateClient(@PathVariable Long id, @RequestBody Client updatedClient) {

        
        Client client = clientRepository.findById(id).orElseThrow(() -> new RuntimeException("Client not found"));

        client.setName(updatedClient.getName());
        client.setEmail(updatedClient.getEmail());
        client.setPhoneNumber(updatedClient.getPhoneNumber());
        client.setAddress(updatedClient.getAddress());

        clientRepository.save(client);
        return client;
    }
    

}
