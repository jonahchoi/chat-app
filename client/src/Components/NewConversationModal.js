import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useContacts } from '../Context/ContactsContextProvider';
import { useConversations } from '../Context/ConversationsContextProvider';

export default function NewConversationModal({ closeModal }) {
    const [selectedContactIds, setSelectedContactIds] = useState([]);

    const { contacts } = useContacts();
    
    const { createConversation } = useConversations();

    function handleSubmit(e) {
        e.preventDefault();

        createConversation(selectedContactIds)
        closeModal();
    }

    function handleCheckboxChange(contactId) {
        setSelectedContactIds(prevSelectedIds => {
            if (prevSelectedIds.includes(contactId)) {
                return prevSelectedIds.filter(prevId => {
                    return prevId !== contactId;
                })
            }
            else {
                return [...prevSelectedIds, contactId]
            }
        })
    }

    return (
        <>
            <Modal.Header closeButton>Create Conversation</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {contacts.map(contact => (
                        <Form.Group controlId={contact.id} key={contact.id} >
                            <Form.Check
                                type="checkbox"
                                value={selectedContactIds.includes(contact.id)}
                                label={contact.name}
                                onChange={()=> handleCheckboxChange(contact.id)}
                            />
                        </Form.Group>
                    ))}
                    <Button type="submit" className="mt-2">Create</Button>
                </Form>
            </Modal.Body>
        </>
    );
}