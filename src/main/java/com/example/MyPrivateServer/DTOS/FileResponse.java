package com.example.MyPrivateServer.DTOS;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class FileResponse {
    private Long fileId;
    private String fileName;
    private String fileType;
    private Long fileSize;
    private Boolean starred;
    private LocalDateTime fileCreatedAt;
    private LocalDateTime fileModifiedAt;
    private LocalDateTime fileAccessedAt;


    // Method untuk menentukan icon file
    public String getFileIcon() {
        if (fileType == null) return "📁";

        String type = fileType.toLowerCase();
        if (type.contains("pdf")) return "📄";
        if (type.contains("image")) return "🖼️";
        if (type.contains("text")) return "📃";
        if (type.contains("zip")) return "🗜️";
        if (type.contains("video")) return "🎬";
        if (type.contains("audio")) return "🎵";
        return "📁";
    }
}
