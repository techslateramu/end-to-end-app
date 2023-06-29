package com.tsandbox.musicbackend.document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Document
@Getter
@Setter
@ToString
@AllArgsConstructor
public class Student {

    @Id
    public String _id;
    public String firstName;
    public String lastName;
    public String mobileNumber;
    public String email;

    public String gName;
    public String occupation;
    public String doj;
    public String status;

    public List<Course> courses;
    public String comments;

    public String admissionFeeActual;
    public String admissionFeeCollected;

    public List<CollectedFee> collectedFee;

}

class Course {
  public String courseName;
  public String courseBatch;
  public String courseFaculty;
  public String courseFee;
}

class CollectedFee {
  public String payMode;
  public String payMonth;
  public String payYear;
  public String totalFee;
  public String paidFee;
  public String remarks;
  public String loggedInUser;
}
