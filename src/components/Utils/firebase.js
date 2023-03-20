import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  projectId: 'fademetuserimg',
  appId: '1:553490896861:web:9865c10cec628f18574834',
  storageBucket: 'fademetuserimg.appspot.com',
  locationId: 'us-central',
  apiKey: 'AIzaSyAA_BX-JxnUmBguEGnfkppclfgsdZk_660',
  authDomain: 'fademetuserimg.firebaseapp.com',
  messagingSenderId: '553490896861'
}

const firebaseApp = initializeApp(firebaseConfig)
export const storage = getStorage(firebaseApp)
