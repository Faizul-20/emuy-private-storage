package com.example.MyPrivateServer.Controller;

//import com.example.MyPrivateServer.Repository.FileRepository;
//import com.example.MyPrivateServer.Service.FileService;
import com.example.MyPrivateServer.DTOS.FileResponse;
import com.example.MyPrivateServer.ServiceImp.MyFileServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
public class HomeController {

    @Autowired
    MyFileServiceImp myFileServiceImp;

    @RequestMapping("/dashboard")
    public String Index(Model model) {
        List <FileResponse> files= myFileServiceImp.getAllFiles();
        model.addAttribute("files", files);
        return "index";
    }
}


