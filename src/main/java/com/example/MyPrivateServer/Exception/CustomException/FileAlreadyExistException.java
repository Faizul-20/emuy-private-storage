package com.example.MyPrivateServer.Exception.CustomException;

public class FileAlreadyExistException extends RuntimeException {

    public FileAlreadyExistException(String message) {
        super("File already exists: " + message);
    }
}
