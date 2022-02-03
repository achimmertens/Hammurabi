package org.chary.dto;


public class Userlogdto {
    private String id;
    private String username;
    private String logintime;

    public Userlogdto() {}
    // Has to be there, otherwise we get the following error:
    //Ensure that org.chary.dto.Userlogdto has a non-private no-argument constructor.

    public Userlogdto(String id, String username, String logintime) {
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
