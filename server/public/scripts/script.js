$(onReady);

function onReady(){
    console.log("jQuery Loaded");

    // Set up click handlers
    $('#add-to-do').on('click', addTodo);
    $('#todos-list').on('click', '.delete-button', deleteTodo);
    $('#todos-list').on('click', '.complete-button', completeTodo);
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
    if (confirm("Are you sure you want to delete?") === true) {
        $.ajax({
            method: 'DELETE',
            url: `/todos/${id}`
       }).then((response) => {
           refreshTodos();
       }).catch((error) => {
           console.log('Error deleting todo:', error);
       })
    }
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


// refreshTodos should be fairly straightforward, we're throwing each to-do 
// into a row in our table. The only interesting thing here is we're checking
// if the the item is complete and swapping our icon to a checked one, and
// adding the 'complete' class so we add a strikethrough in css.
function refreshTodos() {
    $('#todos-list').empty();
    $.ajax({
        method: 'GET',
        url: "/todos"
    }).then((response) => {
        for(let item of response) {
            let todoSummary = `<td>${item.summary}</td>`;
            let buttonIcon = `<i class="far fa-square complete-button" data-id="${item.id}"></i>`;
            if (item.is_complete) {
                todoSummary = `<td class="complete">${item.summary}</td>`;
                buttonIcon = `<i class="far fa-check-square complete-button" data-id="${item.id}"></i>`;
            }
            $('#todos-list').append(`
                <tr>
                    <td>${buttonIcon}</td>
                    ${todoSummary}
                    <td><i class="far fa-trash-alt delete-button" data-id="${item.id}"></i></td>
                </tr>
            `)
        }
    })
}