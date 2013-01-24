
var db;
const DB_NAME = "notes";

/**
 *Checks browser compatibilty with indexedDB and calls |initIndexedDB()|
 */
function init() {
  window.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB;
  if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB. Saving and Loading Documents feature will not be available.");
  } else {
    initIndexedDB();
  }
};


function initIndexedDB() {
  var request = window.indexedDB.open(DB_NAME);

  request.onerror = function onError_Init(event) {
    alert("Error Opening/Creating Database");
  }

  request.onsuccess = function onSuccess_Init(event) {
    db = request.result;
    displayDocList();
    displayEventList();
  }

  request.onupgradeneeded = function onUpgradeNeeded(event) {
    db = event.target.result;
    var objectStore = db.createObjectStore("note", {
      keyPath: "timeStamp"
    });
    var eventStore = db.createObjectStore("event", {
      keyPath: "timeStamp"
    });
  }
};


function saveDocument(docName, docContent) {
  var trans = db.transaction(["note"], "readwrite");
  var store = trans.objectStore("note");
  var data = {
    "filename": docName,
    "text": docContent,
    "timeStamp": Date.now()
  };

  var request = store.put(data);
   
  request.onsuccess = function onSuccess_Save(e) {
    displayDocList();
  };
  request.onerror = function onError_Save(e) {
    alert("An Error Occured while Saving Document!");
  };
};

function saveEvente(eventName, eventDesc,eventDate,eventTime) {
  var trans1 = db.transaction(["event"], "readwrite");
  var store1 = trans1.objectStore("event");
  var data1 = {
    "eventname": eventName,
    "eventdesc": eventDesc,
    "eventdate": eventDate,
    "eventtime": eventTime,
    "timeStamp": Date.now()
  };

  var request1 = store1.put(data1);
   
  request1.onsuccess = function onSuccess_Save(e) {
    displayEventList();
  };
  request1.onerror = function onError_Save(e) {
    alert("An Error Occured while Saving Event!");
  };
};

function deleteDoc(id) {
  var trans = db.transaction(["note"], "readwrite");
  var store = trans.objectStore("note");
  var request = store.delete(id);
  request.onsuccess = function onSuccess_Del(e) {
    displayDocList();
  };

  request.onerror = function onError_Del(e) {
    alert("Delete Request Error !");
  };
};

function deleteEvent(id) {
  var trans1 = db.transaction(["event"], "readwrite");
  var store1 = trans1.objectStore("event");
  var request1 = store1.delete(id);
  request1.onsuccess = function onSuccess_Del(e) {
    displayEventList();
  };

  request1.onerror = function onError_Del(e) {
    alert("Delete Request Error !");
  };
};

function displayDocList() {
  var listElement = document.getElementById("docList");
  listElement.innerHTML = "";

  var trans = db.transaction(["note"], "readwrite");
  var store = trans.objectStore("note");

  var cursorRequest = store.openCursor();
  cursorRequest.onsuccess = function onSuccess_Cursor(e) {
    var result = e.target.result;
    if ( !! result == false) return;
    renderDocNames(result.value);
    result.continue ();
  };

  cursorRequest.onerror = function onError_Cursor(e) {
    alert("Cursor Request Error !");
  }
};

function displayEventList() {
  var listElement = document.getElementById("eventList");
  listElement.innerHTML = "";

  var trans1 = db.transaction(["event"], "readwrite");
  var store1 = trans1.objectStore("event");

  var cursorRequest1 = store1.openCursor();
  cursorRequest1.onsuccess = function onSuccess_Cursor(e) {
    var result1 = e.target.result;
    if ( !! result1 == false) return;
    renderEventNames(result1.value);
    result1.continue ();
  };

  cursorRequest1.onerror = function onError_Cursor(e) {
    alert("Cursor Request Error !");
  }
};

function saveDoc() {
  var docName = document.getElementById('docName').value;
  var docContent = document.getElementsByTagName('section')[0].innerHTML;
  saveDocument(docName, docContent);
  alert("Document "+docName+" saved successfully !");
  document.getElementById('docName').value = "";
};

function saveEvent() {
  var eventName = document.getElementById('eventName').value;
    
  var eventDesc = document.getElementById('eventDesc').value;
  var eventDate = document.getElementById('eventDate').value;
  
  var eventTime = document.getElementById('eventTime').value;

saveEvente(eventName, eventDesc, eventDate, eventTime);
  alert("Event "+eventName+" saved successfully !");
  document.getElementById('eventName').value = "";
  document.getElementById('eventDesc').value = "";
  document.getElementById('eventDate').value = "";
  document.getElementById('eventTime').value = "";
};

function renderDocNames(row) {
  var listElement = document.getElementById("docList");
  var li = document.createElement("li");
  var a = document.createElement("a");
  var aDel = document.createElement("a");
  a.addEventListener("click", function () {
    document.getElementsByTagName('section')[0].innerHTML = row.text;
  }, false);

  aDel.addEventListener("click", function () {
    deleteDoc(row.timeStamp);
  }, false);

  aDel.textContent = " [Delete]";
  a.textContent = row.filename;
  li.appendChild(a);
  li.appendChild(aDel);
  listElement.appendChild(li);
};

function renderEventNames(row) {
  var listElement = document.getElementById("eventList");
  var li = document.createElement("li");
  var a = document.createElement("a");
  var aDel = document.createElement("a");
  a.addEventListener("click", function () {
    alert("Event: "+row.eventname+"\nDesc.: "+row.eventdesc+"\nDate: "+row.eventdate+"\nTime: "+row.eventtime);
  }, false);

  aDel.addEventListener("click", function () {
    deleteEvent(row.timeStamp);
  }, false);

  aDel.textContent = " [Delete]";
  a.textContent = row.eventname;
  li.appendChild(a);
  li.appendChild(aDel);
  listElement.appendChild(li);
};

