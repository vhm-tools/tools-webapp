import { forwardRef } from 'react';
import Editor from '@monaco-editor/react';

type Props = {
	onChange?: (value: string | undefined) => void;
};

export const CodeEditor = forwardRef<HTMLDivElement | null, Props>(({ onChange }, ref) => {
	const handleEditorDidMount = (editor: any) => {
    if (ref && !ref.current) {
			ref.current = editor;
		}
	};

	return (
		<Editor
			height={'80vh'}
			width={'100%'}
			defaultLanguage="html"
			defaultValue="// Write your code here"
			theme="vs-dark"
			options={{
				inlineSuggest: true,
				fontSize: '14px',
				formatOnType: true,
				autoClosingBrackets: true,
				minimap: { enabled: false },
			}}
			onMount={handleEditorDidMount}
			onChange={onChange}
		/>
	);
});
