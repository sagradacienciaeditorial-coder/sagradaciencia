import React, { useEffect } from 'react';

const InstagramFeed = () => {
  useEffect(() => {
    // Asegurar que el script de Elfsight se cargue correctamente
    if (window.ElfSight) {
      window.ElfSight.init();
    }
  }, []);

  return (
    <div className="elfsight-app-3a5aa082-ff8a-4d49-979d-889eff12b939" data-elfsight-app-lazy></div>
  );
};

export default InstagramFeed;