export function formatTime(mongoTimestamp) {
    // Create a Date object from the MongoDB timestamp
    const date = new Date(mongoTimestamp);

    // Define an array of month names
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Extract the day, month, and year from the Date object
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    // Extract the hours and minutes
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Add leading zero if needed

    // Determine AM or PM suffix
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    // Format the date and time as a string
    const formattedDate = `${day} ${month} ${year}, ${hours}:${minutes} ${ampm}`;

    return formattedDate;
}
