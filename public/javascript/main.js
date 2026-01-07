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
    
    // Set global default settings
    $.ajaxSetup({
        cache: false,
        type: "GET",                     // Default HTTP method
        contentType: "application/json",  // Default content type
        dataType: "json",                 // Default data type for server response
        error: function(xhr, status, error) { // Default error handler
            console.log("AJAX Error: " + status + " " + error);
        }
    });

    // TODO: put on menu click
    $("#main").load("todos-os-jogos.html", loadTableTodosOsJogos);


    // Function to load all items (Read operation)
    function loadTableTodosOsJogos() {
        $.ajax({
            url: API_URL,
            method: "GET",
            dataType: "json",
            success: function(data) {
                $("#tableHead").empty();
                $("#tableRows").empty();
                console.info(data);

                let temp = data.Items[0];

                let arr = temp.value.split("/");

                let times = [];
                for(let i=0; i<arr.length; i++) {
                    let line = arr[i];
                    if(line != "") {
                        let arrLine = line.split(";");
                        if(i == 0) {
                            let html = `<tr><th></th>`;
                            $.each(arrLine, function(index, item) {
                                if(item != "") {
                                    html += `<th class="has-text-centered">${item}</th>`;
                                    times.push(item);
                                }
                            });
                            html += `</tr>`;
                            $("#tableHead").append(html);
                        }
                        else {
                            console.info(times);
                            let html = `<tr><th>${times[i-1]}</th>`;
                            $.each(arrLine, function(index, item) {
                                if(item != "") html += `<td class="has-text-centered">${item}</td>`;
                            });
                            html += `</tr>`;
                            $("#tableRows").append(html);
                        }
                    }
                }

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