function convert() {
    const object_array = [];

    var table = document.getElementById("originalTable");
    var rows = table.rows.length;

    var header = [];
    var headerRow = table.rows[0];
    var headerCells = headerRow.cells;
    for (var i = 0; i < headerCells.length; i++) {
        header.push(headerCells[i].innerHTML);
    }

    // table body
    var body = [];
    for (var i = 1; i < rows - 1; i++) {
        var row = table.rows[i];
        var cells = row.cells;
        var bodyRow = {};
        for (var j = 0; j < cells.length; j++) {
            bodyRow[header[j]] = cells[j].innerHTML;
        }
        body.push(bodyRow);
    }

    // table footer
    var footer = [];
    var footerRow = table.rows[rows - 1];
    var footerCells = footerRow.cells;
    for (var i = 0; i < footerCells.length; i++) {
        var footerRow = {};
        footerRow["value"] = footerCells[i].innerHTML;
        footerRow["colspan"] = footerCells[i].colSpan;
        footer.push(footerRow);
    }

    // create json object
    object_array.push({ "Header": header, "Body": body, "Footer": footer });
    var json = JSON.stringify(object_array);
    document.getElementById("displayTextarea").innerHTML = json;

    // generate table from json object
    generateTable();
}

// function to generate table from json object (at id="newTable")
function generateTable() {
    remove_previous_table();
    var json = document.getElementById("displayTextarea").value;
    var object_array = JSON.parse(json);

    // get table header
    var header = object_array[0].Header;
    var headerRow = document.createElement("tr");
    for (var i = 0; i < header.length; i++) {
        var headerCell = document.createElement("th");
        headerCell.innerHTML = header[i];
        headerRow.appendChild(headerCell);
    }

    // get table body
    var body = object_array[0].Body;
    var bodyRows = [];
    for (var i = 0; i < body.length; i++) {
        var bodyRow = document.createElement("tr");
        var bodyRowObject = body[i];
        for (var j = 0; j < header.length; j++) {
            var bodyCell = document.createElement("td");
            bodyCell.innerHTML = bodyRowObject[header[j]];
            bodyRow.appendChild(bodyCell);
        }
        bodyRows.push(bodyRow);
    }

    // get table footer
    var footer = object_array[0].Footer;
    var footerRow = document.createElement("tr");
    for (var i = 0; i < footer.length; i++) {
        var footerCell = document.createElement("td");
        footerCell.innerHTML = footer[i].value;
        footerCell.colSpan = footer[i].colspan;
        footerRow.appendChild(footerCell);
    }

    // append table header, body, footer to table id="newTable"
    var table = document.getElementById("newTable");
    table.appendChild(headerRow);
    for (var i = 0; i < bodyRows.length; i++) {
        table.appendChild(bodyRows[i]);
    }
    table.appendChild(footerRow);
}

function remove_previous_table() {
    var table = document.getElementById("newTable");
    var rows = table.rows.length;
    for (var i = 0; i < rows; i++) {
        table.deleteRow(0);
    }
}