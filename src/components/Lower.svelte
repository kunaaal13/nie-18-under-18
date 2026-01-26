<script lang="ts">
	import Star from "./svgs/star.svelte";
	import FormInput from "./FormInput.svelte";
	import FormTextarea from "./FormTextarea.svelte";
	import FormSelect from "./FormSelect.svelte";
	import FileUpload from "./FileUpload.svelte";
	import SubmitButton from "./SubmitButton.svelte";
	import Toast from "./Toast.svelte";
	import { validateForm, type FormData, type FieldErrors } from "$lib/formValidation";

	// Google Scripts URL - Replace with your actual Google Apps Script web app URL
	const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzvFI3ZHnZLW37cDAqXqrMV0pn5JOd0IgqSWXhxLQSdIZ3ohYrW_QcEyr2r6wQ0YwRe/exec';

	let formData = $state<FormData>({
		fullName: "",
		email: "",
		class: "",
		section: "",
		school: "",
		city: "",
		schoolAddress: "",
		category: "",
		studentPhoto: null,
		supportingDocuments: ""
	});

	let isSubmitting = $state(false);
	let isSuccess = $state(false);
	let formElement: HTMLFormElement | undefined = $state();
	let fieldErrors = $state<FieldErrors>({});
	let showToast = $state(false);
	let toastTimeout: ReturnType<typeof setTimeout> | null = null;

	const categories = [
		"Academic Excellence",
		"Arts & Creativity",
		"Athletics & Sports",
		"Community Service",
		"Entrepreneurship",
		"Environmental Action",
		"Innovation & Technology",
		"Leadership",
		"Literature & Writing",
		"Music & Performing Arts",
		"Science & Research",
		"Social Impact",
		"STEM",
		"Visual Arts",
		"Other"
	];

	const cities = [
		"Mumbai",
		"Hyderabad",
		"Delhi",
		"Pune",
		"Kolkata",
		"Chandigarh",
		"Coimbatore",
		"Chennai",
		"Jaipur",
		"Bangalore",
		"Lucknow",
		"Ahmedabad"
	];

	function clearFieldError(fieldName: string) {
		if (fieldErrors[fieldName]) {
			const newErrors = { ...fieldErrors };
			delete newErrors[fieldName];
			fieldErrors = newErrors;
		}
	}

	// Clear errors when fields are updated
	$effect(() => {
		if (formData.fullName) clearFieldError("fullName");
	});
	$effect(() => {
		if (formData.email) clearFieldError("email");
	});
	$effect(() => {
		if (formData.class) clearFieldError("class");
	});
	$effect(() => {
		if (formData.section) clearFieldError("section");
	});
	$effect(() => {
		if (formData.school) clearFieldError("school");
	});
	$effect(() => {
		if (formData.city) clearFieldError("city");
	});
	$effect(() => {
		if (formData.schoolAddress) clearFieldError("schoolAddress");
	});
	$effect(() => {
		if (formData.category) clearFieldError("category");
	});
	$effect(() => {
		if (formData.studentPhoto) clearFieldError("studentPhoto");
	});
	$effect(() => {
		if (formData.supportingDocuments) clearFieldError("supportingDocuments");
	});

	function showErrorToast() {
		showToast = true;
		if (toastTimeout) {
			clearTimeout(toastTimeout);
		}
		toastTimeout = setTimeout(() => {
			showToast = false;
		}, 5000);
	}

	// Helper to convert file to Base64
    const fileToBase64 = (file: File): Promise<{ data: string, mimeType: string }> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                // Remove the "data:*/*;base64," prefix to get raw base64 string
                const result = reader.result as string;
                const base64Data = result.split(',')[1];
                resolve({ 
                    data: base64Data, 
                    mimeType: file.type 
                });
            };
            reader.onerror = error => reject(error);
        });
    };

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		e.stopPropagation();

		console.log(formData);

		// Prevent double submission
		if (isSubmitting) {
			return;
		}

		if (!formElement) return;

		// Use HTML5 validation
		const validation = validateForm(formElement);

		if (!validation.isValid) {
			fieldErrors = validation.errors;
			// Scroll to first error
			const firstErrorField = Object.keys(validation.errors)[0];
			const errorElement = formElement.querySelector(`#${firstErrorField}`);
			if (errorElement) {
				errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
				(errorElement as HTMLElement).focus();
			}
			return;
		}

		// Clear any previous errors
		fieldErrors = {};
		isSubmitting = true;
		isSuccess = false;

		try {
			const payload: any = {
				fullName: formData.fullName.trim(),
				email: formData.email.trim(),
				class: formData.class.trim(),
				section: formData.section.trim(),
				school: formData.school.trim(),
				city: formData.city.trim(),
				schoolAddress: formData.schoolAddress.trim(),
				category: formData.category
			};

			// 2. Convert Files to Base64 if they exist
            if (formData.studentPhoto && formData.studentPhoto instanceof File) {
                payload.studentPhoto = await fileToBase64(formData.studentPhoto);
            }

            // Supporting documents is now a Google Drive link (string)
            if (formData.supportingDocuments && formData.supportingDocuments.trim()) {
                payload.supportingDocuments = formData.supportingDocuments.trim();
            }

			// 3. Send as JSON (no-cors mode is TRICKY - see note below)
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "text/plain;charset=utf-8", 
                },
                // We use text/plain to avoid an excessively strict CORS preflight check
                // but the body is valid JSON.
                body: JSON.stringify(payload)
            });

			if (!response.ok) {
				throw new Error("Failed to submit form");
			}

			await response.text();

			console.log('response', response);

			// Show success state
			isSuccess = true;
			isSubmitting = false;

			// Reset form after 3 seconds
			setTimeout(() => {
				formData = {
					fullName: "",
					email: "",
					class: "",
					section: "",
					school: "",
					city: "",
					schoolAddress: "",
					category: "",
					studentPhoto: null,
					supportingDocuments: ""
				};
				fieldErrors = {};
				isSuccess = false;
				formElement?.reset();
			}, 3000);
		} catch (error) {
			console.error("Form submission error:", error);
			isSubmitting = false;
			isSuccess = false;
			showErrorToast();
		}
	}
