import React, { ReactNode } from 'react';
import Button from '@mui/material/Button';

export type OnChangeParams = Partial<{ files: FileList; file: File }>;

type Props = {
  onChange: (o: OnChangeParams) => void;
  children: ReactNode;
};

export function FileInput({ onChange, children }: Props) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleChangeFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget;

    if (!files) {
      return;
    }

    if (files.length > 1) {
      onChange({ files });
    } else {
      onChange({ file: files[0] });
    }
  };

  return (
    <>
      <Button variant="contained" onClick={() => fileInputRef.current?.click()}>
        {children}
      </Button>
      <input
        type="file"
        name="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleChangeFileInput}
        value=""
      />
    </>
  );
}
