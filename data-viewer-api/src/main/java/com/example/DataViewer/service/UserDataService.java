package com.example.DataViewer.service;

import com.example.DataViewer.entities.UserData;
import com.example.DataViewer.repository.UserDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserDataService {

    @Autowired
    private UserDataRepository userDataRepository;

    public void savaUserData(List<UserData> userData) {
        userDataRepository.saveAll(userData);
    }

    public List<UserData> getAllUserData() {
        return userDataRepository.findAll();
    }
}
