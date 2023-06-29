package com.tsandbox.musicbackend.repository;

import com.tsandbox.musicbackend.document.Batch;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BatchRepository extends MongoRepository<Batch, Integer> {
}
