document.getElementById('calculateBtn').addEventListener('click', calculateWages);

function calculateWages() {
  const hourlyWage = parseFloat(document.getElementById('hourlyWage').value);
  
  // Getting the hours worked for each day
  const sundayHours = parseFloat(document.getElementById('sundayHours').value) || 0;
  const mondayHours = parseFloat(document.getElementById('mondayHours').value) || 0;
  const tuesdayHours = parseFloat(document.getElementById('tuesdayHours').value) || 0;
  const wednesdayHours = parseFloat(document.getElementById('wednesdayHours').value) || 0;
  const thursdayHours = parseFloat(document.getElementById('thursdayHours').value) || 0;
  const fridayHours = parseFloat(document.getElementById('fridayHours').value) || 0;
  const saturdayHours = parseFloat(document.getElementById('saturdayHours').value) || 0;

  const hoursWorked = sundayHours + mondayHours + tuesdayHours + wednesdayHours + thursdayHours + fridayHours + saturdayHours;

  if (isNaN(hourlyWage) || hourlyWage <= 0 || hoursWorked <= 0) {
    alert('Please enter valid values for hourly wage and hours worked.');
    return;
  }

  // Initialize earnings and overtime variables
  let regularEarnings = 0;
  let dailyOvertimeEarnings = 0;
  let weeklyOvertimeEarnings = 0;
  let dailyOvertimeHours = 0;  // Track total daily overtime hours
  let totalWeeklyHours = 0;  // Track total hours worked in the week

  const dailyHours = [sundayHours, mondayHours, tuesdayHours, wednesdayHours, thursdayHours, fridayHours, saturdayHours];

  // Calculate regular and daily overtime earnings
  dailyHours.forEach(dayHours => {
    const regular = Math.min(dayHours, 8); // Regular hours are up to 8 hours
    const overtime = Math.max(0, dayHours - 8); // Overtime is anything above 8 hours

    regularEarnings += regular * hourlyWage;
    dailyOvertimeEarnings += overtime * hourlyWage * 1.5;  // Daily overtime at 1.5x the hourly wage
    dailyOvertimeHours += overtime; // Add daily overtime hours for the day
    totalWeeklyHours += dayHours; // Add total weekly hours worked
  });

  // Weekly overtime calculation (if total weekly hours exceed 44)
  if (totalWeeklyHours > 44) {
    weeklyOvertimeEarnings = (totalWeeklyHours - 44) * hourlyWage * 1.5; // Weekly overtime at 1.5x the hourly wage
  }

  // Calculate the larger of the daily overtime or weekly overtime
  const totalOvertimeEarnings = Math.max(dailyOvertimeEarnings, weeklyOvertimeEarnings);
  const overtimeHoursWorked = Math.max(dailyOvertimeHours, totalWeeklyHours - 44);  // Pick larger overtime hours

  // Total gross earnings (combining regular earnings and the larger of daily or weekly overtime)
  const grossEarnings = regularEarnings + totalOvertimeEarnings;

  // Calculate the net earnings (gross earnings + overtime earnings)
  const netEarnings = grossEarnings;

  // Display the result
  document.getElementById('regularEarnings').textContent = regularEarnings.toFixed(2);
  document.getElementById('overtimeEarnings').textContent = totalOvertimeEarnings.toFixed(2);
  document.getElementById('grossEarnings').textContent = grossEarnings.toFixed(2);
  document.getElementById('netEarnings').textContent = netEarnings.toFixed(2);
  
  // Display the total hours worked
  document.getElementById('totalHours').textContent = hoursWorked;
  
  // Display the overtime hours worked for the week (either daily or weekly overtime, whichever is greater)
  document.getElementById('overtimeHours').textContent = overtimeHoursWorked.toFixed(2);

  // Show result section
  document.querySelector('.result').style.display = 'block';
}
