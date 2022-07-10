import * as React from 'react';
import Button from '@mui/material/Button';

type Props = {
  title: string;
  // fixme: why eslint roar here?
  // eslint-disable-next-line no-unused-vars
  onChange: (files: FileList) => void;
};

export function FileInput({ onChange, title }: Props) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleCahngeFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget;

    if (files) {
      onChange(files);
    }
  };

  return (
    <>
      <Button color="inherit" onClick={() => fileInputRef.current?.click()}>
        {title}
      </Button>
      <input
        type="file"
        name="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleCahngeFileInput}
      />
    </>
  );
}
