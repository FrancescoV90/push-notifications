import "./App.css";
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "./firebase/firebaseConfig";
import { toast, ToastContainer } from "react-toastify";
import Message from "./components/Message";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { VITE_APP_VAPID_KEY } = import.meta.env;

  const requestPermission = async () => {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      console.log("Notification permission granted. Requesting for token.");
      const token = await messaging.getToken({
        vapidKey: VITE_APP_VAPID_KEY,
      });
      console.log("Token generated : ", token);
    } else if (permission === "denied") {
      console.log("Notification permission denied");
      alert("You denied for the notification");
    }
  };

  return (
    <>
      <div className="card">
        <button onClick={() => requestPermission()}>
          Ask for push notification
        </button>
      </div>
    </>
  );
}

export default App;
