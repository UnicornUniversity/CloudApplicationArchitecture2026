package com.example.mvcdemo.service;

import com.example.mvcdemo.model.Student;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class StudentService {
    private final List<Student> students = new ArrayList<>();
    private final AtomicLong idCounter = new AtomicLong(1);

    public StudentService() {
        students.add(new Student(idCounter.getAndIncrement(), "John", "Doe", "john.doe@example.com", "Computer Science"));
        students.add(new Student(idCounter.getAndIncrement(), "Jane", "Smith", "jane.smith@example.com", "Mathematics"));
        students.add(new Student(idCounter.getAndIncrement(), "Bob", "Johnson", "bob.johnson@example.com", "Physics"));
    }

    public List<Student> getAllStudents() {
        return new ArrayList<>(students);
    }

    public Optional<Student> getStudentById(Long id) {
        return students.stream()
                .filter(student -> student.getId().equals(id))
                .findFirst();
    }

    public Student addStudent(Student student) {
        student.setId(idCounter.getAndIncrement());
        students.add(student);
        return student;
    }

    public boolean updateStudent(Long id, Student updatedStudent) {
        Optional<Student> existingStudent = getStudentById(id);
        if (existingStudent.isPresent()) {
            Student student = existingStudent.get();
            student.setFirstName(updatedStudent.getFirstName());
            student.setLastName(updatedStudent.getLastName());
            student.setEmail(updatedStudent.getEmail());
            student.setMajor(updatedStudent.getMajor());
            return true;
        }
        return false;
    }

    public boolean deleteStudent(Long id) {
        return students.removeIf(student -> student.getId().equals(id));
    }
}
