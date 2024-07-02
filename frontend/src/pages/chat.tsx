import { ArrowUturnRightIcon } from "@heroicons/react/20/solid";
import { Input } from "../components/input";
import EmojiPicker from "emoji-picker-react";
import { Popover, PopoverContent, PopoverTrigger } from "../components/popover";
import { FaceSmileIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { MessageBubble } from "../components/message-bubble";
import { axios } from "../lib/axios";
import { Transmit } from "@adonisjs/transmit-client";
import { User } from "../types/user";
import { io } from "socket.io-client";
import { Avatar, AvatarFallback, AvatarImage } from "../components/avatar";
import { Message, SocketMessage } from "../types/message";

export const transmit = new Transmit({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
});

export function Chat() {
  const [message, setMessage] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const { user: currentUser, setUser } = useAuth();

  const logout = async () => {
    await axios.delete("/logout", { withCredentials: true });
    setUser(null);
  };

  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_BASE_URL!);

    axios
      .get("/online-users")
      .then((response) => setOnlineUsers(response.data));

    socket.on(currentUser?.username!, (data) => {
      const socketMessage = data as SocketMessage;
      setChatMessages((previousMessages) => [
        ...previousMessages,
        socketMessage.message,
      ]);
    });

    socket.on("login", (data) => {
      const user = data.user as User;
      console.log(data);
      setOnlineUsers((previousUsers) => [...previousUsers, user]);
    });

    socket.on("logout", (data) => {
      console.log(data);
      setOnlineUsers((previousUsers) =>
        previousUsers.filter((user) => user.id !== data.user_id)
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(message);
    setMessage("");

    await axios.post(
      "/messages",
      { content: message },
      { withCredentials: true }
    );
  };

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <main className="grid grid-cols-[1fr,3fr] grid-rows-[1fr,8fr,1fr] min-h-screen border">
      <div className="row-span-3 p-5 border">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Online</h1>

          <div className="flex gap-5">
            <button
              title="Déconnexion"
              className="hover:bg-slate-100 p-2 rounded-md"
              onClick={logout}
            >
              <ArrowUturnRightIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        {onlineUsers.map((user) => (
          <div className="flex gap-3 items-center mt-8">
            <Avatar>
              <AvatarImage src="#" />
              <AvatarFallback>
                {user.username?.charAt(0)?.toUpperCase() || ""}
              </AvatarFallback>
            </Avatar>
            <div className="font-semibold">
              {user.id === currentUser.id ? "You" : user.username}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 px-10 border-b">
        <Avatar>
          <AvatarImage src="https://picsum.photos/id/237/200/300" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h1 className="text-3xl font-semibold">Chat room</h1>
      </div>

      <div className="bg-slate-100 py-5 px-10 flex flex-col gap-5">
        {chatMessages.map((message, index) => (
          <MessageBubble
            key={index}
            isSender={message.sender.id === currentUser?.id}
            message={message}
          />
        ))}
      </div>

      <form
        className="flex items-center justify-between px-10 gap-4"
        onSubmit={handleSubmit}
      >
        <Popover>
          <PopoverTrigger>
            <button>
              <FaceSmileIcon className="h-6 w-6" />
            </button>
          </PopoverTrigger>
          <PopoverContent>
            <EmojiPicker
              onEmojiClick={(emoji) => {
                setMessage((previousMessage) => previousMessage + emoji.emoji);
              }}
            />
          </PopoverContent>
        </Popover>

        <Input
          type="text"
          placeholder="Taper un message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full"
        />

        <button type="submit">
          <PaperAirplaneIcon className="h-6 w-6" />
        </button>
      </form>
    </main>
  );
}
