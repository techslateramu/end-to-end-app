package com.tsandbox.musicbackend.controller;

import com.tsandbox.musicbackend.document.Student;
import com.tsandbox.musicbackend.repository.StudentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class StudentController {

    private static final Logger logger = LoggerFactory.getLogger(StudentController.class);

    @Autowired
    private StudentRepository studentRepository;

    @PostMapping("/addStudent")
    public StudentResponse addStudent(@RequestBody Student student){
        StudentResponse response = new StudentResponse();
      studentRepository.save(student);
        logger.info("Added/Edited Student : " + student);
        response.setMessage("Added/Edited Batch : Success : " + student.firstName);
        return response;
    }

    @GetMapping("/getAllStudents")
    public List<Student> addBatch(){
        return studentRepository.findAll();
    }

}
