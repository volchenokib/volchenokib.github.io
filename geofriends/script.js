// Sending a request to the  VK server
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

// VK init
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

// Geocoder
function geocode(address) {

	return ymaps.geocode(address)
		.then(result => {
			const points = result.geoObjects.toArray(); // список в массив

			if (points.length) {

				return points[0].geometry.getCoordinates();
			}
		});
}

let myMap;
let clusterer;
let filteredFriends;

//waiting for the map to load
new Promise(resolve => ymaps.ready(resolve))

	// authorization VK
	.then(() => vkInit())

	// get a list of friends and their data
	.then(() => vkApi('friends.get', { fields: 'city, country, photo_100' }))

	// yandex map init
	.then(friends => {
		filteredFriends = friends.items.filter(friend => friend.country && friend.country.title);
		const filteredList = friends.items

			.filter(friend => friend.country && friend.country.title);

		myMap = new ymaps.Map('map', {
			center: [55.76, 37.64], // Moscow
			zoom: 5
		}, {
			searchControlProvider: 'yandex#search'
		});

		clusterer = new ymaps.Clusterer({
			preset: 'islands#invertedBlueClusterIcons',
			clusterDisableClickZoom: true,
			openBalloonOnClick: true
		});

		myMap.geoObjects.add(clusterer);

		return filteredList;
	})

	// obtaining coordinates
	.then(friends => {
		const promises = friends

			.filter(friend => friend.country && friend.country.title)


			.map(friend => {
			let place = friend.country.title;

			if (friend.city) {
				place += ' ' + friend.city.title;
			}
			return place;
		})

			.map(geocode);

		return Promise.all(promises);
	})

	.then(coords => {
	const resultList = filteredFriends

		// transformation filtered friends list & add list of coordinates
		.map(friend => {
			return {
				place: coords.shift(),
				name: friend.first_name + ' ' + friend.last_name,
				photo: friend.photo_100,
				status: friend.online
			};
		});


	// set placemarks on the map
		for (let i = 0, l = resultList.length; i < l; i++) {
			let point = resultList[i];
			clusterer.add(new ymaps.Placemark(
				point.place, {
					balloonContentHeader: point.name,
					// balloonContentBody: point.photo,
					// balloonContentFooter: point.status

				}

			));

		}

	})

	// catch errors
	.catch(e => alert('Ошибка: ' + e.message));