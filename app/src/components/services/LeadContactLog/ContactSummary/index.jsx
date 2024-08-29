// src/components/SalesContactReview.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ContactSummary = () => {
  const { contactId } = useParams();
  const { salesContact, correspondence } = useLoaderData();

  return (
    <div className="sales-contact-review">
      <h2>Review Sales Contact</h2>
      {salesContact && (
        <>
          <h3>Contact Details</h3>
          <p><strong>Date:</strong> {new Date(salesContact.date.seconds * 1000).toLocaleString()}</p>
          <p><strong>Type:</strong> {salesContact.type}</p>
          <p><strong>Duration:</strong> {salesContact.duration} seconds</p>
          <p><strong>Status:</strong> {salesContact.status}</p>
          
          <h3>Participants</h3>
          <p><strong>Caller:</strong> {salesContact.participants.caller.username}</p>
          <p><strong>Customer:</strong> {salesContact.participants.customer.name}</p>
        </>
      )}

      {correspondence && (
        <>
          <h3>Correspondence Details</h3>
          <p><strong>Score:</strong> {correspondence.content.score}</p>
          <p><strong>Outcome:</strong> {correspondence.content.outcome}</p>
          <h4>Conversation</h4>
          <ul>
            {correspondence.content.chain.map((line, index) => (
              <li key={index}>{line}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default ContactSummary;
