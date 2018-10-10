import React from 'react';

const NoMatch = () => {
  return (
    <section className="section">
      <div className="container">
        <h1>That Page Doesn't Exist</h1>
        <div className="section__body">
            <p>You've hit our 404 page. <a href="/">Go home</a>.</p>
        </div>
      </div>
    </section>
  );
};

export default NoMatch;
