const listBoard = () => {
    const page = /*[[${page}]]*/ '';
    console.log("목록 요청");
    location.href = `/board?page=${page}`;
}

const updateBoard = () => {
    const id = document.getElementById("boardId").value;
    console.log("수정 요청");
    location.href = `/board/update/${id}`;
}

const deleteBoard = () => {
    if (confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
        const id = document.getElementById("boardId").value;
        console.log("삭제 요청");
        location.href = `/board/delete/${id}`;
    }
}
