package com.example.MyPrivateServer.Service;

import com.example.MyPrivateServer.Entity.MyFile;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface MyFileService {
    public MyFile upload (MyFile file);
    public boolean existFile(String filename);
    public List<MyFile> getAllFiles();
    void uploadFile(MyFile file, MultipartFile multipartFile) throws IOException, IOException;
}
