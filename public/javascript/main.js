console.log('Futstats');

//Sidebar Collapse
Array.from(document.getElementById('sidebar').getElementsByClassName('has-dropdown')).forEach(element => {
    element.addEventListener('click', function(e) {
        if(!e.target.parentNode.className.includes("has-dropdown")){return;}
        const submenu = element.getElementsByTagName('ul')[0];
        if(submenu != undefined)
        { submenu.style.display = submenu.style.display == "block" ? "none" : "block";}
        event.preventDefault();
    }, element);
})

const API_URL = "https://71n5rm3blj.execute-api.sa-east-1.amazonaws.com/default/futstats-lambda";

$(document).ready(function() {
    
    // TODO: put on menu click
    $("#main").load("todos-os-jogos.html", loadTableTodosOsJogos);


    // Function to load all items (Read operation)
    function loadTableTodosOsJogos() {
        $.ajax({
            url: API_URL,
            method: "GET",
            dataType: "text",
            success: function(items) {
                $("#tableRows").empty();
                console.info(items);
                // $.each(items, function(index, item) {
                //     $("#tableRows").append(`
                //         <tr>
                //             <th>${item.id}</th>
                //             <td>${item.name}</td>
                //             <td><button class="button editItem" data-id="${item.id}" data-name="${item.name}">Edit</button></td>
                //             <td><button class="delete deleteItem" data-id="${item.id}"></button></td>
                //         </tr>
                //     `);
                // });
            },
            error: function(xhr, status, error) {
                console.error("Error loading:", error);
            }
        });
    }
});