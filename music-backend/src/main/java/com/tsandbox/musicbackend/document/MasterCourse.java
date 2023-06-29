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
public class MasterCourse {

    @Id
    public String _id;
    public String courseName;
    public String courseFee;
}
