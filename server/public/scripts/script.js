$(onReady);

function onReady(){
    console.log("jQuery Loaded");

    // Set up click handlers
    $('#add-to-do').on('click', addTodo);

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

function refreshTodos() {
    $('#todos-table').empty();
    $.ajax({
        method: 'GET',
        url: "/todos"
    }).then((response) => {
        for(let item of response) {
            $('#todos-table').append(`
                <tr>
                    <td><button>Complete</button></td>
                    <td>${item.summary}</td>
                    <td><button>Delete</button></td>
                </tr>
            `)
        }
    })
}