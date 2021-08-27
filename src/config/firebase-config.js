import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDGIECZIlGS6BiYZuDx2htNMMzHzDYyxMU",
    authDomain: "color-app-9eae4.firebaseapp.com",
    databaseURL: "https://color-app-9eae4-default-rtdb.firebaseio.com",
    projectId: "color-app-9eae4",
    storageBucket: "color-app-9eae4.appspot.com",
    messagingSenderId: "536701760557",
    appId: "1:536701760557:web:f6205ef6a6deee246074a4",
    measurementId: "G-Z6C5XQJ54D"
}

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase