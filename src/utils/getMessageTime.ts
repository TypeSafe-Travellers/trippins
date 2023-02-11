export const getMessageTime = (messageDate: Date): string => {
  const today = new Date();

  const diff = today.getTime() - messageDate.getTime();
  const diffMinutes = diff / 1000 / 60;
  const diffHours = diff / 1000 / 60 / 60;

  let dateString;
  if (messageDate.toDateString() === today.toDateString()) {
    if (diffMinutes < 1) {
      dateString = "Sent just now";
    } else if (diffMinutes < 60) {
      dateString = "sent " + Math.round(diffMinutes) + " minutes ago";
    } else {
      dateString = "sent " + Math.round(diffHours) + " hours ago";
    }
  } else {
    dateString = messageDate.toLocaleDateString();
  }

  return dateString;
};
