package com.example.MyPrivateServer.Exception;

import com.example.MyPrivateServer.Exception.CustomException.FileAlreadyExistException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.ModelAndView;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {


    @ExceptionHandler({IOException.class, IOException.class, IllegalStateException.class})
    public ResponseEntity<String> handleFileException(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error during file upload: " + e.getMessage());
    }

    //Saat Eror Di Controller akan redirect ke dashboard
    @ExceptionHandler(Exception.class)
    public ModelAndView handleGeneralException(Exception e) {
        ModelAndView mv = new ModelAndView("redirect:/dashboard");
        mv.addObject("errorMessage", e.getMessage());
        return mv;
    }

}
