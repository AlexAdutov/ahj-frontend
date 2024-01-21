// Импорт класса Controller из файла './Controller'
import Controller from './Controller';

// Получение ссылки на DOM-элемент с классом 'container'
const container = document.querySelector('.container');

// Задание порта, на котором будет работать сервер (в данном случае, 7000)
const port = 7000;

// Создание экземпляра класса Controller, передача ему ссылки на контейнер и порт
const controller = new Controller(container, port);

// Вызов метода init() у созданного экземпляра класса Controller
controller.init();
