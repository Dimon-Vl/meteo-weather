import { createRoot } from 'react-dom/client'
import { CommonProvider } from './context/CommonProvider.jsx'
import App from './App.jsx'
import './index.scss'

createRoot(document.getElementById('root')).render(
    <CommonProvider>
        <App />
    </CommonProvider>
)
