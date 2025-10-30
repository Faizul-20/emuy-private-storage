package com.example.MyPrivateServer.Controller;

import com.example.MyPrivateServer.Service.MyFileService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;



@Controller
public class MyFileController {

    @Autowired
    private MyFileService fileService;

    @PostMapping("/upload")
    public String uploadFile(@ModelAttribute com.example.MyPrivateServer.Entity.MyFile file,
                             @RequestParam("file") MultipartFile multipartFile,
                             HttpSession session) {

        try {
            fileService.uploadFile(file, multipartFile); // ← delegasi ke service
            session.setAttribute("successMassage", "File Uploaded Successfully");
        } catch (IllegalStateException e) {
            session.setAttribute("errorMassage", e.getMessage());
        } catch (Exception e) {
            session.setAttribute("errorMassage", "File Upload Failed: " + e.getMessage());
        }

        return "redirect:/dashboard";
    }


}
