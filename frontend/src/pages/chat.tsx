import { BarsArrowDownIcon, PencilSquareIcon } from "@heroicons/react/20/solid";
import { Input } from "../components/input";
import EmojiPicker from "emoji-picker-react";
import { Popover, PopoverContent, PopoverTrigger } from "../components/popover";
import { FaceSmileIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import background from "../assets/background.jpg";

export function Chat() {
  const [message, setMessage] = useState<string>("");

  return (
    <main className="grid grid-cols-[1fr,3fr] grid-rows-[1fr,8fr,1fr] min-h-screen border">
      <div className="row-span-3 p-5 border">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Messagerie</h1>

          <div className="flex gap-5">
            <PencilSquareIcon className="h-6 w-6 cursor-pointer" />
            <BarsArrowDownIcon className="h-6 w-6 cursor-pointer" />
          </div>
        </div>

        <div className="flex gap-3 items-center mt-8">
          <img
            src="https://i.pravatar.cc/300"
            width="50"
            height="50"
            className="rounded-full"
          />
          <div className="font-semibold">Paul-Henry Ngounou</div>
        </div>
      </div>

      <div className="flex items-center gap-4 px-10 border-b">
        <img
          src="https://i.pravatar.cc/300"
          width="50"
          height="50"
          className="rounded-full"
        />
        <h1 className="text-3xl font-semibold">Chat room</h1>
      </div>

      <div
        className="bg-slate-100 py-5 px-10"
        // style={{
        //   backgroundImage: `url(${background})`,
        //   backgroundRepeat: "repeat",
        //   backgroundSize: "40%",
        //   opacity: 0.3,
        // }}
      >
        <div className="border border-blue-300 w-max max-w-96 p-3 rounded-md bg-blue-200">
          Salut à tous efehfiuefh ieufhiueehf
        </div>

        <div className="ml-auto border bg-white w-max max-w-96 p-3 rounded-md">
          Salut à tous
        </div>
      </div>

      <div className="flex items-center justify-between px-10 gap-4">
        <Popover>
          <PopoverTrigger>
            <button>
              <FaceSmileIcon className="h-6 w-6" />
            </button>
          </PopoverTrigger>
          <PopoverContent>
            <EmojiPicker
              onEmojiClick={(emoji) => {
                setMessage(message + emoji.emoji);
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

        <button>
          <PaperAirplaneIcon className="h-6 w-6" />
        </button>
      </div>
    </main>
  );
}