</script>

<div class="bg-[rgb(87,203,245)] rounded-b-3xl rounded-t-none px-4 md:px-10 lg:px-20 py-10 md:py-16 relative">
	<Toast message="Something went wrong" type="error" show={showToast} />
	<Star class="absolute top-20 left-0 md:left-10 size-16 md:size-20 opacity-80" />
	<Star class="absolute bottom-20 right-0 md:right-10 size-16 md:size-20 opacity-80" />

	<h2
		class="text-[#CA3328] text-4xl md:text-5xl lg:text-6xl font-extrabold font-dina-chaumont text-center py-6 md:py-10 text-stroke-white"
	>
		Ready to Nominate a Student?
	</h2>

	<div class="flex flex-col items-center justify-center gap-2 mb-8 md:mb-12">
		<p class="text-[#333333] text-center text-lg md:text-xl font-medium">
			Share the details below to get started.
		</p>

		<p class="text-[#333333] text-center text-lg md:text-xl font-normal italic">
			Nomination Form Fields
		</p>
	</div>

	<form bind:this={formElement} onsubmit={handleSubmit} class="max-w-4xl mx-auto" novalidate>
		<FormInput
			id="fullName"
			label="Full Name"
			type="text"
			bind:value={formData.fullName}
			placeholder="Enter full name"
			required={true}
			disabled={isSubmitting}
			error={fieldErrors.fullName}
		/>

		<FormInput
			id="email"
			label="Email ID (student/parent)"
			type="email"
			bind:value={formData.email}
			placeholder="Enter email address"
			required={true}
			disabled={isSubmitting}
			error={fieldErrors.email}
		/>

		<FormInput
			id="class"
			label="Class"
			type="text"
			bind:value={formData.class}
			placeholder="Enter class"
			required={true}
			disabled={isSubmitting}
			error={fieldErrors.class}
		/>

		<FormInput
			id="section"
			label="Section"
			type="text"
			bind:value={formData.section}
			placeholder="Enter section"
			required={true}
			disabled={isSubmitting}
			error={fieldErrors.section}
		/>

		<FormInput
			id="school"
			label="School"
			type="text"
			bind:value={formData.school}
			placeholder="Enter school name"
			required={true}
			disabled={isSubmitting}
			error={fieldErrors.school}
		/>

		<FormSelect
			id="city"
			label="City"
			bind:value={formData.city}
			options={cities}
			placeholder="Select a city"
			required={true}
			disabled={isSubmitting}
			error={fieldErrors.city}
		/>

		<FormTextarea
			id="schoolAddress"
			label="School Address"
			bind:value={formData.schoolAddress}
			placeholder="Enter school address"
			required={true}
			disabled={isSubmitting}
			error={fieldErrors.schoolAddress}
		/>

		<FormSelect
			id="category"
			label="Category"
			bind:value={formData.category}
			options={categories}
			placeholder="Select a category"
			required={true}
			disabled={isSubmitting}
			error={fieldErrors.category}
		/>

		<FileUpload
			id="studentPhoto"
			label="Upload Student Photograph"
			bind:file={formData.studentPhoto}
			accept="image/*"
			required={true}
			disabled={isSubmitting}
			iconType="image"
			error={fieldErrors.studentPhoto}
		/>

		<FormInput
			id="supportingDocuments"
			label="Supporting Documents (Google Drive Link)"
			type="url"
			bind:value={formData.supportingDocuments}
			placeholder="Enter Google Drive link"
			required={false}
			disabled={isSubmitting}
			error={fieldErrors.supportingDocuments}
		/>

		<!-- Note -->
		<div class="mb-8 p-4 bg-white/50 rounded-lg">
			<p class="text-[#333333] text-sm md:text-base leading-relaxed">
				Please note: Each school may use one official email ID for all
				submissions. Schools can submit up to 5 entries in total, across any 5
				of the 18 categories.
			</p>
		</div>

		<!-- Submit Button -->
		<div class="flex justify-center">
			<SubmitButton isSubmitting={isSubmitting} isSuccess={isSuccess} disabled={isSubmitting} />
		</div>
	</form>
</div>
