using Microsoft.AspNetCore.Mvc;
using MySchoolMVC.Models;

namespace MySchoolMVC.Controllers
{
    public class StudentController : Controller
    {
        // In-memory storage for demo purposes
        private static List<Student> _students = new List<Student>
        {
            new Student { Id = 1, Name = "Alice Johnson", Email = "alice@school.com", Major = "Computer Science", Year = 3 },
            new Student { Id = 2, Name = "Bob Smith", Email = "bob@school.com", Major = "Mathematics", Year = 2 },
            new Student { Id = 3, Name = "Carol White", Email = "carol@school.com", Major = "Physics", Year = 4 }
        };

        // GET: Student
        public IActionResult Index()
        {
            return View(_students);
        }

        // GET: Student/Details/5
        public IActionResult Details(int id)
        {
            var student = _students.FirstOrDefault(s => s.Id == id);
            if (student == null)
            {
                return NotFound();
            }
            return View(student);
        }

        // GET: Student/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Student/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(Student student)
        {
            if (ModelState.IsValid)
            {
                student.Id = _students.Any() ? _students.Max(s => s.Id) + 1 : 1;
                _students.Add(student);
                return RedirectToAction(nameof(Index));
            }
            return View(student);
        }

        // GET: Student/Edit/5
        public IActionResult Edit(int id)
        {
            var student = _students.FirstOrDefault(s => s.Id == id);
            if (student == null)
            {
                return NotFound();
            }
            return View(student);
        }

        // POST: Student/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(int id, Student student)
        {
            if (id != student.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                var existingStudent = _students.FirstOrDefault(s => s.Id == id);
                if (existingStudent == null)
                {
                    return NotFound();
                }

                existingStudent.Name = student.Name;
                existingStudent.Email = student.Email;
                existingStudent.Major = student.Major;
                existingStudent.Year = student.Year;

                return RedirectToAction(nameof(Index));
            }
            return View(student);
        }

        // GET: Student/Delete/5
        public IActionResult Delete(int id)
        {
            var student = _students.FirstOrDefault(s => s.Id == id);
            if (student == null)
            {
                return NotFound();
            }
            return View(student);
        }

        // POST: Student/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public IActionResult DeleteConfirmed(int id)
        {
            var student = _students.FirstOrDefault(s => s.Id == id);
            if (student != null)
            {
                _students.Remove(student);
            }
            return RedirectToAction(nameof(Index));
        }
    }
}
