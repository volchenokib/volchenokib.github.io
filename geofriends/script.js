// Отправка запроса на сервер VK
function vkApi(method, options) {
	if (!options.v) {
		options.v = '5.68';
	}

	return new Promise((resolve, reject) => {
		VK.api(method, options, data => {
			if (data.error) {
				reject(new Error(data.error.error_msg));
			} else {
				resolve(data.response);
			}
		});
	});
}

// Инициализация для VK
function vkInit() {
	return new Promise((resolve, reject) => {
		VK.init({
			apiId: 6335526
		});

		VK.Auth.login(data => {
			if (data.session) {
				resolve();
			} else {
				reject(new Error('Не удалось авторизоваться'));
			}
		}, 2);
	});
}

// Функция для яндекс карт в которую мы передаем название страны и(или) города и получаем координаты
function geocode(address) {
	// встроенная в яндекс карты функция для декодирования (название страны, города => координаты)
	return ymaps.geocode(address)
		// эта функ-я сама возвращает Promise и результат в ввиде списка
		.then(result => {
			const points = result.geoObjects.toArray(); // список в массив
			// если в массиве есть хоть один элемент
			if (points.length) {
				// берем географические координаты первого элемента массива
				return points[0].geometry.getCoordinates();
			}
		});
}

let myMap;
let clusterer;

// ждем загрузку карты
new Promise(resolve => ymaps.ready(resolve))

	// авторизация источника данных
	.then(() => vkInit())

	// получаем список друзей и их гео данные
	.then(() => vkApi('friends.get', { fields: 'city,country' }))

	// инициализация карты
	.then(friends => {
		myMap = new ymaps.Map('map', {
			center: [55.76, 37.64], // Москва
			zoom: 5
		}, {
			searchControlProvider: 'yandex#search'
		});
		clusterer = new ymaps.Clusterer({
			preset: 'islands#invertedVioletClusterIcons',
			clusterDisableClickZoom: true,
			openBalloonOnClick: false
		}); // настраиваем кластеризацию меток

		myMap.geoObjects.add(clusterer); // добавляем кластеризацию на карту

		return friends.items; // пробрасываем список друзей т.к. здесь мы его не используем, а в слудующем шаге он понадобиться
	})

	// получение адресов и координат
	.then(friends => {
		const promises = friends
			// Отсееваем друзей у которых не указана страна (а значит и город )
			.filter(friend => friend.country && friend.country.title)

			// Получаем названия страны и города у оставшихся
			.map(friend => {
				let parts = friend.country.title; // Россия

				if (friend.city) {
					parts += ' ' + friend.city.title; // Россия Москва
				}

				return parts;
			})
			// у каждого элемента массива (Россия Москва) узнаем координаты
			.map(geocode);

		// т.к. geocode возвращает Promise, мы получили массив с Promise и теперь все их разрешаем
		return Promise.all(promises);
	})

	// Для каждого элемента массива (а это координаты) ставим метку на катру
	.then(coords => {
		const placemarks = coords.map(coord => {
			return new ymaps.Placemark(coord, {}, { preset: 'islands#blueHomeCircleIcon' })
		});
		clusterer.add(placemarks);
	})

	// Ловим ошибки
	.catch(e => alert('Ошибка: ' + e.message));