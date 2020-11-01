const listRes = [
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

var db;
var request = window.indexedDB.open("Restaurant-Database", 2);
request.onupgradeneeded = function(event) {
    var db = event.target.result;
    var objectStore = db.createObjectStore("RestaurantDatabase", {keyPath: "id", autoIncrement: true});
    for (var i in listRes) {
        objectStore.add(listRes[i])
    }
}

request.onsuccess = function(event) {
    db = request.result;
    console.log("Success: " + db);
}

function getAllData(collectionName) {
    const transaction = db.transaction([collectionName], "readonly");
    const objectStore = transaction.objectStore(collectionName);
    request = objectStore.getAll();
    return request;
}
$(window).on('load', function(){
    let result = getAllData("RestaurantDatabase")
    result.onsuccess = function(event){
        let data = event.target.result
        console.log(data)
        for(let i in data){
            let newcontent = `<div class="col-md-4 text-center col-sm-6 col-xs-6">
        <div class="thumbnail product-box">
            <div class="caption">
                <h3><a href="#">${data[i].res_name}</a></h3>
                <p><a href="feedback.html" class="btn btn-success" role="button">Feedback</a> <a href="#" class="btn btn-primary" role="button">See Details</a></p>
            </div>
        </div>
        </div>`

        $('.app').append(newcontent)
        }
        
    }
})