const leads = [
    {
      "id": "lead1",
      "name": "John Doe",
      "contact": "john.doe@example.com",
      "status": "Pending",
      "phoneNumber": "+1-555-1234"
    },
    {
      "id": "lead2",
      "name": "Jane Smith",
      "contact": "jane.smith@example.com",
      "status": "Pending",
      "phoneNumber": "+1-555-5678"
    },
    {
      "id": "lead3",
      "name": "Alice Johnson",
      "contact": "alice.johnson@example.com",
      "status": "Contacted",
      "phoneNumber": "+1-555-8765"
    },
    {
      "id": "lead4",
      "name": "Bob Brown",
      "contact": "bob.brown@example.com",
      "status": "Contacted",
      "phoneNumber": "+1-555-4321"
    }
  ];
  
  const calls = [
    {
      "id": "call1",
      "date": "2024-08-24T10:00:00Z",
      "duration": 15,
      "recordingUrl": "https://example.com/recordings/call1.mp3",
      "leadId": "lead1"
    },
    {
      "id": "call2",
      "date": "2024-08-24T11:30:00Z",
      "duration": 25,
      "recordingUrl": "https://example.com/recordings/call2.mp3",
      "leadId": "lead2"
    },
    {
      "id": "call3",
      "date": "2024-08-23T14:45:00Z",
      "duration": 10,
      "recordingUrl": "https://example.com/recordings/call3.mp3",
      "leadId": "lead3"
    },
    {
      "id": "call4",
      "date": "2024-08-23T16:00:00Z",
      "duration": 20,
      "recordingUrl": null,
      "leadId": "lead4"
    },
  ];
  
  // Mock fetch function for leads
  const fetchLeads = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(leads);
      }, 1000); // Simulates a 1-second network delay
    });
  };
  
  // Mock fetch function for calls
  const fetchCalls = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(calls);
      }, 1000); // Simulates a 1-second network delay
    });
  };
  
  export { fetchCalls, fetchLeads };
  