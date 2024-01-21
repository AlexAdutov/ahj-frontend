// Импорт классов Modal, Requests и Ticket из соответствующих файлов
import Modal from './Modal';
import Requests from './Request';
import Ticket from './Ticket';

// Экспорт класса Controller в качестве основного класса из этого файла
export default class Controller {
  // Конструктор класса, принимает DOM-контейнер и порт для создания экземпляра класса Requests
  constructor(container, port) {
    this.container = container; // Свойство, хранящее DOM-контейнер
    this.requests = new Requests(port); // Создание экземпляра класса Requests с указанным портом
  }

  // Метод инициализации контроллера
  init = async () => {
    this.ticketslist = this.container.querySelector('.tickets-list'); // Получение списка тикетов из DOM
    const btnAdd = this.container.querySelector('.btn-add'); // Получение кнопки добавления тикета из DOM

    await this.requests.getAllTickets(); // Асинхронное получение всех тикетов

    // Если есть хотя бы один тикет, отрисовываем их
    if (this.requests.ticketsArr[0]) {
      this.requests.ticketsArr.forEach((elm) => this.renderTicket(elm));
    }

    // Обработчик события клика по кнопке добавления тикета
    btnAdd.addEventListener('click', (e) => {
      e.preventDefault(); // Предотвращение стандартного поведения кнопки
      
      // Создание модального окна и получение его элементов управления
    const modal = new Modal();
    const { inpShort, textFull, cancelBtn, okBtn, removeModal } = modal.addOrEditTicket();

      // Обработчик события клика по кнопке "ОК" в модальном окне
      okBtn.addEventListener('click', async (ev) => {
        ev.preventDefault();

        // Создание нового тикета с данными из модального окна
        const newTicket = await this.requests.createTicket({
          name: inpShort.value,
          description: textFull.value,
        });

        // Если тикет создан успешно, отрисовываем его и закрываем модальное окно
        if (newTicket) {
          this.renderTicket(newTicket);
          removeModal(); // Закрытие модального окна
        }
      });

      // Обработчик события клика по кнопке "Отмена" в модальном окне
      cancelBtn.addEventListener('click', (ev) => {
        ev.preventDefault(); // Предотвращение стандартного поведения кнопки
        removeModal();
      });
    });
  };

  // Метод отрисовки тикета в списке
  renderTicket(ticket) {
    // Создание экземпляра класса Ticket
    const ticketItem = new Ticket(ticket);
    const {
      ticketElm,
      nameElm,
      editBtn,
      deleteBtn,
      statusBox,
      onChangeTicket,
      onRemoveTicket,
    } = ticketItem.getTicket(); // Получение элементов управления тикетом

    this.ticketslist.append(ticketElm); // Добавление тикета в список
    
    // Обработчик события клика по кнопке "Редактировать" в тикете
    editBtn.addEventListener('click', async (ev) => {
      ev.preventDefault(); // Предотвращение стандартного поведения кнопки

      // Получение информации о тикете по его ID
      await this.requests.getTicketById(ticket);

      // Создание модального окна для редактирования и получение его элементов управления
      const modal = new Modal(this.requests.ticket);
      const { inpShort, textFull, cancelBtn, okBtn, removeModal } = modal.addOrEditTicket(true);

      // Обработчик события клика по кнопке "ОК" в модальном окне редактирования
      okBtn.addEventListener('click', async (e) => {
        e.preventDefault(); // Предотвращение стандартного поведения кнопки

        // Изменение тикета по его ID и получение обновленного тикета
        const newTicket = await this.requests.changeTicketByaId({
          id: ticket.id,
          name: inpShort.value,
          description: textFull.value,
        });

        // Если тикет изменен успешно, обновляем его на странице и закрываем модальное окно
        if (newTicket) {
          onChangeTicket(newTicket);
          removeModal(); // Закрытие модального окна
        }
      });

      // Обработчик события клика по кнопке "Отмена" в модальном окне редактирования
      cancelBtn.addEventListener('click', (e) => {
        e.preventDefault();
        removeModal(); // Закрытие модального окна
      });
    });

    // Обработчик события клика по кнопке "Удалить" в тикете
    deleteBtn.addEventListener('click', async (ev) => {
      ev.preventDefault(); // Предотвращение стандартного поведения кнопки

      // Создание модального окна подтверждения удаления и получение его элементов управления
      const modal = new Modal();

      const { cancelBtn, okBtn, removeModal } = modal.removeTicket();

      // Обработчик события клика по кнопке "ОК" в модальном окне подтверждения удаления
      okBtn.addEventListener('click', async (e) => {
        e.preventDefault(); // Предотвращение стандартного поведения кнопки

        // Удаление тикета по его ID и получение ID удаленного тикета
        const id = await this.requests.deleteTicketByaId(ticket);

        // Если тикет удален успешно, обновляем список тикетов и закрываем модальное окно
        if (id) {
          onRemoveTicket();
          removeModal();
        }
      });

      // Обработчик события клика по кнопке "Отмена" в модальном окне подтверждения удаления
      cancelBtn.addEventListener('click', (e) => {
        e.preventDefault();
        removeModal();
      });
    });

    // Обработчик события изменения состояния чекбокса в тикете
    statusBox.addEventListener('change', async (ev) => {
      ev.preventDefault();

      // Изменение состояния тикета по его ID и получение обновленного тикета
      const newTicket = await this.requests.changeTicketByaId({
        id: ticket.id,
        status: ev.target.checked,
      });

      // Если тикет изменен успешно, обновляем его на странице
      if (newTicket) {
        onChangeTicket(newTicket);
      }
    });

    // Обработчик события клика по имени тикета для отображения/скрытия описания
    nameElm.addEventListener('click', async (ev) => {
      ev.preventDefault();

      // Получение описания тикета и его отображение/скрытие
      await this.requests.getTicketById(ticket);
      const descrElm = ticketItem.getTicketDescription(this.requests.ticket);

      if (ticketElm.contains(descrElm)) { 
        return descrElm.remove(); // Если описание уже отображено, скрыть его 
      }

      ticketElm.append(descrElm); // Если описание не отображено, добавить его
      return '';
    });
  }
}
