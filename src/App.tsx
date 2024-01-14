import { RouterProvider } from 'react-router-dom';
import { Provider, positions } from 'react-alert';
import { ReactFlowProvider } from 'reactflow';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import AlertTemplate from 'react-alert-template-basic';
import createRouters from './routes';
import { Loader } from './components';

const options = {
  timeout: 5000,
  position: positions.TOP_RIGHT,
};

const queryClient = new QueryClient();

const App = () => {
  return (
    <Provider template={AlertTemplate} {...options}>
      <QueryClientProvider client={queryClient}>
        <ReactFlowProvider>
          <RouterProvider
            router={createRouters()}
            fallbackElement={<Loader />}
          />
        </ReactFlowProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
