const { createApp } = Vue;

createApp({
    // MODEL - Data layer
    data() {
        return {
            // Counter model
            counter: 0,

            // User model
            userName: '',

            // Shopping model
            price: 0,
            quantity: 0,

            // Todo model
            newTodo: '',
            todos: [],
            nextTodoId: 1
        }
    },

    // VIEWMODEL - Business logic and computed properties
    computed: {
        totalPrice() {
            return (this.price * this.quantity).toFixed(2);
        },
        remainingTodos() {
            return this.todos.filter(todo => !todo.completed).length;
        }
    },

    // VIEWMODEL - Methods (business logic)
    methods: {
        // Counter methods
        increment() {
            this.counter++;
        },
        decrement() {
            this.counter--;
        },
        reset() {
            this.counter = 0;
        },

        // Todo methods
        addTodo() {
            if (this.newTodo.trim()) {
                this.todos.push({
                    id: this.nextTodoId++,
                    text: this.newTodo.trim(),
                    completed: false
                });
                this.newTodo = '';
            }
        },
        removeTodo(index) {
            this.todos.splice(index, 1);
        }
    }
}).mount('#app');
