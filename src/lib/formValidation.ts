export interface FormData {
	fullName: string;
	email: string;
	class: string;
	section: string;
	school: string;
	city: string;
	schoolAddress: string;
	category: string;
	remarks: string;
	studentPhoto: File | null;
	supportingDocuments: string;
}

export interface FieldErrors {
	[key: string]: string;
}

export function validateForm(form: HTMLFormElement): {
	isValid: boolean;
	errors: FieldErrors;
} {
	const errors: FieldErrors = {};
	const formData = new FormData(form);

	// Check required fields
	const requiredFields = [
		{ name: 'fullName', label: 'Full Name' },
		{ name: 'email', label: 'Email ID' },
		{ name: 'class', label: 'Class' },
		{ name: 'section', label: 'Section' },
		{ name: 'school', label: 'School' },
		{ name: 'city', label: 'City' },
		{ name: 'schoolAddress', label: 'School Address' },
		{ name: 'category', label: 'Category' },
		{ name: 'remarks', label: 'Remarks' },
		{ name: 'studentPhoto', label: 'Student Photograph' },
		{ name: 'supportingDocuments', label: 'Supporting Documents' }
	];

	for (const field of requiredFields) {
		const value = formData.get(field.name);
		if (
			!value ||
			(typeof value === 'string' && !value.trim()) ||
			(value instanceof File && value.size === 0)
		) {
			errors[field.name] = `${field.label} is required`;
		}
	}

	// Validate email format
	const email = formData.get('email');
	if (email && typeof email === 'string') {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			errors.email = 'Please enter a valid email address';
		}
	}

	// Validate remarks word count (300 words max)
	const remarks = formData.get('remarks');
	if (remarks && typeof remarks === 'string' && remarks.trim()) {
		const wordCount = remarks
			.trim()
			.split(/\s+/)
			.filter((word) => word.length > 0).length;
		if (wordCount > 300) {
			errors.remarks = 'Remarks must not exceed 300 words';
		}
	}

	// Check HTML5 validation
	if (!form.checkValidity()) {
		const invalidFields = form.querySelectorAll(':invalid');
		invalidFields.forEach((field) => {
			if (
				field instanceof HTMLInputElement ||
				field instanceof HTMLSelectElement ||
				field instanceof HTMLTextAreaElement
			) {
				if (field.validity.valueMissing && !errors[field.name]) {
					const labelElement = form.querySelector(`label[for="${field.id}"]`);
					const labelText =
						labelElement?.textContent?.replace(/\s*\*\s*$/, '').trim() || field.name;
					errors[field.name] = `${labelText} is required`;
				}
				if (field.validity.typeMismatch && field.type === 'email' && !errors.email) {
					errors.email = 'Please enter a valid email address';
				}
			}
		});
	}

	return {
		isValid: Object.keys(errors).length === 0,
		errors
	};
}
