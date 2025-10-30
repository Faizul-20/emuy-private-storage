package com.example.MyPrivateServer.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class AuthController {
    @RequestMapping("/login")
    public String Login() {
        return "login";
    }
}
