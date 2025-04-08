import { observer } from "mobx-react-lite";
import { MainMenu } from "./components/MainMenu/MainMenu";
import { Router } from "./providers/Router/Router";
import { authStore } from "./stores/authStore/authStore";
import { PageTemplate } from "./ui/PageTemplate/PageTemplate";
import { useEffect } from "react";
import { Loader } from "./ui/Loader/Loader";

function App() {
  const { getAuth, isAuth, isLoading } = authStore;

  useEffect(() => {
    getAuth("USERNAME");
  }, [getAuth]);

  if (isLoading) return <Loader />;
  if (!isAuth) return <></>;

  return (
    <div className="App">
      <PageTemplate>
        <>
          <MainMenu />
          <Router />
        </>
      </PageTemplate>
    </div>
  );
}

export default observer(App);
