export const timeLapsed = (timestamp) => {
    const now = new Date();
    const timeDifference = now - new Date(timestamp);

    const seconds = 1000;
    const minutes = seconds * 60;
    const hours = minutes * 60;
    const days = hours * 24;
    const months = days * 30.44;
    const years = days * 365.25;

    const elapsedYears = Math.floor(timeDifference / years);
    const elapsedMonths = Math.floor((timeDifference % years) / months);
    const elapsedDays = Math.floor((timeDifference % months) / days);
    const elapsedHours = Math.floor((timeDifference % days) / hours);
    const elapsedMinutes = Math.floor((timeDifference % hours) / minutes);
    const elapsedSeconds = Math.floor((timeDifference % minutes) / seconds);

    if (elapsedYears > 0) {
        return elapsedYears === 1
            ? `${elapsedYears} year${elapsedMonths > 0 ? ` and ${elapsedMonths} month${elapsedMonths > 1 ? 's' : ''}` : ''} ago`
            : `${elapsedYears} years${elapsedMonths > 0 ? ` and ${elapsedMonths} months` : ''} ago`;
    } else if (elapsedMonths > 0) {
        return elapsedMonths === 1 ? `${elapsedMonths} month ago` : `${elapsedMonths} months ago`;
    } else if (elapsedDays > 0) {
        return elapsedDays === 1 ? `${elapsedDays} day ago` : `${elapsedDays} days ago`;
    } else if (elapsedHours > 0) {
        return elapsedHours === 1 ? `${elapsedHours} hour ago` : `${elapsedHours} hours ago`;
    } else if (elapsedMinutes > 0) {
        return elapsedMinutes === 1 ? `${elapsedMinutes} minute ago` : `${elapsedMinutes} minutes ago`;
    } else {
        return elapsedSeconds === 1 ? `${elapsedSeconds} second ago` : `${elapsedSeconds} seconds ago`;
    }
}
