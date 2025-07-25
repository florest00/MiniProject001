package com.kh.ab.vo;

import lombok.Data;

@Data
public class AbVo {
    private String id;
    private String type;
    private String title;
    private String amount;
    private String category;
    private String memo;
    private String transactionDate;
    private String createdAt;
    private String updatedAt;
    private String delYn;
}
