package org.chary.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Userlog")
public class UserlogEntity {

    @Id
    //@GeneratedValue is only allowed if ID is from type integer
    private String id;
    private String username;
    private String logintime;

    public UserlogEntity(){}
    // Has to be there, otherwise we get the following error:
    // No default constructor for entity:  : org.chary.entity.UserlogEntity] with root cause


    public UserlogEntity(String id, String username, String logintime) {
        this.id = id;
        this.username = username;
        this.logintime = logintime;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getLogintime() {
        return logintime;
    }

    public void setLogintime(String logintime) {
        this.logintime = logintime;
    }
}
