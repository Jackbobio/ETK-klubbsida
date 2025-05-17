import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function AnimatedLink({ to, color, children }) {
  return (
    <Link
      to={to}
      className={`text-${color} hover:cursor-pointer 
        relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-${color} after:transition-all after:duration-300 hover:after:w-full`}
    >
      {children}
    </Link>
  );
}

AnimatedLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
