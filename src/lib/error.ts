class FormSubmissionError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'FormSubmissionError';
	}
}

export default FormSubmissionError;
