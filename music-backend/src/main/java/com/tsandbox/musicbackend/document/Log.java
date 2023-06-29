package com.tsandbox.musicbackend.document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document
@Getter
@Setter
@ToString
//@AllArgsConstructor
public class Log {

    @Id
    public String _id;
    public String userData;
    public String currentLog;
    public String changedLog;

}
