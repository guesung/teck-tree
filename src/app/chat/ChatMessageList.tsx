"use client";

import ChatMessage from "@components/chatMessage";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { chatMessageListState, isTypingState, userInfoState } from "store";
import { chatMessageType, drugType, userInfoType } from "types/chat";
import SelectMessage from "./SelectMessage";

interface PropsType {
  userInfoProps: userInfoType;
  drugDatabase: drugType[];
}

export default function ChatMessageList({
  userInfoProps,
  drugDatabase,
}: PropsType) {
  const [chatMessageList, setChatMessageList] =
    useRecoilState(chatMessageListState);
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [isTyping, setIsTyping] = useRecoilState(isTypingState);

  useEffect(() => {
    setUserInfo(userInfoProps);
  }, [setUserInfo, userInfoProps]);
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessageList, userInfo, isTyping]);

  return (
    <article className="max-w-[28.125rem] ">
      {chatMessageList.map((chatMessage: chatMessageType, index: number) => {
        if (index === 0)
          return (
            <div key={chatMessage.id} className="relative">
              <Image
                alt="alda"
                src="/icons/alda.svg"
                width={100}
                height={100}
                className="absolute left-[5rem] bottom-[2.7rem] -z-1"
              />
              <div className="mt-20 relative">
                <ChatMessage
                  message={chatMessage.message}
                  isMine={chatMessage.isMine}
                />
              </div>
            </div>
          );
        if (
          chatMessage.isMine === false &&
          index === chatMessageList.length - 1 &&
          index > -1
        )
          return (
            <div key={chatMessage.id}>
              <ChatMessage
                message={chatMessage.message}
                isMine={chatMessage.isMine}
                key={chatMessage.id}
              />
              <SelectMessage drugDatabase={drugDatabase} />
            </div>
          );
        return (
          <ChatMessage
            message={chatMessage.message}
            isMine={chatMessage.isMine}
            key={chatMessage.id}
          />
        );
      })}
      <div ref={messageEndRef}></div>
    </article>
  );
}
