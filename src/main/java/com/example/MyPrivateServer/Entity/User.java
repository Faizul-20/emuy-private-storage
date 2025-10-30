//package com.example.MyPrivateServer.Entity;
//
//import jakarta.persistence.*;
//import lombok.Data;
//
//import java.util.HashSet;
//import java.util.Set;
//
//@Entity
//@Data
//@Table(name = "users")
//public class User {
//
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private int id;
//
//    //Tidak Boleh Kosong dan unik
//    @Column(unique = true, nullable = false)
//    private String username;
//
//    //Tidak Boleh Kosong unik
//    @Column(unique = true, nullable = false)
//    private String password;
//
//    //Ambil dari Server
//    private Long storageUsed = 0L;
//    private Long storageLimit = 0L;
//
//    //Mengelola Kepemilikan file setiap pengguna
//    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
//    private Set<MyFile> files = new HashSet<>();
//
//}
