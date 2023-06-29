package com.tsandbox.musicbackend.repository;

import com.tsandbox.musicbackend.document.Student;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends MongoRepository<Student, Integer> {
}
