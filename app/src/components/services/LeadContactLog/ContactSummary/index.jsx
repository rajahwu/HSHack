import React from 'react';
import { useParams, useLoaderData } from 'react-router-dom';

const ContactSummary = () => {
  const { contactId } = useParams();
  const { salesContact, correspondence } = useLoaderData();

  return (
    <div className="sales-contact-review">
      <h2>Review Sales Contact</h2>
      {salesContact && (
        <>
          <h3>Contact Details</h3>
          <p><strong>Date:</strong> {salesContact.date ? new Date(salesContact.date.seconds * 1000).toLocaleString() : 'N/A'}</p>
          <p><strong>Type:</strong> {salesContact.type || 'N/A'}</p>
          <p><strong>Duration:</strong> {salesContact.duration || 'N/A'} seconds</p>
          <p><strong>Status:</strong> {salesContact.status || 'N/A'}</p>
          
          <h3>Participants</h3>
          <p><strong>Caller:</strong> {salesContact.participants?.caller || 'N/A'}</p>
          <p><strong>Customer:</strong> {salesContact.participants?.customer || 'N/A'}</p>
        </>
      )}

      {correspondence && correspondence.content && (
        <>
          <h3>Correspondence Details</h3>
          <p><strong>Score:</strong> {correspondence.content.score || 'N/A'}</p>
          <p><strong>Outcome:</strong> {correspondence.content.outcome || 'N/A'}</p>
          <h4>Conversation</h4>
          <ul>
            {correspondence.content.script?.caller?.map((line, index) => (
              <li key={`caller-${index}`}><strong>Caller:</strong> {line}</li>
            )) || 'No caller lines available'}
            {correspondence.content.script?.customer?.map((line, index) => (
              <li key={`customer-${index}`}><strong>Customer:</strong> {line}</li>
            )) || 'No customer lines available'}
          </ul>
        </>
      )}
    </div>
  );
};

export default ContactSummary;
