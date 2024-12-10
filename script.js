document.getElementById('scoreForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const score = parseInt(document.getElementById('score').value);
    const time = document.getElementById('time').value;

    const tableBody = document.getElementById('scoreTableBody');

    const newRow = document.createElement('tr');
    newRow.innerHTML = `<td>${name}</td><td>${score}</td><td>${time}</td>`;
    tableBody.appendChild(newRow);

    // Sort the table
    let rows = Array.from(tableBody.querySelectorAll('tr'));
    rows.sort((a, b) => {
        const scoreA = parseInt(a.cells[1].innerText);
        const scoreB = parseInt(b.cells[1].innerText);
        return scoreB - scoreA; // descending order
    });

    tableBody.innerHTML = '';
    rows.forEach(row => tableBody.appendChild(row));

    // Clear the form
    document.getElementById('scoreForm').reset();
});
