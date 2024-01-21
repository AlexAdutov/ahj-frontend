import moment from 'moment';

// Класс Ticket представляет тикет и предоставляет методы для его отображения и управления
export default class Ticket {
  // Конструктор класса, принимает данные тикета
  constructor(data) {
    this.data = data; // Данные тикета
  }

  // Статический метод, возвращает HTML-разметку для отображения тикета
  static getHTML() {
    return `
    <input class="tickets-list__item-status" type="checkbox">
    <span class="tickets-list__item-name"></span>
    <span class="tickets-list__item-created"></span>
    <button class="tickets-list__item-edit-btn">&#9998</button>
    <button class="tickets-list__item-delete-btn">X</button>
    
    `;
  }

  // Метод для создания и возвращения объекта с элементами управления тикетом
  getTicket() {
    console.log(this.data); // дебугер
    this.ticketElm = document.createElement('li'); // Создание элемента списка для тикета
    this.ticketElm.classList.add('tickets-list__item'); // Добавление класса для стилизации
    this.ticketElm.innerHTML = Ticket.getHTML(); // Заполнение HTML-разметкой
    const formatedDateTime = moment(this.data.created).format('DD.MM.YY HH:mm'); // Форматирование даты и времени

    const nameElm = this.ticketElm.querySelector('.tickets-list__item-name'); // Элемент для отображения имени тикета
    nameElm.innerText = this.data.name; // Установка имени тикета

    this.ticketElm.querySelector('.tickets-list__item-created').innerText = formatedDateTime; // Установка даты и времени создания тикета

    const editBtn = this.ticketElm.querySelector('.tickets-list__item-edit-btn'); // Кнопка для редактирования тикета
    const deleteBtn = this.ticketElm.querySelector('.tickets-list__item-delete-btn'); // Кнопка для удаления тикета
    const statusBox = this.ticketElm.querySelector('.tickets-list__item-status'); // Чекбокс для изменения статуса тикета

    statusBox.checked = this.data.status; // Установка статуса тикета

    const onChangeTicket = (data) => {
      this.data = data;
      nameElm.innerText = this.data.name; // Обновление имени тикета
      statusBox.checked = this.data.status; // Обновление статуса тикета
    };

    // Метод для удаления элемента списка тикетов
    const onRemoveTicket = () => { this.ticketElm.remove(); };

    return {
      ticketElm: this.ticketElm,
      nameElm,
      editBtn,
      deleteBtn,
      statusBox,
      onChangeTicket,
      onRemoveTicket,
    };
  }

  // Метод для получения элемента описания тикета
  getTicketDescription(data) {
    const descrElm = this.ticketElm.querySelector('.tickets-list__item-description');

    if (descrElm) {
      return descrElm;
    }

    return Ticket.createDescription(data);
  }

  // Статический метод для создания элемента описания тикета
  static createDescription(data) {
    const description = document.createElement('p');
    description.classList.add('tickets-list__item-description');
    description.innerText = data.description;
    return description;
  }
}
