import { useRef } from 'react';
import { CodeEditor } from '@/components';
import { sendMail } from '@/apis';

export const MailBuilder = () => {
	const divEl = useRef<HTMLDivElement | null>(null);

	const handleEditorChange = (value: string | undefined) => {
		console.log({ value });
	};

	const handleSubmit = async () => {
		try {
			const resp = await sendMail({
				provider: 'SEND_GRID',
				data: {
					to: 'minhvh@codelight.co',
					subject: 'This is subject',
					text: 'This is text',
					html: divEl.current?.getValue(),
				},
			});
			console.log({ resp });
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="w-full">
			<h1>Mail Builder</h1>
			<button className="btn btn-primary mb-2" onClick={handleSubmit}>
				Trigger Send
			</button>
			<CodeEditor onChange={handleEditorChange} ref={divEl} />
		</div>
	);
};
