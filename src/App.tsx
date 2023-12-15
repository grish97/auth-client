import { ConfigProvider } from "antd";
import Routing from "router/Routing";

export default function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          // colorPrimary: '#00b96b',
          // borderRadius: 2,
        },
      }}
    >
      <Routing />
    </ConfigProvider>
  );
}
