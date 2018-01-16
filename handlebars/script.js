let fellows = [
	{name: 'Игорь', lastName:'Волченок', town:'Лос-Анжелес', age:'34'},
	{name: 'Иван', lastName:'Грудинин', town:'Красноярск', age:'25'},
	{name: 'Артем', lastName:'Кузнецов', town:'Минск', age:'23'},
	{name: 'Анатолий', lastName:'Орлов', town:'Сочи', age:'19'},
	{name: 'Дмитрий', lastName:'Скуратов', town:'Киев', age:'27'},
];

const template = document.querySelector('#template').textContent;
console.log(template);

const render = Handlebars.compile(template);
console.log(render);

const html = render (fellows);
console.log(html);

const container =  document.querySelector('#container');

container.innerHTML = html;