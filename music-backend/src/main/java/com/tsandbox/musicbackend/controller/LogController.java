package com.tsandbox.musicbackend.controller;

import com.tsandbox.musicbackend.document.Log;
import com.tsandbox.musicbackend.repository.LogRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@Slf4j
public class LogController {

    @Autowired
    private LogRepository logRepository;

    @PostMapping("/addLog")
    public String addLog(@RequestBody Log log){
        System.out.println(log);
        logRepository.save(log);
        return "Log added : Success";
    }
}
