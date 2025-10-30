package com.example.MyPrivateServer.Configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Paths;

@Configuration
public class ResourceConfig implements WebMvcConfigurer {


    //Menambahkan Direktori Baru
    @Value("${app.upload.dir:./uploads}")
    private String uploadDir;


    @Override
    //Menambahkan Folder Baru Ke Static
    public void addResourceHandlers(ResourceHandlerRegistry registry){
        String uploadPath = Paths.get(uploadDir).toAbsolutePath().toUri().toString();
        registry.addResourceHandler("/tempData/**")
                .addResourceLocations("/MyPrivateServer/tempData/");
    }

}
