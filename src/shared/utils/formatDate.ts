export function formatISOToCustom(isoString: string): string {
    const date = new Date(isoString);
    
    const pad = (num: number) => num.toString().padStart(2, '0');

    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear().toString().slice(-2);
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    
    return `${day}.${month}.${year} | ${hours}:${minutes}`;
  }

export function formatISOToDate(isoString: string): string {
  const date = new Date(isoString);

  const pad = (num: number) => num.toString().padStart(2, '0');

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear().toString().slice(-2);

  return `${day}.${month}.${year}`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  // Опции для формата "Апр 15, 2024"
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short", // "Apr" → будет "Апр" на локали ru
    year: "numeric",
  };

  return date.toLocaleDateString("ru-RU", options);
}

export function formatDateIso(dateString: string): string {
  const isoDate = dateString; // ISO формат
  const date = new Date(isoDate);

  const months = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const formatted = `${day} ${month} ${year} г. | ${hours}:${minutes}`;

  return formatted
}

export function parseDateToISO(dateString: string): string {
  const [day, month, year] = dateString.split(".");
  // месяц в JS начинается с 0, поэтому -1
  const date = new Date(Number("20" + year), Number(month) - 1, Number(day));
  return date.toISOString();
}

export const isValidDate = (dateString: string): boolean => {
    const regex = /^(\d{2})\.(\d{2})\.(\d{4})$/;
    const match = dateString.match(regex);

    if (!match) return false;

    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10) - 1;
    const year = parseInt(match[3], 10);

    const date = new Date(year, month, day);

    return (
      date.getFullYear() === year &&
      date.getMonth() === month &&
      date.getDate() === day
    );
  };

export const isValidDateAllDate = (dateString: string): boolean => {
  // Две цифры для дня, две для месяца, две для года
  const regex = /^(\d{2})\.(\d{2})\.(\d{2})$/;
  const match = dateString.match(regex);

  if (!match) return false;

  const day = parseInt(match[1], 10);
  const month = parseInt(match[2], 10) - 1;
  let year = parseInt(match[3], 10);

  year += year < 50 ? 2000 : 1900;

  const date = new Date(year, month, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month ||
    date.getDate() !== day
  ) {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return date >= today;
};