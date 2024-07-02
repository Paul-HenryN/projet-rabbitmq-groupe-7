import { cn } from "../lib/utils";
import { Message } from "../types/message";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

export function MessageBubble({
  message,
  isSender = false,
}: {
  message: Message;
  isSender?: boolean;
}) {
  return (
    <div className={cn("flex gap-3", isSender && "ml-auto")}>
      <Avatar>
        <AvatarImage src="#" />
        <AvatarFallback>
          {message.sender.username?.charAt(0)?.toUpperCase() || ""}
        </AvatarFallback>
      </Avatar>
      <div
        className={cn(
          "border w-max max-w-96 px-3 py-1 rounded-md bg-white",
          isSender && "border-blue-300 bg-blue-200"
        )}
      >
        <p className="text-sm font-bold mb-2">
          {isSender ? "You" : message.sender.username}
        </p>

        <div>{message.content}</div>
      </div>
    </div>
  );
}
