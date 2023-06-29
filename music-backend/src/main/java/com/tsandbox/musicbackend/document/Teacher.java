package com.tsandbox.musicbackend.document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Document
@Getter
@Setter
@ToString
@AllArgsConstructor
public class Teacher<id> {

    @Id
    public String _id;
    public String firstName;
    public String lastName;
    public String mobileNumber;
    public String email;
    public String occupation;
    public List<String> preferredDays;
    public List<String> skill;
    public List<String> preferredTime;
    public String comments;
    public String salary;
    public String doj;
    public String status;
    public List<PaidSalary> paidSalary;
    public String employeeType;

}

class PaidSalary {
    public String payMonth;
    public String payYear;
    public String payMode;
    public String currentSalary;
    public String paidSalary;
    public Date paidDate;
    public String loggedInUser;
}