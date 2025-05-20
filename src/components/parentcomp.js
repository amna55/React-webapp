import React, { useState } from 'react';
import DataOptions from './dataoptions';
import Button3 from './Button3';

function ParentComponent() {
  const [actionStatus, setActionStatus] = useState(''); // 'Submit Completed' or 'Download Completed'

  return (
    <div>
      <DataOptions setActionStatus={setActionStatus} />
      <Button3 actionStatus={actionStatus} />
    </div>
  );
}

export default ParentComponent;
