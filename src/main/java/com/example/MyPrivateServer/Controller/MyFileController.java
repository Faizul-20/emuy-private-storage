package com.example.MyPrivateServer.Controller;

import com.example.MyPrivateServer.DTOS.FileResponse;
import com.example.MyPrivateServer.Entity.MyFile;
import com.example.MyPrivateServer.ServiceImp.MyFileServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(origins = "*") // Tambahkan annotation ini
public class MyFileController {

    @Autowired
    private MyFileServiceImp fileService;

    // PERBAIKAN: Ubah parameter name dari "file" menjadi "files"
    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("files") MultipartFile[] files) {
        try {
            for (MultipartFile file : files) {
                MyFile myFile = new MyFile();
                fileService.uploadFile(myFile, file);
            }
            return ResponseEntity.ok("Java : Files uploaded successfully");

        } catch (Exception exception) {
            System.out.println("Java : Error : " + exception.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("File Upload Failed : " + exception.getMessage());
        }
    }

    @GetMapping(value = "/load_files", produces = "application/json")
    public List<FileResponse> getAllFiles() {
        return fileService.getAllFiles();
    }
}