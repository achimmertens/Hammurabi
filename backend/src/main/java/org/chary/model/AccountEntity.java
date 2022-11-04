package org.chary.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.*;

import java.util.Date;

@Document(indexName = "account")
@Setting(settingPath = "static/es-settings.json")

public class AccountEntity {

    @Id
    @Field(type = FieldType.Keyword)
    private String id;

    @Field(type = FieldType.Text)
    private String name;

    @Field(type = FieldType.Text)
    private String nickname;

    @Field(type = FieldType.Date, pattern = "uuuu-MM-dd'T'HH:mm:ss.SSSZZ")  //, patternexample = "2022-05-02T06:26:01.489+00:00"
    private Date logindate;


    //getters and setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setUsername(String name) {
        this.name = name;
    }

    public Date getLogindate() {
        return logindate;
    }

    public void setLogindate(Date logindate) {

        try {
            this.logindate = logindate;
        }
        catch (Exception e) {
            e.printStackTrace();}
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }
}
