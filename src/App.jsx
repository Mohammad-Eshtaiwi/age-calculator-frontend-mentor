import Form from "./components/Form";
import "./sass/main.scss";
import Content from "./components/Content/index";
import { FormProvider, useForm } from "react-hook-form";

function App() {
  const methods = useForm();
  return (
    <div className="container">
      <FormProvider {...methods}>
        <Form />
        <Content />
      </FormProvider>
    </div>
  );
}

export default App;
