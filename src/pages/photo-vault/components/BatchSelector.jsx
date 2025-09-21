import React from 'react';
import Select from '../../../components/ui/Select';

const BatchSelector = ({ selectedBatch, onBatchChange, batches }) => {
  const batchOptions = batches?.map(batch => ({
    value: batch?.year,
    label: `Class of ${batch?.year}`,
    description: `${batch?.photoCount} photos`
  }));

  return (
    <div className="w-full max-w-xs">
      <Select
        label="Select Batch"
        placeholder="Choose a batch year"
        options={batchOptions}
        value={selectedBatch}
        onChange={onBatchChange}
        searchable
        className="mb-0"
      />
    </div>
  );
};

export default BatchSelector;