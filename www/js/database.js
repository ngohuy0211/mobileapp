   //prefixes of implementation that we want to test
   window.indexedDB = window.indexedDB || window.mozIndexedDB || 
   window.webkitIndexedDB || window.msIndexedDB;
   
   //prefixes of window.IDB objects
   window.IDBTransaction = window.IDBTransaction || 
   window.webkitIDBTransaction || window.msIDBTransaction;
   window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || 
   window.msIDBKeyRange
   
   if (!window.indexedDB) {
      window.alert("Your browser doesn't support a stable version of IndexedDB.")
   }
   
   var db;
   var request = window.indexedDB.open("huyngo", 1);
   
   request.onerror = function(event) {
      console.log("error: ");
   };
   
   request.onsuccess = function(event) {
      db = request.result;
      readAll()
      loadDetail()
   };
   
   request.onupgradeneeded = function(event) {
      var db = event.target.result;
      var objectStore = db.createObjectStore("huyDb", {keyPath: "id",autoIncrement: true});
      
   }

   function readAll() {
      var objectStore = db.transaction("huyDb").objectStore("huyDb");
      
      objectStore.openCursor().onsuccess = function(event) {
         var cursor = event.target.result;
         let newIndex
         if(cursor) {
            newIndex = `<div class="list-restaurant" id="list-res">
            <div>
              <div class="col-md-4 mb-3">
                <div class="row">
                  <div class="image">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4jW2HFBKboZvE_UOJKwwLNze007IUvyfQ9Q&usqp=CAU" width="280" height="160" alt="">
                  </div>
                  <div class="text">
                    <div class="res-name">${cursor.value.restaurant_name}</div>
                    <div class="res-type">Restaurant Type: ${cursor.value.restaurant_type}</div>
                    <div class="res-phone">Hotline: ${cursor.value.hotline} </div>
                    <div class="res-average-rate">Average Rating: ${cursor.value.rating} <span class="fa fa-star"></span></div>
                  </div>
                  <div class="button">
                    <input type="button" value="Delete" onClick="deleteRestaurant(${cursor.value.id})" class="btn btn-primary">
                    <input type="button" value="Detail" onClick="detailRestaurant(${cursor.value.id})" class="btn btn-primary">
                  </div>
                </div>
              </div>
            </div>
          </div>`
            cursor.continue();
         }
         $('#body').append(newIndex);

      };
   }
function deleteRestaurant(id) {
   var request = db.transaction(["huyDb"], "readwrite")
   .objectStore("huyDb")
   .delete(parseInt(id));
   request.onsuccess = function(event) {
      navigator.notification.beep(1);
      navigator.notification.vibrate(1000);
      alert("Delete Successfull!!.");
      window.location = "index.html"
   }
}

function loadDetail() {
  var id = document.URL.split('=')[1]
   var transaction = db.transaction(["huyDb"]);
   var objectStore = transaction.objectStore("huyDb");
   var request = objectStore.get(parseInt(id));
   
   request.onerror = function(event) {
      alert("Unable to retrieve data from database!");
   };
   
   request.onsuccess = function(event) {
      console.log("alo");
      // console.log(request.result);
      $('.name').text(request.result.restaurant_name)
      $('.type').text(request.result.restaurant_type)
      $('.address').text(request.result.address)
      $('.hotline').text(request.result.hotline)
      $('.datexTime').text(request.result.date_time)
      $('.avgPrice').text(request.result.ave_meal_price)
      $('.sRate').text(request.result.service_rating)
      $('.cRate').text(request.result.cleanliness_rating)
      $('.fRate').text(request.result.food_quality_rating)
      $('.notes').text(request.result.notes)            
      $('.rName').text(request.result.reporter_name)
   };
}
 
function detailRestaurant(id) {
   window.location = 'form-detail.html?id=' + id
}
function view(id) {
   var transaction = db.transaction(["huyDb"]);
   var objectStore = transaction.objectStore("huyDb");
   var request = objectStore.get(parseInt(id))
   
   request.onsuccess = function(event) {
      // Do something with the request.result!
      if(request.result) {
      //    alert("Name: " + request.result.name + ", 
      //       Age: " + request.result.age + ", Email: " + request.result.email);
      // } else {
      //    alert("Kenny couldn't be found in your database!");
      // }
   };
}
}

function add(feedback) {
   var request = db.transaction(["huyDb"], "readwrite")
   .objectStore("huyDb")
   .add(feedback);
   
   request.onsuccess = function(event) {
      alert("Feedback Successfull!!")
      window.location = "index.html"         };
   
   request.onerror = function(event) {
      alert("Unable to add data\r\nKenny is aready exist in your database! ");
   }
}

function submitFeedback() {
   var sum = parseInt($('#service-rating').val()) + parseInt($('#clean-rating').val()) + parseInt($('#food-rating').val())
   var averageStar = Math.floor(sum/3)
   if($('#restaurant-name') == "" || $('#restaurant-type').val() == "" || $('#address').val() == "" || $('#hotline').val() == "" || $('#datextime').val() == "" || $('#service-rating').val() =="" || $('#average-price').val() =="" || $('#clean-rating').val() == "" ||$('#notes').val() == "" || $('#reporter').val() == "") {
      alert("Feedback Failed!!")
   } else {
      const feedback = {
         restaurant_name: $('#restaurant-name').val(),
         restaurant_type: $('#restaurant-type').val(),
         address: $('#address').val(),
         hotline: $('#hotline').val(),
         date_time: $('#datextime').val(),
         ave_meal_price: $('#average-price').val(),
         service_rating: $('#service-rating').val(),
         cleanliness_rating: $('#clean-rating').val(),
         food_quality_rating: $('#food-rating').val(),
         notes: $('#notes').val(),
         rating: averageStar,
         reporter_name: $('#reporter').val()
      }
      add(feedback)
      navigator.notification.beep(1);
      navigator.notification.vibrate(1000);
   }
}

function takePicture() {
   navigator.camera.getPicture(onSuccess, onFail,{
       quality: 50,
       // allow = true co nghia la sau khi chup xong co the chinh sua anh roi moi upload len
       allowEdit: false, 
       // anh tra ve
       destinationType: Camera.DestinationType.FILE_URI
   })
}

function onSuccess(url) {
   alert(url);

   ic = document.getElementById('imageContainer');

   ic.innerHTML = '<img src ="' + url + '" width="50%" />';

}

function onFail() {
   alert('Failed because: ' + message);
}

