let userPoint;
const buttonSearch = document.querySelector('#createRoute')
var myMap;
let YaMap = document.querySelector('#map')
ymaps.ready(init);
let dist;
async function init() {
  var location = await ymaps.geolocation.get({
    provider: 'yandex',
    autoReverseGeocode: true
  });
  let coords = location.geoObjects.get(0).geometry._coordinates
  userPoint = location.geoObjects.get(0).geometry._coordinates
  myMap = new ymaps.Map("map", {
    center: coords,
    zoom: 10
  })


  myGeoObject = new ymaps.GeoObject({
    // Описание геометрии.
    geometry: {
      type: "Point",
      coordinates: coords
    },
    // Свойства.
    properties: {
      // Контент метки.
      iconContent: 'Я',
      balloonContent: "Идет загрузка данных..."
    }
  }, {
    // Опции.
    // Иконка метки будет растягиваться под размер ее содержимого.
    preset: 'islands#blackStretchyIcon',
    // Метку можно перемещать.
    draggable: true
  })
  myMap.geoObjects
    .add(myGeoObject)

  myGeoObject.events.add('balloonopen', function (e) {
    myGeoObject.properties.set('balloonContent', "Идет загрузка данных...");


    ymaps.geocode(myGeoObject.geometry.getCoordinates(), {
      results: 1
    }).then(function (res) {

      var newContent = res.geoObjects.get(0) ?
        res.geoObjects.get(0).properties.get('name') :
        'Не удалось определить адрес.';
      myGeoObject.properties.set('balloonContent', newContent);
    });
  });
  myGeoObject.events.add('drag', async function (e) {
    userPoint = myGeoObject.geometry.getCoordinates()

  })
}



async function callbackSearch() {

  var searchControl = new ymaps.control.SearchControl({
    options: {
      provider: 'yandex#search'
    }
  });
  myMap.controls.add(searchControl);
  await searchControl.search('кафе')
  var geoObjectsArray = await searchControl.getResultsArray()
  let arrCafeCoords = []

  for (let i = 0; i < geoObjectsArray.length; i++) {
    arrCafeCoords.push(geoObjectsArray[i].geometry._coordinates)
  }


  let shuffledArr = arrCafeCoords.sort(function () {
    return Math.random() - 0.5;
  });
  let arrRoute = [userPoint, shuffledArr[0], userPoint]
  let route = await ymaps.route(arrRoute);
  let tempDist = await route.getLength();
  dist = Math.round(tempDist);
  for (let i = 1; i < shuffledArr.length; i++) {
    route = await ymaps.route(arrRoute);
    tempDist = await route.getLength();
    console.log(route);
    console.log(tempDist);
    if (tempDist < 10000) {
      arrRoute.pop()
      arrRoute.push(shuffledArr[i])
      arrRoute.push(userPoint)
    } else {
      break
    }
  }

  if (YaMap.children.length) YaMap.children[0].remove()
  createrRouter(arrRoute);
}


function createrRouter(data) {

  /**
   * Создаем мультимаршрут.
   * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/multiRouter.MultiRoute.xml
   */

  multiRoute = new ymaps.multiRouter.MultiRoute({
    referencePoints: data,
    params: {
      //Тип маршрутизации - пешеходная маршрутизация.
      routingMode: 'pedestrian'
    }
  }, {
    // Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.
    boundsAutoApply: true
  });

  myMap = new ymaps.Map("map", {
    center: userPoint,
    zoom: 12,
  });

  // Добавляем мультимаршрут на карту.
  myMap.geoObjects.add(multiRoute);
}

buttonSearch.addEventListener('click', callbackSearch)
