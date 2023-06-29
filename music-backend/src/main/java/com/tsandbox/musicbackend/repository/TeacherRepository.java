package com.tsandbox.musicbackend.repository;

import com.tsandbox.musicbackend.document.Teacher;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeacherRepository extends MongoRepository<Teacher, Integer> {

}
