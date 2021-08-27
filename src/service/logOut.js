import firebase from '../config/firebase-config'

const logOut = function() {
    firebase.auth().signOut().then(() =>{
        console.log('signed out user')
        return true;
    }).catch(() => {
        return false
    })
}

export default logOut