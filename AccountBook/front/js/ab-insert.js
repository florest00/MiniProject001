document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("accountForm");
  const submitBtn = document.getElementById("submitBtn");
  const abFormTitle = document.getElementById("abFormTitle");
  const editDataStr = localStorage.getItem("editAbData");
  const isEditMode = !!editDataStr;

  if (isEditMode) {
    const editData = JSON.parse(editDataStr);

    // 수정 모드 UI 변경
    abFormTitle.textContent = "가계부 수정";
    submitBtn.textContent = "수정";

    // 데이터 채우기
    document.getElementById("type").value = editData.type;
    document.getElementById("title").value = editData.title;
    document.getElementById("amount").value = editData.amount;
    document.getElementById("category").value = editData.category;
    document.getElementById("memo").value = editData.memo;
    document.getElementById("transactionDate").value =
      editData.transactionDate?.slice(0, 10);

    // 수정 요청
    submitBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const updatedData = {
        id: editData.id,
        type: document.getElementById("type").value,
        title: document.getElementById("title").value,
        amount: parseInt(document.getElementById("amount").value),
        category: document.getElementById("category").value,
        memo: document.getElementById("memo").value,
        transactionDate: document.getElementById("transactionDate").value,
      };

      fetch(`http://127.0.0.1:8080/api/ab/${editData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      })
        .then((resp) => {
          if (!resp.ok) throw new Error("수정 실패");
          return resp.json();
        })
        .then(() => {
          alert("수정되었습니다.");
          localStorage.removeItem("editAbData");
          window.location.href = "ab.html";
        })
        .catch((err) => {
          console.error("수정 오류:", err);
          alert("수정 실패");
        });
    });
  } else {
    // 저장 모드
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const data = {
        type: document.getElementById("type").value,
        title: document.getElementById("title").value,
        amount: parseInt(document.getElementById("amount").value),
        category: document.getElementById("category").value,
        memo: document.getElementById("memo").value,
        transactionDate: document.getElementById("transactionDate").value,
      };

      fetch("http://localhost:8080/api/ab", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((resp) => {
          if (!resp.ok) throw new Error("서버 오류 발생");
          return resp.json();
        })
        .then(() => {
          alert("저장 완료!");
          form.reset();
        })
        .catch((err) => {
          console.error(err);
          alert("저장 실패!");
        });
    });
  }

  // 목록으로 이동
  document
    .querySelector(".btn-custom-outline")
    .addEventListener("click", function () {
      window.location.href = "ab.html";
    });
});
