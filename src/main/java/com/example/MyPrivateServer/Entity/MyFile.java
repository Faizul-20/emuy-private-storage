package com.example.MyPrivateServer.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "files")
@NoArgsConstructor
public class MyFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fileId;

    @Column(nullable = false)
    private String fileName;

    private String fileType;
    private Long fileSize;
    private String filePath;
    private Boolean Starred;

    @Column(name = "created_at")
    private LocalDateTime fileCreatedAt = LocalDateTime.now();

    @Column(name = "modified_at")
    private LocalDateTime fileModifiedAt = LocalDateTime.now();

    @Column(name = "accessed_at")
    private LocalDateTime fileAccessedAt = LocalDateTime.now();

}
