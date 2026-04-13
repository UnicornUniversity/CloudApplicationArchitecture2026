# MySchool MVC - .NET Demo Application

A simple ASP.NET Core MVC application demonstrating the Model-View-Controller pattern.

## Features

- **Student Management**: Full CRUD operations for students
- **MVC Pattern**: Clear separation of concerns with Models, Views, and Controllers
- **Bootstrap UI**: Responsive design using Bootstrap 5

## Project Structure

```
mvc-net/
├── Controllers/
│   ├── HomeController.cs       # Default home controller
│   └── StudentController.cs    # Student CRUD operations
├── Models/
│   ├── ErrorViewModel.cs       # Error handling model
│   └── Student.cs              # Student entity model
├── Views/
│   ├── Home/                   # Home views
│   ├── Student/                # Student CRUD views
│   │   ├── Index.cshtml        # List all students
│   │   ├── Create.cshtml       # Create new student
│   │   ├── Edit.cshtml         # Edit student
│   │   ├── Details.cshtml      # View student details
│   │   └── Delete.cshtml       # Delete confirmation
│   └── Shared/
│       └── _Layout.cshtml      # Main layout template
└── wwwroot/                    # Static files (CSS, JS, images)
```

## Running the Application

1. Navigate to the project directory:
   ```bash
   cd c:\Leonov\CloudApplicationArchitectureCourse\week06\mvc-net
   ```

2. Run the application:
   ```bash
   dotnet run
   ```

3. Open your browser and navigate to:
   ```
   https://localhost:5001
   ```

## MVC Pattern Explanation

### Model (`Models/Student.cs`)
- Represents the data structure
- Contains properties: Id, Name, Email, Major, Year
- Pure data representation with no business logic

### View (`Views/Student/*.cshtml`)
- Razor views for rendering HTML
- Displays data from the model
- Uses tag helpers for form binding and routing
- Responsive UI with Bootstrap

### Controller (`Controllers/StudentController.cs`)
- Handles HTTP requests and user interactions
- Contains action methods for CRUD operations:
  - `Index()` - List all students
  - `Details(id)` - Show student details
  - `Create()` - Display create form
  - `Create(student)` - Process new student
  - `Edit(id)` - Display edit form
  - `Edit(id, student)` - Update student
  - `Delete(id)` - Display delete confirmation
  - `DeleteConfirmed(id)` - Remove student
- Uses in-memory storage for demo purposes

## Technologies

- .NET 9.0
- ASP.NET Core MVC
- Razor Views
- Bootstrap 5
- jQuery
