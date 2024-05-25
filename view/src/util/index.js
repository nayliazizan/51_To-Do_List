// *create 3 exported functions that will perform API calls to controller*

//create and export a function called createTodo that performs a POST method...
//to the route that we created for task creation. 
//the function should take todo as its argument which will contain the contents...
//of the new form
export const createTodo = async (todo) => {
    try {
        const res = await fetch('api/todo/create', {
            method: 'POST',
            body: todo,
        });
        return res.json();
    } catch (error) {
        return {error};
    }
};

//create n export a function called getTodos that performs a GET request...
//to get all existing entries in todo db
export const getTodos = async () => {
    try {
        const res = await fetch('api/todos');
        const data = await res.json();
        return data;
    } catch (error) {
        return {error};
    }
};

//create n export a function caled removeTodo that performs a DELETE request.
//the function should take id as its argument to delete the row that...
//matches the received id
export const removeTodo = async (id) => {
    try {
        await fetch(`api/todo/${id}`, {
            method: 'DELETE',
        });
        return 'deleted';
    } catch (error) {
        return {error};
    }
};