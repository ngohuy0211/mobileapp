const RestaurantData = [
    {
        name: 'Restaurant demo',
        type: 'Demo',
        address: 'abcxyz',
        hotline: '123456',
        date_time: 'abc',
        average_price: '300000',
        service_rating: 1,
        clean_rating: 2,
        food_rating: 3,
        notes: '',
        reporter: 'Huy',
        image: "https://media-cdn.tripadvisor.com/media/photo-s/0e/cc/0a/dc/restaurant-chocolat.jpg"

    },
    {
        res_name: 'Restaurant demo',
        res_type: 'Demo',
        address: 'abcxyz',
        hotline: '123456',
        hotline: '',
        date_time: 'abc',
        average_price: '300000',
        ser_rating: 'good',
        clean_rating: 'good',
        food_rating: 'good',
        notes: '',
        reporter: 'Huy',
        image: "https://media-cdn.tripadvisor.com/media/photo-s/0e/cc/0a/dc/restaurant-chocolat.jpg"
    },
    {
        res_name: 'Restaurant demo',
        res_type: 'Demo',
        address: 'abcxyz',
        hotline: '123456',
        date_time: 'abc',
        average_price: '300000',
        ser_rating: 'good',
        clean_rating: 'good',
        food_rating: 'good',
        notes: '',
        reporter: 'Huy',
        image: "https://media-cdn.tripadvisor.com/media/photo-s/0e/cc/0a/dc/restaurant-chocolat.jpg"
    },
    {
        res_name: 'Restaurant demo',
        res_type: 'Demo',
        address: 'abcxyz',
        hotline: '123456',
        date_time: 'abc',
        average_price: '300000',
        ser_rating: 'good',
        clean_rating: 'good',
        food_rating: 'good',
        notes: '',
        reporter: 'Huy',
        image: "https://media-cdn.tripadvisor.com/media/photo-s/0e/cc/0a/dc/restaurant-chocolat.jpg"
    }
]

var data;
var requestDB = window.indexedDB.open("RestaurantData", 1);
request.onupgradeneeded = function(event) {
    var data = event.target.result;
    var objectStore = data.createObjectStore("RestaurantData", {keyPath: "id", autoIncrement: true});
    for (var i in RestaurantData) {
        objectStore.add(RestaurantData[i])
    }
}

request.onsuccess = function(event) {
    data = request.result;
    console.log("Successfull!: " + data);
}

function LoadDataFrDB(collectionName) {
    const transaction = data.transaction([collectionName], "readonly");
    const objectStore = transaction.objectStore(collectionName);
    request = objectStore.getAll();
    return request;
}
