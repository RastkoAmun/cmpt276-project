package com.cmpt276project.projectbackend.models;
import java.util.Date;
import jakarta.persistence.*;

@Entity
@Table(name="hydration")
public class Hydration {
     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer user_id;
    private Date intake_date;
    private Integer goal;
    private Integer intake;

     public Hydration() { 
    }

    public Hydration(Integer user_id, Integer goal, Integer intake, Date intake_date) {
    this.user_id = user_id;
    this.intake_date=intake_date;
    this.goal = goal;
    this.intake = intake;
    
    
}

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUser_id() {
        return user_id;
    }

    public void setUser_id(Integer user_id) {
        this.user_id = user_id;
    }

      public Date getIntake_date() {
        return intake_date;
    }

    public void setIntake_date(Date intake_date) {
        this.intake_date = intake_date;
    }

    public Integer getGoal() {
        return goal;
    }

    public void setGoal(Integer goal) {
        this.goal = goal;
    }

    public Integer getIntake() {
        return intake;
    }

    public void setIntake(Integer intake) {
        this.intake = intake;
    }


}


