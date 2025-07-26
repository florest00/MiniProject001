package com.kh.ab.api;

import com.kh.ab.service.AbService;
import com.kh.ab.vo.AbVo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/ab")
@RequiredArgsConstructor
//@CrossOrigin("http://127.0.0.1:5500")
@CrossOrigin(origins = {"http://localhost:5500", "https://florest00.github.io"})

//@CrossOrigin("http://192.168.20.209:5500") //학원
public class AbApiController {

    private final AbService service;

    @GetMapping
    public ResponseEntity<List<AbVo>> selectList() {
        List<AbVo> list = service.selectList();

        Map<String, Object> map = new HashMap<>();
        map.put("data", list);
        return ResponseEntity.ok(list);
    }

    @GetMapping("{category}")
    public ResponseEntity<Map<String, Object>> selectOne(@PathVariable("category") String category) {
        AbVo vo = service.selectOne(category);

        Map<String, Object> map = new HashMap<>();
        map.put("data", vo);
        return ResponseEntity.ok(map);
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> insertAb(@RequestBody AbVo vo) {
        int result = service.insertAb(vo);

        Map<String, Object> map = new HashMap<>();
        map.put("data", result);
        return ResponseEntity.status(HttpStatus.CREATED).body(map);
    }

    @PutMapping("{id}")
    public ResponseEntity<Map<String, Object>> updateAb(@PathVariable("id") String id, @RequestBody AbVo vo) {
        vo.setId(id);
        int result = service.updateAb(vo);

        Map<String, Object> map = new HashMap<>();
        map.put("data", result);
        return ResponseEntity.ok(map);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Map<String, Object>> softDeleteAb(@PathVariable String id) {
        int result = service.softDeleteAb(id);

        Map<String, Object> map = new HashMap<>();
        map.put("data", result);
        return ResponseEntity.ok(map);
    }
}
