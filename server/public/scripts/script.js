$(onReady);

function onReady(){
    console.log("jQuery Loaded");

    // Set up click handlers
    $('#add-to-do').on('click', addTodo);
    $('#todos-table').on('click', '.delete-button', deleteTodo);
    $('#todos-table').on('click', '.complete-button', completeTodo);
    // Get todo list from server
    refreshTodos();
}

function addTodo() {
    const summary = $('#summary-input').val();
    $.ajax({
        method: 'POST',
        url: '/todos',
        data: {
            summary
        }
    }).then((response) => {
        refreshTodos();
    }).catch((error) => {
        console.log('Error adding to-do:', error);
    })

}

function deleteTodo(event) {
    const id = $(event.target).data('id');
    console.log('clicked delete on id:', id);
     $.ajax({
         method: 'DELETE',
         url: `/todos/${id}`
    }).then((response) => {
        refreshTodos();
    }).catch((error) => {
        console.log('Error deleting todo:', error);
    })
}

function completeTodo(event) {
    const id = $(event.target).data('id');
    $.ajax({
        method: 'PUT',
        url: `/todos/complete/${id}`
    }).then((response) => {
        refreshTodos();
    }).catch((error) => {
        console.log('Error completing todo:', error);
    });
}

function refreshTodos() {
    $('#todos-table').empty();
    $.ajax({
        method: 'GET',
        url: "/todos"
    }).then((response) => {
        for(let item of response) {
            let todoSummary = `<td>${item.summary}</td>`;
            if (item.is_complete) {
                todoSummary = `<td class="complete">${item.summary}</td>`;
            }
            $('#todos-table').append(`
                <tr>
                    <td><button class='complete-button' data-id="${item.id}">Complete</button></td>
                    ${todoSummary}
                    <td><button class='delete-button' data-id="${item.id}">Delete</button></td>
                </tr>
            `)
        }
    })
}