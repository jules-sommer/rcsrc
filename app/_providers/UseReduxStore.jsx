import store from '../_store/store';
import { Provider } from 'react-redux';

const UseReduxStore = ({ children }) => {

    return (

        <Provider store={store}>
            {children}
        </Provider>

    )

}

export default UseReduxStore;