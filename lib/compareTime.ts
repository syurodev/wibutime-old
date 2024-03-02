export function compareTime(createdAt: Date): string {
  const currentTime = new Date();
  const timeDiff = currentTime.getTime() - createdAt.getTime();
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return years === 1 ? "1 năm trước" : `${years} năm trước`;
  } else if (months > 0) {
    return months === 1 ? "1 tháng trước" : `${months} tháng trước`;
  } else if (days > 0) {
    return days === 1 ? "1 ngày trước" : `${days} ngày trước`;
  } else if (hours > 0) {
    return hours === 1 ? "1 giờ trước" : `${hours} giờ trước`;
  } else if (minutes > 0) {
    return minutes === 1 ? "1 phút trước" : `${minutes} phút trước`;
  } else {
    return seconds <= 1 ? "vừa mới" : `${seconds} giây trước`;
  }
}