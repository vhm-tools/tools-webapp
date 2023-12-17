import { RouterProvider } from 'react-router-dom';
import { Provider, positions } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { ReactFlowProvider } from 'reactflow';
import createRouters from './routes';

const options = {
  timeout: 5000,
  position: positions.TOP_RIGHT,
};

const App = () => {
  return (
    <Provider template={AlertTemplate} {...options}>
      <ReactFlowProvider>
        <RouterProvider
          router={createRouters()}
          fallbackElement={<p>Loading...</p>}
        />
      </ReactFlowProvider>
    </Provider>
  );
};

export default App;
