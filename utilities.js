const timeGetHome = document.getElementById('timeGetHome');
const timeToSleep = document.getElementById('timeToSleep');
for (let hour = 1; hour <= 24; hour++)
{
    let formattedTime = (hour > 12)? (hour - 12) : hour; //13-24
    let display = (hour <= 12)? `${hour} AM` : `${formattedTime} PM`;
    let option = document.createElement('option');
    let option1 = document.createElement('option');

    option.value = display;
    option.textContent = display;
    if (display === '8 PM') {
            option.defaultSelected = true;
    }
    timeGetHome.appendChild(option);

    option1.value = display;
    option1.textContent = display;
    if (display === '11 PM') {
            option1.defaultSelected = true;
    }
    timeToSleep.appendChild(option1);
}

