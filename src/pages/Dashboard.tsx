import React, { useState } from 'react';
import { useAuthContext  } from '../contexts/AuthContext';
import { useChannel, useConnectionStateListener } from 'ably/react';
import { SignOutButton } from '@clerk/clerk-react';

const Dashboard: React.FC = () => {
  const { currentUser } = useAuthContext();
  const [messages, setMessages] = useState<any[]>([]); // Definimos un array de mensajes, cada mensaje puede ser de cualquier tipo

  useConnectionStateListener('connected', () => {
    console.log('Connected to Ably!');
  });

  // Usamos el hook useChannel para suscribirnos a un canal de Ably
  const { channel } = useChannel('get-started', (message) => { // Aquí se suscribe al canal 'get-started'
    setMessages(previousMessages => [...previousMessages, message]);
  });

  const handlePublish = () => {
    // Publicar un mensaje en el canal 'first'
    channel.publish({ name: 'first', data: { body: 'Here is my first message!' } });
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {currentUser?.firstName}</p>
      <SignOutButton />
      <div>
        <button onClick={handlePublish}>
          Publish
        </button>
        {
          messages.map(message => {
            return <p key={message.id}>{message.data.body}</p>;
          })
        }
      </div>
    </div>
  );
};

export default Dashboard;
