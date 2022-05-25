import React, { useState } from 'react';
import '../App.css';
import Login from './Login';
import useLocalStorage from '../Hooks/useLocalStorage';
import Dashboard from './Dashboard';
import { ContactsContextProvider } from '../Context/ContactsContextProvider';
import { ConversationsContextProvider } from '../Context/ConversationsContextProvider';
import { SocketProvider } from '../Context/SocketProvider';

const App = () => {
	const [id, setId] = useLocalStorage('id');

	const dashboard = (
		<SocketProvider id={id}>
			<ContactsContextProvider>
				<ConversationsContextProvider id={id}>
					<Dashboard id={id} />
				</ConversationsContextProvider>
			</ContactsContextProvider>
		</SocketProvider>
	)

	return (
		<>
			{id ? dashboard : <Login onIdSubmit={setId} />}
			
		</>
	);
}

export default App;