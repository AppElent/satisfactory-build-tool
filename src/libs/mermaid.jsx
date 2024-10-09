import mermaid from 'mermaid';
import { nanoid } from 'nanoid';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

mermaid.initialize({
  startOnLoad: true,
  theme: 'default',
  securityLevel: 'loose',
  fontFamily: 'monospace',
});

const Mermaid = ({ chart }) => {
  const id = nanoid();
  useEffect(() => {
    const element = document.getElementById(id);
    if (element.hasAttribute('data-processed')) element.removeAttribute('data-processed');
    mermaid.contentLoaded();
  }, [chart]);

  return (
    <pre
      id={id}
      className="mermaid"
    >
      {chart}
    </pre>
  );
};

Mermaid.propTypes = {
  chart: PropTypes.any,
};

export default Mermaid;
