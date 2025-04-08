import { Provider } from '#/organisms/Provider';
import { RouterProvider } from 'react-router-dom';
import { router } from './routers/main';

function App() {
  return (
    <>
      <Provider>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
