package com.example.MyPrivateServer.Controller;

//import com.example.MyPrivateServer.Repository.FileRepository;
//import com.example.MyPrivateServer.Service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

    @RequestMapping("/dashboard")
    public String Index() {
        return "index";
    }
}


