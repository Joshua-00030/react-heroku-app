import { createRoot } from 'react-dom/client'
import App from './App'
import axios from 'axios'

axios.get('http://localhost:3001/notes').then(response => {
  const notes = response.data
  const container = document.getElementById('root');
  const root = createRoot(container);
  root.render(
    <App notes={notes}/>
  )
  
})