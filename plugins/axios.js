import axios from 'axios'

export default axios.create({
  baseURL: 'https://odayaka-db.firebaseio.com'
})
