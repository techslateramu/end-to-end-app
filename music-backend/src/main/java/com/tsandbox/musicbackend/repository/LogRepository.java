package com.tsandbox.musicbackend.repository;

import com.tsandbox.musicbackend.document.Log;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LogRepository extends MongoRepository<Log, Integer> {
}
