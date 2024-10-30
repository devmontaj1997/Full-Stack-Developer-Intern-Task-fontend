import ExerciseAssignmentUI from "./components/ExerciseAssignmentUI";
import { ToastContainer } from "react-toastify";


const App = () => {
  return (
<>
<ToastContainer
    position="top-center"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
  />

    <ExerciseAssignmentUI/>

</>

  );
};

export default App;
