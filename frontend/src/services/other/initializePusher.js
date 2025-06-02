import Pusher from "pusher-js";

const initializePusher = () => {
  const token = localStorage.getItem("token");
  const pusher = new Pusher("xs5n6ysk7wwrglkxyrle", {
    wsHost: "reverb.ayoubbezai.site",
    wsPort: 443,
    forceTLS: false,
    enabledTransports: ["ws", "wss"],
    authEndpoint: "https://api.ayoubbezai.site/api/broadcasting/auth",
    cluster: "",
    auth: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  return pusher;
};

export default initializePusher;
