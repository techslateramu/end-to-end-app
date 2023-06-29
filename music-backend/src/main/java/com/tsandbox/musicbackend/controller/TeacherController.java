package com.tsandbox.musicbackend.controller;

import com.tsandbox.musicbackend.document.Log;
import com.tsandbox.musicbackend.document.Teacher;
import com.tsandbox.musicbackend.repository.TeacherRepository;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
public class TeacherController {

    private static final Logger logger = LoggerFactory.getLogger(TeacherController.class);

    @Autowired
    public TeacherRepository teacherRepository;

    @PostMapping("/addTeacher")
    public TeacherResponse addTeacher(@RequestBody Teacher teacher) {
        TeacherResponse response = new TeacherResponse();
        logger.info("Added Faculty : " + teacher);
        teacherRepository.save(teacher);
        response.setMessage("Added/Edited Faculty : Success : " + teacher.firstName);

//        LogController log = new LogController();
//        Log l = new Log();
//        l.currentLog="curr";
//        l.changedLog="changed";
//        l.userData="user";
//        l._id="124";
//
//        log.addLog(l);

        return response;
    }

    @GetMapping("/getAllTeachers")
    public List<Teacher> getAllTeachers() {
            return teacherRepository.findAll();
        }

    @GetMapping("/test")
    public String test() {
        return "Hello test";
    }
}
