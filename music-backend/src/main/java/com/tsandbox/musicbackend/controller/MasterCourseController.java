package com.tsandbox.musicbackend.controller;

import com.tsandbox.musicbackend.document.MasterCourse;
import com.tsandbox.musicbackend.repository.MasterCourseRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MasterCourseController {

    private static final Logger logger = LoggerFactory.getLogger(MasterCourseController.class);

    @Autowired
    private MasterCourseRepository masterCourseRepository;

    @PostMapping("/addMasterCourse")
    public MasterCourseResponse addMasterCourse(@RequestBody MasterCourse masterCourse){
        MasterCourseResponse response = new MasterCourseResponse();
        masterCourseRepository.save(masterCourse);
        logger.info("Added Master Course : " + masterCourse);
        response.setMessage("Added/Edited Master Course : Success : " + masterCourse.courseName);
        return response;
    }

    @GetMapping("/getAllMasterCourses")
    public List<MasterCourse> getAllMasterCourses(){
        return masterCourseRepository.findAll()
        ;
    }

}
