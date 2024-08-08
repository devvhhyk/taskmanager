package com.example.project.controller;

import com.example.project.dto.TodoDTO;
import com.example.project.service.TodoService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class TodoController {

    private final TodoService todoService;

    // 투두리스트 페이지
    @GetMapping("/todo")
    public String todoPage(HttpSession session, Model model) {
        if (session.getAttribute("loginId") == null) {
            return "redirect:/member/login";
        }

        List<TodoDTO> todoList = todoService.findAll();
        model.addAttribute("todoList", todoList);
        return "todo";
    }

    // 투두리스트 저장
    @PostMapping("/todo/save")
    public String save(@ModelAttribute TodoDTO todoDTO) {
        todoService.save(todoDTO);
        return "todo";
    }

    // 투두리스트 목록
    @GetMapping("/todo/list")
    @ResponseBody
    public List<TodoDTO> list() {
        return todoService.findAll();
    }

    // 투두리스트 삭제
    @PostMapping("/todo/delete")
    public String delete(@RequestBody TodoDTO todoDTO) {
        todoService.delete(todoDTO);
        return "todo";
    }

    // 투두리스트 수정
    @PostMapping("/todo/update")
    public String update(@RequestBody TodoDTO todoDTO) {
        todoService.update(todoDTO);
        return "todo";
    }

    // 투두리스트 완료
    @PostMapping("/todo/complete")
    public String complete(@RequestBody TodoDTO todoDTO){
        todoService.complete(todoDTO);
        return "todo";
    }
}