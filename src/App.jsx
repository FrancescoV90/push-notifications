import { useState } from "react";
import "./App.css";
import { getToken } from "firebase/messaging";
import { messaging } from "./firebase/firebaseConfig";

function App() {
  const { VITE_APP_VAPID_KEY } = import.meta.env;
  const [permissionState, setPermissionState] = useState(
    Notification.permission
  );
  const [pushToken, setPushToken] = useState(null);

  const requestPermission = async () => {
    const permission = await Notification.requestPermission();
    setPermissionState(permission);

    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: VITE_APP_VAPID_KEY,
      });
      setPushToken(token);
    } else if (permission === "denied") {
      alert("You denied for the notification, reset permission");
    }
  };

  return (
    <>
      <div className="card">
        {permissionState === "granted" && (
          <div>Notification permission granted</div>
        )}
        {pushToken && <div className="token">{pushToken}</div>}
        {permissionState !== "granted" && (
          <button onClick={() => requestPermission()}>
            Ask for push notification
          </button>
        )}
      </div>
    </>
  );
}

export default App;
