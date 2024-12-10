document.getElementById('scoreForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const score = parseInt(document.getElementById('score').value);
    const time = document.getElementById('time').value;

    const tableBody = document.getElementById('scoreTableBody');

    const newRow = document.createElement('tr');
    newRow.innerHTML = `<td>${name}</td><td>${score}</td><td>${time}</td>`;
    tableBody.appendChild(newRow);

    // Save data to localStorage
    saveDataToLocalStorage();

    // Sort the table
    sortTable();

    // Clear the form
    document.getElementById('scoreForm').reset();
});

document.getElementById('fetchData').addEventListener('click', function() {
    fetch('https://api.example.com/scores') // Replace with your backend API endpoint
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('scoreTableBody');
            tableBody.innerHTML = ''; // Clear existing rows

            data.forEach(item => {
                const newRow = document.createElement('tr');
                newRow.innerHTML = `<td>${item.name}</td><td>${item.score}</td><td>${item.time}</td>`;
                tableBody.appendChild(newRow);
            });

            // Save fetched data to localStorage
            saveDataToLocalStorage();

            // Sort the table
            sortTable();
        })
        .catch(error => console.error('Error fetching data:', error));
});

function saveDataToLocalStorage() {
    const tableBody = document.getElementById('scoreTableBody');
    let rows = Array.from(tableBody.querySelectorAll('tr'));

    let data = rows.map(row => {
        return {
            name: row.cells[0].innerText,
            score: parseInt(row.cells[1].innerText),
            time: row.cells[2].innerText
        };
    });

    localStorage.setItem('scores', JSON.stringify(data));
}

function loadDataFromLocalStorage() {
    let data = JSON.parse(localStorage.getItem('scores') || '[]');
    const tableBody = document.getElementById('scoreTableBody');
    tableBody.innerHTML = '';

    data.forEach(item => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `<td>${item.name}</td><td>${item.score}</td><td>${item.time}</td>`;
        tableBody.appendChild(newRow);
    });

    // Sort the table
    sortTable();
}

function sortTable() {
    const tableBody = document.getElementById('scoreTableBody');
    let rows = Array.from(tableBody.querySelectorAll('tr'));
    rows.sort((a, b) => {
        const scoreA = parseInt(a.cells[1].innerText);
        const scoreB = parseInt(b.cells[1].innerText);
        return scoreB - scoreA; // descending order
    });

    tableBody.innerHTML = '';
    rows.forEach(row => tableBody.appendChild(row));
}

// Load data from localStorage when the page loads
window.onload = loadDataFromLocalStorage;
