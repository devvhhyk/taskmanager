const listBoard = () => {
    const page = /*[[${page}]]*/ '';
    location.href = `/board?page=${page}`;
}

const updateBoard = () => {
    const id = document.getElementById("boardId").value;
    location.href = `/board/update/${id}`;
}

const deleteBoard = () => {
    if (confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
        const id = document.getElementById("boardId").value;
        location.href = `/board/delete/${id}`;
    }
}

const commentWrite = () => {
    const writer = document.getElementById("commentWriter").value;
    const contents = document.getElementById("commentContents").value;
    const id = document.getElementById("boardId").value;

    if (!contents.trim()) {
        alert("댓글 내용을 입력하세요.");
        return;
    }

    $.ajax({
        type: "post",
        url: "/comment/save",
        data: {
            "commentWriter": writer,
            "commentContents": contents,
            "boardId": id
        },
        success: function(res) {
            let output = '';
            for (let i in res) {
                const date = new Date(res[i].commentCreatedTime);
                const formattedDate =
                    date.getFullYear() + '-' +
                    ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
                    ('0' + date.getDate()).slice(-2) + ' ' +
                    ('0' + date.getHours()).slice(-2) + ':' +
                    ('0' + date.getMinutes()).slice(-2) + ':' +
                    ('0' + date.getSeconds()).slice(-2);

                output += "<div class='comment-item'>";
                output += "<div class='comment-meta'>";
                output += "<span>" + res[i].commentWriter + "</span>";
                output += "<span>" + formattedDate + "</span>";
                output += "</div>";
                output += "<div class='comment-content'>" + res[i].commentContents + "</div>";
                output += "</div>";
            }
            document.getElementById('comment-list').innerHTML = output;
            document.getElementById('commentContents').value = '';
        },
        error: function(err) {
            console.log("요청 실패", err);
        }
    })
}
