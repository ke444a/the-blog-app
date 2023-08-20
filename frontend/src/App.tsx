import { MainLayout } from "./components/Layout/MainLayout";
import { AppRoutes } from "./routes";

const App = () => {
    return (
        <MainLayout>
            <AppRoutes />
        </MainLayout>
    );
};

export default App;
