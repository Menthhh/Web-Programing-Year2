function generateCalendar() {
    const year = 2023;
    const month = 7; // JavaScript months are 0-based (0 = January, 1 = February, ...)
  
    const firstDay = new Date(year, month, 1); // 
    const lastDay = new Date(year, month + 1, 0);
    const totalDays = lastDay.getDate();
  
    const calendarContainer = document.getElementById('calendarContainer');
    const table = document.createElement('table');

    // Write the month and year
    const caption = document.createElement('caption');
    caption.textContent = firstDay.toLocaleString('default', { month: 'long' }) + ' ' + year;
    table.appendChild(caption);
  
    // Create the header row
    const headerRow = document.createElement('tr');
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    for (const dayOfWeek of daysOfWeek) {
      const th = document.createElement('th');
      th.textContent = dayOfWeek;
      headerRow.appendChild(th);
    }
    table.appendChild(headerRow);
  
    // Create the calendar cells
    let currentDate = 1;
    for (let week = 0; week < 6; week++) {
      const row = document.createElement('tr');
      for (let day = 0; day < 7; day++) {
        const cell = document.createElement('td');
        if ((week === 0 && day < firstDay.getDay()) || currentDate > totalDays) {
          cell.textContent = '';
        } else {
          cell.textContent = currentDate;
          currentDate++;
        }
        row.appendChild(cell);
      }
      table.appendChild(row);
      if (currentDate > totalDays) {
        break;
      }
    }
  
    // Append the table to the container
    calendarContainer.appendChild(table);
  }
  