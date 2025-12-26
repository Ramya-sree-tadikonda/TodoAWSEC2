package com.example.todo.service;

import com.example.todo.dto.CreateTodoRequest;
import com.example.todo.dto.UpdateTodoRequest;
import com.example.todo.entity.Todo;
import com.example.todo.repository.TodoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {

    private final TodoRepository repo;

    public TodoService(TodoRepository repo) {
        this.repo = repo;
    }

    public List<Todo> list() {
        return repo.findAll();
    }

    public Todo create(CreateTodoRequest req) {
        Todo todo = new Todo(req.getTitle());
        return repo.save(todo);
    }

    public Todo update(Long id, UpdateTodoRequest req) {
        Todo todo = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found: " + id));

        if (req.getTitle() != null && !req.getTitle().isBlank()) {
            todo.setTitle(req.getTitle());
        }
        if (req.getCompleted() != null) {
            todo.setCompleted(req.getCompleted());
        }
        return repo.save(todo);
    }

    public Todo toggle(Long id) {
        Todo todo = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found: " + id));
        todo.setCompleted(!todo.isCompleted());
        return repo.save(todo);
    }

    public void delete(Long id) {
        if (!repo.existsById(id)) {
            throw new RuntimeException("Todo not found: " + id);
        }
        repo.deleteById(id);
    }
}
