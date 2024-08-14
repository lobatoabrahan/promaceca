import Ably from 'ably';

const API_KEY = '4WZdPQ.paOhIA:P-bcJ53iaZzOgU2Vs6KD_Eg1z7kfxh2CmX3mXtfcgUY'; // Reemplaza 'tu-api-key' con tu clave de Ably

const ably = new Ably.Realtime({ key: API_KEY });

export const subscribeToChannel = (channelName, callback) => {
  const channel = ably.channels.get(channelName);
  channel.subscribe('message', message => {
    callback(message.data);
  });
};

export const publishMessage = (channelName, message) => {
  const channel = ably.channels.get(channelName);
  channel.publish('message', message);
};
