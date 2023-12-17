import { forwardRef } from 'react';
import Editor from '@monaco-editor/react';

type Props = {
  onChange?: (_value: string | undefined) => void;
};

export const CodeEditor = forwardRef<HTMLDivElement | null, Props>(
  ({ onChange }, ref) => {
    const handleEditorDidMount = (editor: any) => {
      console.log({ editor, ref });
      // if (ref && ref.current) {
      //   ref.current = editor;
      // }
    };

    return (
      <Editor
        height={'80vh'}
        width={'100%'}
        defaultLanguage="html"
        defaultValue="// Write your code here"
        theme="vs-dark"
        options={{
          // inlineSuggest: true,
          // fontSize: '14px',
          // autoClosingBrackets: true,
          formatOnType: true,
          minimap: { enabled: false },
        }}
        onMount={handleEditorDidMount}
        onChange={onChange}
      />
    );
  },
);
