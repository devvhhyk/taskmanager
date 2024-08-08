const listBoard = () => {
    console.log("목록 요청");
    location.href = "/board";
}

const updateBoard = () => {
    const id = document.getElementById("boardId").value;
    console.log("수정 요청");
    location.href = "/board/update/" + id;
}

const deleteBoard = () => {
    const id = document.getElementById("boardId").value;
    console.log("삭제 요청");
    location.href = "/board/delete/" + id;
}
