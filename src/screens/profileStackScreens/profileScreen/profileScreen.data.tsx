import { IconFive, IconFour, IconOne, IconThree, IconTwo, NotificationProfileIcon, PhoneIcon, QuitIcon } from "./icons";

export const TABS_DATA = [
  {
    title: "Основное",
    items: [
      { icon: IconOne, title: "Общее", subtitle: "Информация об аккаунте" },
      { icon: IconTwo, title: "Новые события", subtitle: "Изменения на объектах" },
      { icon: IconThree, title: "История действий", subtitle: "Все действия на аккаунте" },
      { icon: IconFour, title: "Моя активность", subtitle: "История посещений объектов" },
      { icon: IconFive, title: "Объекты", subtitle: "Доступы к открытым объектам" },
    ]
  },
  {
    title: "уведомления",
    items: [
      { icon: NotificationProfileIcon, title: "Push уведомления", subtitle: "Чтобы знать все обновления" },
    ]
  },
  {
    title: "больше",
    items: [
      { icon: PhoneIcon, title: "Связаться с нами", subtitle: "Для дополнительной информации" },
      { icon: QuitIcon, title: "Выйти из аккаунта", subtitle: undefined }
    ]
  }
];