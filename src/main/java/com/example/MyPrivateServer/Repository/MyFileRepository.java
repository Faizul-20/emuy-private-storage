package com.example.MyPrivateServer.Repository;

import com.example.MyPrivateServer.Entity.MyFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MyFileRepository extends JpaRepository<MyFile, Long> {
    public Boolean existsByFileName(String fileName);
}
