-- ******************
-- 시퀀스 삭제 (이미 있으면)
-- ******************
DROP SEQUENCE SEQ_ACCOUNT_BOOK;

-- ******************
-- 테이블 삭제 (이미 있으면)
-- ******************
DROP TABLE ACCOUNT_BOOK;

-- ******************
-- 시퀀스 생성
-- ******************
CREATE SEQUENCE SEQ_ACCOUNT_BOOK
START WITH 1
INCREMENT BY 1
NOCACHE
NOCYCLE;

-- ******************
-- ACCOUNT_BOOK 테이블 생성
-- ******************
CREATE TABLE ACCOUNT_BOOK (
    ID              NUMBER         PRIMARY KEY,
    TYPE            VARCHAR2(10)   NOT NULL,         -- 'INCOME' 또는 'EXPENSE'
    TITLE           VARCHAR2(100)  NOT NULL,         -- 항목 제목
    AMOUNT          NUMBER         NOT NULL,         -- 금액
    CATEGORY        VARCHAR2(50),                    -- 예: 식비, 교통비
    MEMO            VARCHAR2(1000),                  -- 간단한 메모
    TRANSACTION_DATE DATE         NOT NULL,          -- 거래일
    CREATED_AT      TIMESTAMP     DEFAULT SYSTIMESTAMP,
    UPDATED_AT      TIMESTAMP     DEFAULT SYSTIMESTAMP,
    DEL_YN          CHAR(1)        DEFAULT 'N' CHECK (DEL_YN IN ('Y', 'N'))
);

-- ******************
-- 더미 데이터 INSERT
-- ******************
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
    , 'EXPENSE'
    , '편의점'
    , 4500
    , '식비'
    , '간식 구매'
    , TO_DATE('2025-07-23', 'YYYY-MM-DD')
    , SYSTIMESTAMP
    , SYSTIMESTAMP)
;

INSERT INTO ACCOUNT_BOOK (ID, TYPE, TITLE, AMOUNT, CATEGORY, MEMO, TRANSACTION_DATE, CREATED_AT, UPDATED_AT)
VALUES (SEQ_ACCOUNT_BOOK.NEXTVAL, 'INCOME', '월급', 2500000, '급여', '7월 급여 입금', TO_DATE('2025-07-25', 'YYYY-MM-DD'), SYSTIMESTAMP, SYSTIMESTAMP);

INSERT INTO ACCOUNT_BOOK (ID, TYPE, TITLE, AMOUNT, CATEGORY, MEMO, TRANSACTION_DATE, CREATED_AT, UPDATED_AT)
VALUES (SEQ_ACCOUNT_BOOK.NEXTVAL, 'EXPENSE', '카페', 5500, '식비', '아메리카노', TO_DATE('2025-07-24', 'YYYY-MM-DD'), SYSTIMESTAMP, SYSTIMESTAMP);

-- COMMIT;
COMMIT;

-- ******************
-- 전체 SELECT
-- ******************
SELECT * FROM ACCOUNT_BOOK
ORDER BY TRANSACTION_DATE DESC;

-- ******************
-- 월별 조회
-- ******************
SELECT * FROM ACCOUNT_BOOK
WHERE TO_CHAR(TRANSACTION_DATE, 'YYYY-MM') = '2025-07'
ORDER BY TRANSACTION_DATE;

-- ******************
-- 카테고리별 조회
-- ******************
SELECT * FROM ACCOUNT_BOOK
WHERE CATEGORY = '식비'
ORDER BY TRANSACTION_DATE;

-- ******************
-- 항목 수정 (수정일도 갱신)
-- ******************
UPDATE ACCOUNT_BOOK
SET TITLE = '편의점 간식', 
    AMOUNT = 5000,
    MEMO = '초코우유 포함',
    UPDATED_AT = SYSTIMESTAMP
WHERE ID = :id;

-- ******************
-- 항목 삭제 (소프트 삭제)
-- ******************
UPDATE ACCOUNT_BOOK
SET DEL_YN = 'Y',
    UPDATED_AT = SYSTIMESTAMP
WHERE ID = :id;

-- COMMIT;
COMMIT;
