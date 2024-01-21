// Класс Modal представляет модальные окна для добавления, редактирования и удаления тикетов

export default class Modal {
  // Конструктор класса, принимает тикет и инициализирует HTML-код для модальных окон
  constructor(ticket) {
    this.ticket = ticket;
    this.html = Modal.addOrEditHTML(); // HTML-код для окна добавления/редактирования
    this.delHTML = Modal.deleteHTML(); // HTML-код для окна удаления
  }

  // Статический метод, возвращает HTML-код для окна добавления/редактирования
  static addOrEditHTML() {
    return `
      <p class="modal__title">Добавить тикет</p>
      <label class="modal__label" for="short-description">Краткое описание</label>
      <input class="modal__input_short" type="text" id="short-description">
      <label class="modal__label" for="full-description">Подробное описание</label>
      <textarea class="modal__textarea_full" type="text" id="full-description"></textarea>
      <div class="wrap-btns">
        <button class="modal__cancel-btn">Отмена</button>
        <button class="modal__ok-btn">Ok</button>
      </div>
    `;
  }

  // Статический метод, возвращает HTML-код для окна удаления
  static deleteHTML() {
    return `
      <p class="modal__title">Удалить тикет</p>
      <p class="modal__text">Вы уверены, что хотите удалить тикет? Это действие необратимо.</p>
      <div class="wrap-btns">
        <button class="modal__cancel-btn">Отмена</button>
        <button class="modal__ok-btn">Ok</button>
      </div>
    `;
  }

  // Статический метод, создает форму с заданным HTML-кодом
  static createForm(innerHTML) {
    const form = document.createElement('form');
    form.classList.add('modal');
    form.innerHTML = innerHTML;
    return form;
  }

  // Метод для отображения модального окна добавления/редактирования тикета
  addOrEditTicket(edit = false) {
    // Создание формы с HTML-кодом
    const form = Modal.createForm(this.html);
    document.body.append(form);

    // Получение элементов управления из формы
    const inpShort = form.querySelector('.modal__input_short');
    const textFull = form.querySelector('.modal__textarea_full');
    const cancelBtn = form.querySelector('.modal__cancel-btn');
    const okBtn = form.querySelector('.modal__ok-btn');
    const removeModal = () => form.remove();

    // Если окно используется для редактирования, устанавливаем значения из текущего тикета
    if (edit) {
      inpShort.value = this.ticket.name;
      textFull.value = this.ticket.description;
    }

    return { inpShort, textFull, cancelBtn, okBtn, removeModal };
  }

  // Метод для отображения модального окна удаления тикета
  removeTicket() {
    // Создание формы с HTML-кодом
    const form = Modal.createForm(this.delHTML);
    document.body.append(form);

    // Получение элементов управления из формы
    const cancelBtn = form.querySelector('.modal__cancel-btn');
    const okBtn = form.querySelector('.modal__ok-btn');
    const removeModal = () => form.remove();

    return { cancelBtn, okBtn, removeModal };
  }
}
