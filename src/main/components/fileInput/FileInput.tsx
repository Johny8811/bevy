import * as React from 'react';
import Button from '@mui/material/Button';

export type OnChangeParams = Partial<{ files: FileList; file: File }>;

type Props = {
  title: string;
  onChange: (o: OnChangeParams) => void;
};

export function FileInput({ onChange, title }: Props) {
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
      <Button color="inherit" onClick={() => fileInputRef.current?.click()}>
        {title}
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
