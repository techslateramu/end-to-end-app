package com.tsandbox.musicbackend.repository;

import com.tsandbox.musicbackend.document.MasterCourse;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MasterCourseRepository extends MongoRepository<MasterCourse, Integer> {
}
