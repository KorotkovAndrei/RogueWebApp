package rogue.rogueWebApp.Controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import rogue.rogueWebApp.Domain.User;
import rogue.rogueWebApp.repo.UserRepo;

import java.util.List;
@RestController

public class UserController {

    public final UserRepo userRepo;
    @Autowired
    public UserController(UserRepo userRepo) {
        this.userRepo = userRepo;
    }
    public List<User> list(){
        return userRepo.findAll();
    }

    public boolean validateUser(String name, String password){
        List<User> list = list();
        for(int i=0; i<list.size(); i++){
            User user = list.get(i);
            if(user.getUserName().equals(name) && user.getUserPassword().equals(password)){
                return true;
            }
        }
        return false;
    }
    
    public void testValidateUser(){
        User newUser = new User();
        newUser.setUserName("stas");
        newUser.setUserPassword("lul");
        userRepo.save(newUser);
        System.out.println(validateUser("STAS","lul"));
    }


}
