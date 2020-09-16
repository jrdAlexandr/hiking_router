

let apiLoaded = async () => {
  await ymaps.ready(init);
  
}

apiLoaded()

function init () {
    var geolocation = ymaps.geolocation,
        coords = [geolocation.latitude, geolocation.longitude]
    var myMap = new ymaps.Map("map", {
            center: coords,
            zoom: 10,
            behaviors: ['default', 'scrollZoom']
        }),

        // Создаем геообъект с типом геометрии "Точка".
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
                balloonContent: 'Меня можно перемещать',
                behaviors: ["default", "scrollZoom"]
            }
        }, {
            // Опции.
            // Иконка метки будет растягиваться под размер ее содержимого.
            preset: 'twirl#redStretchyIcon',
            // Метку можно перемещать.
            draggable: true
        })

    // Добавляем меткy на карту.
    myMap.geoObjects
        .add(myGeoObject);
        myGeoObject.events.add('balloonopen', function (e) {
          myGeoObject.properties.set('balloonContent', "Идет загрузка данных...");
  
          // Имитация задержки при загрузке данных (для демонстрации примера).
          setTimeout(function () {
              ymaps.geocode(myGeoObject.geometry.getCoordinates(), {
                  results: 1
              }).then(function (res) {
                  var newContent = res.geoObjects.get(0) ?
                          res.geoObjects.get(0).properties.get('name') :
                          'Не удалось определить адрес.';
  
                  // Задаем новое содержимое балуна в соответствующее свойство метки.
                  myGeoObject.properties.set('balloonContent', newContent);
              });
          }, 1500);
        });
}





    

   
