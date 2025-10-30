package com.example.MyPrivateServer.ServiceImp;

import com.example.MyPrivateServer.Entity.MyFile;
import com.example.MyPrivateServer.Repository.MyFileRepository;
import com.example.MyPrivateServer.Service.MyFileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
@Service
public class MyFileServiceImp implements MyFileService {

    @Autowired
    private MyFileRepository fileRepository;

    @Override
    @Transactional
    public MyFile upload(MyFile file) {
        return fileRepository.save(file);
    }

    @Override
    public boolean existFile(String filename) {
        return fileRepository.existsByFileName(filename);
    }

    @Override
    public List<MyFile> getAllFiles() {
        return fileRepository.findAll();
    }

    @Transactional
    @Override
    public void uploadFile(MyFile file, MultipartFile multipartFile) throws IOException {
        if (multipartFile.isEmpty()) {
            throw new IllegalStateException("No file selected");
        }

        String fileName = multipartFile.getOriginalFilename();

        if (existFile(fileName)) {
            throw new IllegalStateException("File already exists");
        }

        //  Path penyimpanan di root project (bukan classpath)
        Path uploadDir = Paths.get("./TempData").toAbsolutePath();
        // Cek Ada Nggak Filenya
        if (!Files.exists(uploadDir)) {
            Files.createDirectories(uploadDir);
        }

        // Buat path tujuan
        Path destinationPath = uploadDir.resolve(fileName);
        Files.copy(multipartFile.getInputStream(), destinationPath, StandardCopyOption.REPLACE_EXISTING);

        // Set atribut entity
        file.setFileName(fileName);
        file.setFilePath(destinationPath.toString());
        file.setFileType(multipartFile.getContentType());
        file.setFileSize(multipartFile.getSize());
        file.setStarred(false);

        // Simpan metadata ke DB
        upload(file);
    }

}
