type DateFormatType = "dateTime" | "dateOnly" | "timeOnly";

export const formatDate = (
  date: Date | null,
  type: DateFormatType = "dateTime",
  locale: string = "en-US"
): string => {
  if (!date) return "";

  const options: Record<DateFormatType, Intl.DateTimeFormatOptions> = {
    dateTime: {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
    dateOnly: {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
    timeOnly: {
      hour: "2-digit",
      minute: "2-digit",
    },
  };

  return new Intl.DateTimeFormat(locale, options[type]).format(date);
};
