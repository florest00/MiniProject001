package com.kh.ab.service;

import com.kh.ab.mapper.AbMapper;
import com.kh.ab.vo.AbVo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class AbService {

    private final AbMapper mapper;

    public List<AbVo> selectList() {
        return mapper.selectList();
    }

    public AbVo selectOne(String category) {
        return mapper.selectOne(category);
    }

    public int insertAb(AbVo vo) {
        return mapper.insertAb(vo);
    }

    public int updateAb(AbVo vo) {
        return mapper.updateAb(vo);
    }

    public int softDeleteAb(String id) {
        return mapper.softDeleteAb(id);
    }
}
