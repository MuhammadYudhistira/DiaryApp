export const getRelativeTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  const formatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return formatter.format(-diffInMinutes, 'minute');
  if (diffInHours < 24) return formatter.format(-diffInHours, 'hour');
  return formatter.format(-diffInDays, 'day');
};
