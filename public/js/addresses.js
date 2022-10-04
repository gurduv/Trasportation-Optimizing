    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
    import { getDatabase, set, ref, push, child, onValue } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyAc_cOWg_il7HzJvMq1dHjeFdWkM0xbQrI",
        authDomain: "transportation-optimizing.firebaseapp.com",
        databaseURL: "https://transportation-optimizing-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "transportation-optimizing",
        storageBucket: "transportation-optimizing.appspot.com",
        messagingSenderId: "707944050644",
        appId: "1:707944050644:web:7dca7aaef1c820371ff041",
        measurementId: "G-3WRCZMJ8JK"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    // Get a reference to the database service
    const database = getDatabase(app);
            

    // Arrays for Database
    var idArr = new Array();
    var fullnameArr = new Array();
    var nameArr = new Array();
    var surnameArr = new Array();
    var streetArr = new Array();
    var numberArr = new Array();
    var cityArr = new Array();
    var phoneArr = new Array();
    var fullAddressArr = new Array();

    // variables for elements
    var childWorkerID;
    var childFullName;
    var childName;
    var childSurname;
    var childStreet;
    var childNumber;
    var childCity;
    var childPhone;
    var childfullAddress;

    var jumboAddressArr = new Array();


    // read data
    const dbRef = ref(database, 'employees/');

    onValue(dbRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const childKey = childSnapshot.key;
            const childData = childSnapshot.val();
            
            childWorkerID = (childData.worker_id);
            idArr.push(childWorkerID);

            childFullName = (childData.name + " " + childData.surname);
            fullnameArr.push(childFullName);

            childName = (childData.name);
            nameArr.push(childName);

            childSurname = (childData.surname);
            surnameArr.push(childSurname);
            
            childStreet = (childData.street_name);
            streetArr.push(childStreet);
            
            childNumber = (childData.street_code);
            numberArr.push(childNumber);

            childCity = (childData.city_name);
            cityArr.push(childCity);
            
            childPhone = (childData.tel);
            phoneArr.push(childPhone);
            
            childfullAddress = (childData.street_name + " " + childData.street_code + " " + childData.city_name);
            fullAddressArr.push(childfullAddress);
            
            });

            const addressLen = fullAddressArr.length;
            console.log(addressLen);

            var busNum="";

            if (addressLen%8 == 0) {
                 busNum = addressLen/8;
            } else {
                const busNumTMP = addressLen/8;
                busNum = Math.ceil(busNumTMP);
            }

            console.log("Number of Busses = "+ busNum);

            function sliceIntoChunks(fullAddressArr, chunkSize) {
                for (let j=0; j<busNum; j++) {
                    const res = [];
                    for (let i = 0; i < fullAddressArr.length; i += chunkSize) {
                        const chunk = fullAddressArr.slice(i, i + chunkSize);
                        res.push(chunk);
                    }
                    jumboAddressArr.push(res);
                    return jumboAddressArr;
                }
            }

            //console.log(sliceIntoChunks(fullAddressArr, 8));
            sliceIntoChunks(fullAddressArr, 8);
            //console.log(jumboAddressArr);

            var select = document.getElementById("bus_array");
            // fullnameArr - array with all worker names
            // employee name array to list function
            function addtoList() {
                for (var i = 0; i < busNum; i++) {
                    var optn = "מיניבוס מס" + " " + [i+1];
                    var el = document.createElement("option");
                    el.textContent = optn;
                    el.value = optn;
                    select.appendChild(el);
                }
            }
            addtoList();

        }, {
            onlyOnce: true
        });



export {    // Arrays for Database
    idArr,
    fullnameArr,
    nameArr,
    surnameArr,
    streetArr,
    numberArr,
    cityArr,
    phoneArr,
    fullAddressArr,
    jumboAddressArr
}