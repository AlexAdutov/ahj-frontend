// Класс Requests предоставляет методы для взаимодействия с сервером, связанными с тикетами

export default class Requests {
  constructor(port) {
    this.port = port; // Порт сервера
    this._ticket = {}; // Текущий тикет
    this._ticketsArr = []; // Массив всех тикетов
  }

  // Геттер для получения текущего тикета
  get ticket() {
    return this._ticket;
  }

  // Геттер для получения массива всех тикетов
  get ticketsArr() {
    return this._ticketsArr;
  }

  // Метод для получения тикета по его ID
  async getTicketById({ id }) {
    try {
      // Отправка запроса на сервер для получения тикета по ID
      const response = await fetch(
        `http://localhost:${this.port}/tickets?method=ticketById&id=${id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      this._ticket = data; // Обновление текущего тикета
    } catch (err) { console.log(err); }
  }

  // Метод для получения всех тикетов
  async getAllTickets() {
    try {
      // Отправка запроса на сервер для получения всех тикетов
      const response = await fetch(
        `http://localhost:${this.port}/tickets?method=allTickets`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      console.log(data); // дебугер
      this._ticketsArr = data; // Обновление массива всех тикетов
    } catch (err) { console.log(err); }
  }

  // Метод для создания нового тикета
  async createTicket(ticketData) {
    try {
      // Отправка запроса на сервер для создания нового тикета
      const response = await fetch(
        `http://localhost:${this.port}/tickets?method=createTicket`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(ticketData),
        },
      );
      return await response.json(); // Возвращение данных созданного тикета
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  // Метод для изменения тикета по его ID
  async changeTicketByaId({ id, ...rest }) {
    try {
      // Отправка запроса на сервер для обновления тикета по ID
      const response = await fetch(
        `http://localhost:${this.port}/tickets?method=updateById&id=${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(rest),
        },
      );
      //console.log(await response.json()); // дебугер
      return await response.json(); // Возвращение данных об обновленном тикете
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  // Метод для удаления тикета по его ID
  async deleteTicketByaId({ id }) {
    try {
      // Отправка запроса на сервер для удаления тикета по ID
      await fetch(
        `http://localhost:${this.port}/tickets?method=removeById&id=${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      return id; // Возвращение ID удаленного тикета
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
