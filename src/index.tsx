/** @format */
import ReactDom from 'react-dom'
import App from './App'
import {Provider} from 'react-redux'
import store from './store'
import './assets/styles/index.scss'
ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
)
