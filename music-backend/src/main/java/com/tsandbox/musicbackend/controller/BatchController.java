package com.tsandbox.musicbackend.controller;

import com.tsandbox.musicbackend.document.Batch;
import com.tsandbox.musicbackend.repository.BatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


import java.util.List;

@RestController
public class BatchController {

    private static final Logger logger = LoggerFactory.getLogger(TeacherController.class);

    @Autowired
    private BatchRepository batchRepository;

    @PostMapping("/addBatch")
    public BatchResponse addBatch(@RequestBody Batch batch){
        BatchResponse response = new BatchResponse();
        batchRepository.save(batch);
        logger.info("Added Batch : " + batch);
        response.setMessage("Added/Edited Batch : Success : " + batch.batchName);
        return response;
    }

    @GetMapping("/getBatches")
    public List<Batch> addBatch(){
        return batchRepository.findAll();
    }

}
