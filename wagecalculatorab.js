document.getElementById('calculateBtn').addEventListener('click', calculateWages);

function calculateWages() {
  const hourlyWage = parseFloat(document.getElementById('hourlyWage').value);
  
  // Getting the hours worked for each day
  const mondayHours = parseFloat(document.getElementById('mondayHours').value) || 0;
  const tuesdayHours = parseFloat(document.getElementById('tuesdayHours').value) || 0;
  const wednesdayHours = parseFloat(document.getElementById('wednesdayHours').value) || 0;
  const thursdayHours = parseFloat(document.getElementById('thursdayHours').value) || 0;
  const fridayHours = parseFloat(document.getElementById('fridayHours').value) || 0;
  const saturdayHours = parseFloat(document.getElementById('saturdayHours').value) || 0;
  const sundayHours = parseFloat(document.getElementById('sundayHours').value) || 0;

  const hoursWorked = mondayHours + tuesdayHours + wednesdayHours + thursdayHours + fridayHours + saturdayHours + sundayHours;

  if (isNaN(hourlyWage) || hourlyWage <= 0 || hoursWorked <= 0) {
    alert('Please enter valid values for hourly wage and hours worked.');
    return;
  }

  // Calculate regular and overtime earnings (daily overtime first)
  let regularEarnings = 0;
  let overtimeEarnings = 0;

  // For each day, calculate daily regular and overtime
  const dailyHours = [mondayHours, tuesdayHours, wednesdayHours, thursdayHours, fridayHours, saturdayHours, sundayHours];
  dailyHours.forEach(dayHours => {
    const regular = Math.min(dayHours, 8); // Regular hours are up to 8 hours
    const overtime = Math.max(0, dayHours - 8); // Overtime is anything above 8 hours

    regularEarnings += regular * hourlyWage;
    overtimeEarnings += overtime * hourlyWage * 1.5; // Overtime at 1.5 times the hourly wage
  });

  // Total gross earnings (combining regular and overtime)
  const grossEarnings = regularEarnings + overtimeEarnings;

  // Weekly overtime (if applicable)
  const totalRegularHours = dailyHours.reduce((sum, hours) => sum + Math.min(hours, 8), 0);
  const totalOvertimeHours = dailyHours.reduce((sum, hours) => sum + Math.max(0, hours - 8), 0);

  // Weekly overtime (if weekly hours exceed 44 hours)
  const totalWeeklyHours = dailyHours.reduce((sum, hours) => sum + hours, 0);
  if (totalWeeklyHours > 44) {
    const weeklyOvertime = totalWeeklyHours - 44;
    overtimeEarnings += weeklyOvertime * hourlyWage * 1.5; // Weekly overtime is also paid at 1.5 times the hourly wage
  }

  // Tax calculation (Alberta provincial tax + federal tax)
  const federalTaxRate = 0.15; // Example, 15% federal tax
  const provincialTaxRate = 0.10; // Example, 10% provincial tax in Alberta
  const totalTaxRate = federalTaxRate + provincialTaxRate;

  const taxDeducted = grossEarnings * totalTaxRate;
  const netEarnings = grossEarnings - taxDeducted;

  // Display the result
  document.getElementById('regularEarnings').textContent = regularEarnings.toFixed(2);
  document.getElementById('overtimeEarnings').textContent = overtimeEarnings.toFixed(2);
  document.getElementById('grossEarnings').textContent = grossEarnings.toFixed(2);
  document.getElementById('taxDeducted').textContent = taxDeducted.toFixed(2);
  document.getElementById('netEarnings').textContent = netEarnings.toFixed(2);
  
  // Display the total hours worked
  document.getElementById('totalHours').textContent = hoursWorked;

  // Show result section
  document.querySelector('.result').style.display = 'block';
}