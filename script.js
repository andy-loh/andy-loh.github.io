document.getElementById('scoreForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const score = parseInt(document.getElementById('score').value);

    const tableBody = document.getElementById('scoreTableBody');

    const newRow = document.createElement('tr');
    newRow.innerHTML = `<td>${name}</td><td>${score}</td>`;
    tableBody.appendChild(newRow);

    // Save data to localStorage
    saveDataToLocalStorage();

    // Sort the table
    sortTable();

    // Clear the form
    document.getElementById('scoreForm').reset();
});

// Fetch data from Excel file
function fetchData() {
    fetch('https://raw.githubusercontent.com/your-username/your-repository/main/scores.xlsx')
        .then(response => response.arrayBuffer())
        .then(data => {
            const workbook = XLSX.read(data, {type: "array"});
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(sheet);

            const tableBody = document.getElementById('scoreTableBody');
            tableBody.innerHTML = ''; // Clear existing rows

            json.forEach(item => {
                const newRow = document.createElement('tr');
                newRow.innerHTML = `<td>${item.Name}</td><td>${item.Score}</td>`;
                tableBody.appendChild(newRow);
            });

            // Save fetched data to localStorage
            saveDataToLocalStorage();

            // Sort the table
            sortTable();
        })
        .catch(error => console.error('Error fetching data:', error));
}

function saveDataToLocalStorage() {
    const tableBody = document.getElementById('scoreTableBody');
    let rows = Array.from(tableBody.querySelectorAll('tr'));

    let data = rows.map(row => {
        return {
            name: row.cells[0].innerText,
            score: parseInt(row.cells[1].innerText)
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
        newRow.innerHTML = `<td>${item.name}</td><td>${item.score}</td>`;
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

function deleteAllData() {
    localStorage.removeItem('scores');
    document.getElementById('scoreTableBody').innerHTML = '';
}

// Countdown timer
let countdown = 15;
const countdownElement = document.getElementById('countdown');
function updateCountdown() {
    countdown--;
    countdownElement.innerText = countdown;
    if (countdown <= 0) {
        fetchData();
        countdown = 15;
    }
}

// Load data from localStorage when the page loads
window.onload = () => {
    loadDataFromLocalStorage();
    fetchData();
    setInterval(updateCountdown, 1000); // Update countdown every second
};

document.getElementById('deleteData').addEventListener('click', deleteAllData);
