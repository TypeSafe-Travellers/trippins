export const getMessageTime = (messageDate: Date): string => {
  const today = new Date();

  const diff = today.getTime() - messageDate.getTime();
  const diffMinutes = diff / 1000 / 60;
  const diffHours = diff / 1000 / 60 / 60;

  let dateString;
  if (messageDate.toDateString() === today.toDateString()) {
    if (diffMinutes < 1) {
      dateString = "sent just now";
    } else if (diffMinutes < 60) {
      dateString =
        "sent " +
        Math.round(diffMinutes) +
        `${Math.round(diffMinutes) === 1 ? " minute ago" : " minutes ago"}`;
    } else {
      dateString =
        "sent " +
        Math.round(diffHours) +
        `${Math.round(diffHours) === 1 ? " hour ago" : " hours ago"}`;
    }
  } else {
    dateString = "sent on " + messageDate.toLocaleDateString();
  }

  return dateString;
};
