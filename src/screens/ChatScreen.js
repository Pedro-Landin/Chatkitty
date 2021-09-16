import React, { useContext, useEffect, useState } from "react";
import { Avatar, Bubble, GiftedChat } from "react-native-gifted-chat";

import { kitty } from "../chatkitty";
import Loading from "../components/Loading";
import { AuthContext } from "../navigation/AuthProvider";

export default function ChatScreen({ route, navigation }) {
  //Recuperando usuario atual para trocar mensagem
  const { user } = useContext(AuthContext);
  //Recuperando o canal
  const { channel } = route.params;

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadEarlier, setLoadEarlier] = useState(false);
  const [isLoadingEarlier, setIsLoadingEarlier] = useState(false);
  const [messagePaginator, setMessagePaginator] = useState(null);
  const [typing, setTyping] = useState(null)
  //Inicialmente uma matriz vazia, pegando as mensagem do chat e excluindo-as

  useEffect(() => {
    const startChatSessionResult = kitty.startChatSession({
      channel: channel,
      onReceivedMessage: (message) => {
        setMessages((currentMessages) =>
            GiftedChat.append(currentMessages, [mapMessage(message)])
        );
      },
      //Faz parte da função de avisar que esta digitando
      onTypingStarted: (typingUser) => { 
        if (typingUser.id !== user.id) {
          setTyping(typingUser);
        }
      },
       //Faz parte da função de avisar que esta digitando
      onTypingStopped: (typingUser) => { 
        if (typingUser.id !== user.id) {
          setTyping(null);
        }
      },
    });

    kitty
      .getMessages({
        channel: channel,
      })
      .then((result) => {
        setMessages(result.paginator.items.map(mapMessage));

        setMessagePaginator(result.paginator);
        setLoadEarlier(result.paginator.hasNextPage);

        setLoading(false);
      });

    return startChatSessionResult.session.end;
  }, [user, channel]);

  //Função para ajudar a enviar mensagem
  async function handleSend(pendingMessages) {
    await kitty.sendMessage({
      channel: channel,
      body: pendingMessages[0].text,
    });
  }

  function renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: "#d3d3d3",
          },
        }}
      />
    );
  }

  //Chamando uma conversa privada
  function renderAvatar(props) {
    return (
      <Avatar
        {...props}
        onPressAvatar={(clickedUser) => {
          kitty
            .createChannel({
              type: "DIRECT",
              members: [{ id: clickedUser._id }],
            })
            .then((result) => {
              navigation.navigate("Chat", { channel: result.channel });
            });
        }}
      />
    );
  }

  if (loading) {
    return <Loading />;
  }

  //Método de ajudo de digitação, para informar o usuario que ele esta digitando
  function handleInputTextChanged(text) {
    kitty.sendKeystrokes({
      channel: channel,
      keys: text,
    });
  }
  function renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: "#d3d3d3",
          },
        }}
      />
    );
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={handleSend}
      user={mapUser(user)}
      loadEarlier={loadEarlier}
      isLoadingEarlier={isLoadingEarlier}
      onInputTextChanged={handleInputTextChanged}
      isTyping={typing != null}
      renderBubble={renderBubble}
      renderAvatar={renderAvatar}
    />
  );
}

//Mapeando as mensagem recebidos
function mapMessage(message) {
  return {
    _id: message.id,
    text: message.body,
    createdAt: new Date(message.createdTime),
    user: mapUser(message.user),
  };
}

//Mapeando os usuarios
function mapUser(user) {
  return {
    _id: user.id,
    name: user.displayName,
    avatar: user.displayPictureUrl,
  };
}
