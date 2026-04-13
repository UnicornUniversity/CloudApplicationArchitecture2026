# Vue.js MVVM Pattern Demo

This folder contains demo applications showcasing the **MVVM (Model-View-ViewModel)** pattern using Vue.js.

## MVVM Pattern Overview

```
┌─────────┐         ┌──────────────┐         ┌──────┐
│  Model  │ ◄─────► │  ViewModel   │ ◄─────► │ View │
│  (Data) │         │ (Vue Logic)  │         │ (DOM)│
└─────────┘         └──────────────┘         └──────┘
```

### Components:

- **Model**: Pure data objects (JavaScript objects, arrays)
- **View**: HTML templates with Vue directives (v-model, v-for, v-bind, v-on)
- **ViewModel**: Vue instance that manages:
  - Data binding (reactive)
  - Computed properties
  - Methods
  - Event handling

## Files Included

### 1. `index.html` - Basic MVVM Examples
Simple, self-contained demos showing:
- ✅ Two-way data binding (v-model)
- ✅ Event handling (@click, @keyup.enter)
- ✅ Computed properties
- ✅ List rendering (v-for)
- ✅ Conditional rendering (v-if, v-else)

**Examples:**
- Counter with increment/decrement
- Form input binding
- Price calculator with computed properties
- Todo list with CRUD operations

### 2. `components-demo.html` - Component-Based MVVM
Advanced example with Vue components:
- ✅ Reusable components
- ✅ Props for parent-to-child communication
- ✅ Custom events for child-to-parent communication
- ✅ Shopping cart application

**Features:**
- Product cards with quantity controls
- Shopping cart summary
- Real-time total calculation

## How to Run

1. Open any HTML file directly in your browser:
   ```bash
   # Option 1: Double-click the HTML file

   # Option 2: Use Python simple server
   python -m http.server 8080
   # Then open: http://localhost:8080/index.html

   # Option 3: Use Node.js http-server
   npx http-server
   ```

2. No build process or npm install required - uses Vue 3 CDN

## Key Vue MVVM Concepts Demonstrated

### 1. Reactive Data (Model)
```javascript
data() {
    return {
        counter: 0,      // Model data
        userName: '',    // Auto-syncs with View
        todos: []
    }
}
```

### 2. Two-Way Binding (View ↔ ViewModel)
```html
<input v-model="userName">
<!-- Changes in input update Model, changes in Model update View -->
```

### 3. Computed Properties (ViewModel Logic)
```javascript
computed: {
    totalPrice() {
        return this.price * this.quantity;  // Auto-updates
    }
}
```

### 4. Methods (ViewModel Actions)
```javascript
methods: {
    addTodo() {
        this.todos.push({ text: this.newTodo });
    }
}
```

### 5. Event Handling (View → ViewModel)
```html
<button @click="increment">Increment</button>
```

## MVVM Benefits in Vue

1. **Separation of Concerns**: Logic separated from presentation
2. **Reactive Updates**: Automatic DOM updates when data changes
3. **Testability**: ViewModel logic can be tested independently
4. **Maintainability**: Clear data flow and structure
5. **Reusability**: Components encapsulate Model-View-ViewModel

## Learning Path

1. Start with `index.html` for basic concepts
2. Move to `components-demo.html` for component architecture
3. Experiment by modifying the code
4. Try adding new features

## Additional Resources

- [Vue.js Official Documentation](https://vuejs.org/)
- [Vue.js Guide](https://vuejs.org/guide/introduction.html)
- [MVVM Pattern Explained](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93viewmodel)
