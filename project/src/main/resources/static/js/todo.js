$(document).ready(function() {
    loadTodos();

    $('#todoForm').submit(function(event) {
        event.preventDefault();
        todoSave();
    });
});

function todoSave() {
    const todoTask = $('#todoInput').val();

    if (todoTask.trim() === "") {
        alert("할 일을 입력하세요.");
        return;
    }

    $.ajax({
        url: '/todo/save',
        method: 'POST',
        data: {
            todoTask: todoTask,
            todoCompleted: false
        },
        success: function() {
            $('#todoInput').val('');
            loadTodos();
        }
    });
}

function loadTodos() {
    $.get('/todo/list', function(todos) {
        const todoList = $('#todoList');
        todoList.empty();

        todos.forEach(function(todo) {
            const todoItem = $('<li class="' + (todo.todoCompleted ? 'completed' : '') + '">' +
                '<span onclick="toggleComplete(' + todo.id + ', ' + todo.todoCompleted + ')">' + todo.todoTask + '</span>' +
                '<button onclick="deleteTodo(' + todo.id + ')">삭제</button>' +
                '<button onclick="editTodo(' + todo.id + ', \'' + todo.todoTask + '\')" ' + (todo.todoCompleted ? 'disabled' : '') + '>수정</button></li>');
            todoList.append(todoItem);
        });
    });
}

function toggleComplete(id, currentStatus) {
    const newStatus = !currentStatus;
    $.ajax({
        url: '/todo/complete',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ id: id, todoCompleted: newStatus }),
        success: function(response) {
            const todoItem = $('#todoList').find('li').filter(function() {
                return $(this).find('span').attr('onclick') === `toggleComplete(${id}, ${currentStatus})`;
            });
            todoItem.toggleClass('completed', newStatus);
            todoItem.find('button').eq(1).prop('disabled', newStatus);
            todoItem.find('span').attr('onclick', `toggleComplete(${id}, ${newStatus})`);
        },
        error: function(xhr, status, error) {
            alert("Error: " + error);
        }
    });
}

function deleteTodo(id) {
    $.ajax({
        url: '/todo/delete',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ id: id }),
        success: function(response) {
            loadTodos();
        },
        error: function(xhr, status, error) {
            alert("Error: " + error);
        }
    });
}

function editTodo(id, task) {
    const newTask = prompt("할 일을 수정하세요:", task);
    if (newTask === null || newTask.trim() === "") {
        return;
    }

    $.ajax({
        url: '/todo/update',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ id: id, todoTask: newTask, todoCompleted: false }),
        success: function(response) {
            loadTodos();
        },
        error: function(xhr, status, error) {
            alert("Error: " + error);
        }
    });
}
