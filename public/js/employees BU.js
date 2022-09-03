     // Import the functions you need from the SDKs you need
      import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
      import { getDatabase, get, ref, set, onValue, update, child } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js';

      // TODO: Add SDKs for Firebase products that you want to use
      // https://firebase.google.com/docs/web/setup#available-libraries

       // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
        const database= getDatabase(app);


        const dbRef = ref(database);
        const test = document.getElementById('result');
        //test.innerText = dbRef.getDatabase;

        const names = ref(database, 'employees/' + worker_id);
        
        onValue(names, (snapshot) => {
             const data = snapshot.val();
             alert(data);
             console.log(data);
             test.innerText = data;
        });
