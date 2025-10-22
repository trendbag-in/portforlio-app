import React from 'react';
import './Card.css';

const Card = ({ 
  children, 
  variant = 'default', 
  className = '',
  hover = true,
  ...props 
}) => {
  const cardClasses = `card card-${variant} ${hover ? 'card-hover' : ''} ${className}`.trim();
  
  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

export default Card;
