const RestaurantData = [
    {
        res_name: 'Restaurant demo',
        res_type: 'Demo',
        date_time: 'abc',
        average_price: '300000',
        ser_rating: 'good',
        clean_rating: 'good',
        food_rating: 'good',
        notes: ''
    },
    {
        res_name: 'Restaurant demo',
        res_type: 'Demo',
        date_time: 'abc',
        average_price: '300000',
        ser_rating: 'good',
        clean_rating: 'good',
        food_rating: 'good',
        notes: ''
    },
    {
        res_name: 'Restaurant demo',
        res_type: 'Demo',
        date_time: 'abc',
        average_price: '300000',
        ser_rating: 'good',
        clean_rating: 'good',
        food_rating: 'good',
        notes: ''
    },
    {
        res_name: 'Restaurant demo',
        res_type: 'Demo',
        date_time: 'abc',
        average_price: '300000',
        ser_rating: 'good',
        clean_rating: 'good',
        food_rating: 'good',
        notes: ''
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
