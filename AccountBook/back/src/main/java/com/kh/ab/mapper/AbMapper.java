package com.kh.ab.mapper;

import com.kh.ab.vo.AbVo;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface AbMapper {

    @Select("""
            SELECT * FROM ACCOUNT_BOOK
            ORDER BY TRANSACTION_DATE DESC
            """)
    List<AbVo> selectList();

    @Select("""
        SELECT * FROM ACCOUNT_BOOK
        WHERE CATEGORY = #{category}
        ORDER BY TRANSACTION_DATE
        FETCH FIRST 1 ROWS ONLY
        """)
    AbVo selectOne(String category);

    @Insert("""
            INSERT INTO ACCOUNT_BOOK
                        (
                            ID
                            , TYPE
                            , TITLE
                            , AMOUNT
                            , CATEGORY
                            , MEMO
                            , TRANSACTION_DATE
                            , CREATED_AT
                            , UPDATED_AT
                        )
                        VALUES
                        (
                            SEQ_ACCOUNT_BOOK.NEXTVAL
                                , #{type}
                                , #{title}
                                , #{amount}
                                , #{category}
                                , #{memo}
                                , #{transactionDate}
                                , SYSTIMESTAMP
                                , SYSTIMESTAMP)
            """)
    int insertAb(AbVo vo);

    @Update("""
            UPDATE ACCOUNT_BOOK
            SET TITLE = #{title},
                AMOUNT = #{amount},
                MEMO = #{memo},
                UPDATED_AT = SYSTIMESTAMP
            WHERE ID = #{id}
            """)
    int updateAb(AbVo vo);

    @Update("""
            UPDATE ACCOUNT_BOOK
            SET DEL_YN = 'Y',
                UPDATED_AT = SYSTIMESTAMP
            WHERE ID = #{id}
            """)
    int softDeleteAb(String id);
}
