package com.tsandbox.musicbackend.document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;


@Document
@Getter
@Setter
@ToString
@AllArgsConstructor
public class Batch {

    @Id
    public String _id;
    public String batchName;
    public String batchType;
    public String batchFaculty;
    public List<String> batchDays;
    public String batchTime;
    public String batchStartDate;
    public String batchStatus;
}
