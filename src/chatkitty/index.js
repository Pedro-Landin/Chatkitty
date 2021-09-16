import ChatKitty from "chatkitty";

export const kitty = ChatKitty.getInstance(
  "010ac96c-5640-41cb-b34c-f7d602b397e4"
);

//colocando um nome para os chats privados
export function getChannelDisplayName(channel) {
  if (channel.type === 'DIRECT') {
    return channel.members.map((member) => member.displayName).join(', ');
  } else {
    return channel.name;
  }
}
