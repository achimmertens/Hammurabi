package org.chary.services;

import org.chary.dto.Userlogdto;
import org.chary.entity.UserlogEntity;
import org.chary.repository.UserlogRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserlogServiceImpl implements UserlogService {

    @Autowired
    UserlogRepository userlogRepository;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public List<Userlogdto> getAllUserlogs() {
        List<UserlogEntity> dbListe = userlogRepository.findAll();
        List<Userlogdto> userlogdtoList = new ArrayList<Userlogdto>();
        for (UserlogEntity a : dbListe) {
            Userlogdto aDTO = modelMapper.map(a, Userlogdto.class);
            System.out.println("ID: "+aDTO.getId()+", Account: "+aDTO.getUsername()+", LoginTime: "+aDTO.getLogintime());
            userlogdtoList.add(aDTO);
        }
        return userlogdtoList;
    }


}
