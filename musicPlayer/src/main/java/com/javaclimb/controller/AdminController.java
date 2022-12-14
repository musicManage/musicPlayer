package com.javaclimb.controller;

import com.javaclimb.controller.util.R;
import com.javaclimb.entity.Admin;
import com.javaclimb.service.IAdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class AdminController {


    @Autowired
    private IAdminService iAdminService;

    /**
     * 判断是否登录成功
     */
    @PostMapping("/admin/login/status")
    public R loginStatus( Admin admin){
        return iAdminService.verifyPassword(admin);
    }

}
