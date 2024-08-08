package com.example.project.service;

import com.example.project.dto.TodoDTO;
import com.example.project.entity.TodoEntity;
import com.example.project.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TodoService {

    private final TodoRepository todoRepository;

    public void save(TodoDTO todoDTO) {
        TodoEntity todoEntity = TodoEntity.toTodoEntity(todoDTO);
        todoRepository.save(todoEntity);
    }

    public List<TodoDTO> findAll() {
        List<TodoEntity> todoEntities = todoRepository.findAll();
        return todoEntities.stream()
                .map(TodoDTO::toTodoDTO)
                .collect(Collectors.toList());
    }

    public void delete(TodoDTO todoDTO) {
        todoRepository.deleteById(todoDTO.getId());
    }

    public void update(TodoDTO todoDTO) {
        TodoEntity todoEntity = TodoEntity.toTodoEntity(todoDTO);
        todoRepository.save(todoEntity);
    }

    public void complete(TodoDTO todoDTO) {
        TodoEntity todoEntity = todoRepository.findById(todoDTO.getId()).orElseThrow();
        todoEntity.setTodoCompleted(true);
        todoRepository.save(todoEntity);
    }
}