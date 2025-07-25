document.addEventListener("DOMContentLoaded", function () {
  // 가계부 작성 페이지로 이동
  const insertBtn = document.querySelector(".btn-custom");
  if (insertBtn) {
    insertBtn.addEventListener("click", function () {
      window.location.href = "abinsert.html";
    });
  }

  // 날짜 포맷팅 함수
  function formatDate(dateStr) {
    if (!dateStr) return "날짜 없음";
    try {
      const date = new Date(dateStr);
      if (isNaN(date)) return "날짜 없음";
      return date.toLocaleString("ko-KR");
    } catch {
      return "날짜 없음";
    }
  }

  // 가계부 목록 렌더링
  function renderAb() {
    const url = "http://127.0.0.1:8080/api/ab";
    const tableTag = document.querySelector("#board-table");
    console.log("tableTag:", tableTag);

    fetch(url)
      .then((resp) => {
        if (!resp.ok) throw new Error(`HTTP error! status: ${resp.status}`);
        return resp.json();
      })
      .then((data) => {
        console.log(data);

        const voList = Array.isArray(data) ? data : data.data;
        const filteredList = voList.filter((vo) => vo.del_yn !== "Y");

        tableTag.innerHTML = "";

        if (filteredList.length === 0) {
          tableTag.innerHTML = `<tr><td colspan="10" style="text-align: center;">데이터가 없습니다.</td></tr>`;
          return;
        }

        filteredList.forEach((vo) => {
          const tr = document.createElement("tr");

          tr.innerHTML = `
            <td>${vo.id ?? "id 없음"}</td>
            <td>${vo.type ?? "유형 없음"}</td>
            <td>${vo.title ?? "항목 없음"}</td>
            <td>${vo.amount ?? "금액 없음"}</td>
            <td>${vo.category ?? "카테고리 없음"}</td>
            <td>${vo.memo ?? "메모 없음"}</td>
            <td>${formatDate(vo.transactionDate)}</td>
            <td>${formatDate(vo.createdAt)}</td>
            <td>${formatDate(vo.updatedAt)}</td>
            <td>
            <div class="td-inner">
              <button class="edit-button btn btn-sm btn-custom">
                <i class="bi bi-pencil"></i>
              </button>
              <button class="delete-button btn btn-sm btn-custom-outline">
                <i class="bi bi-trash"></i>
              </button>
              </div>
            </td>
          `;

          // 수정 버튼 이벤트
          tr.querySelector(".edit-button").addEventListener(
            "click",
            (event) => {
              event.stopPropagation();
              //수정할 데이터 localStorage에 저장
              localStorage.setItem("editAbData", JSON.stringify(vo));
              //페이지 이동
              window.location.href = "abinsert.html";
            }
          );

          // 삭제 버튼 이벤트
          tr.querySelector(".delete-button").addEventListener(
            "click",
            (event) => {
              event.stopPropagation();
              if (confirm("정말 삭제하시겠습니까?")) {
                const deleteUrl = `http://127.0.0.1:8080/api/ab/${vo.id}`;

                fetch(deleteUrl, {
                  method: "DELETE",
                })
                  .then((resp) => {
                    if (!resp.ok) throw new Error("삭제 실패");
                    return resp.json();
                  })
                  .then(() => {
                    tr.remove(); // 화면에서도 즉시 삭제
                  })
                  .catch((err) => {
                    console.error("삭제 오류:", err);
                    alert("삭제에 실패했습니다.");
                  });
              }
            }
          );

          tableTag.appendChild(tr);
        });
      })
      .catch((err) => {
        console.error("데이터 로딩 오류:", err);
        tableTag.innerHTML = `<tr><td colspan="10" style="text-align: center;">데이터 로딩 실패</td></tr>`;
      });
  }

  // 페이지 로드시 목록 렌더링 실행
  renderAb();
});
