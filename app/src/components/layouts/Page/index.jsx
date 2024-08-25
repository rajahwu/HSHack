import React from 'react';

/**
  * Page component displays current page content and navigation
  *
  * @returns {JSX.Element} The rendered Page component
  */
const Page = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  );
}

export default Page;