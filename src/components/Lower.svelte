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
	const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_SCRIPT_URL_HERE";

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
		supportingDocuments: null
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

	function showErrorToast() {
		showToast = true;
		if (toastTimeout) {
			clearTimeout(toastTimeout);
		}
		toastTimeout = setTimeout(() => {
			showToast = false;
		}, 5000);
	}

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		e.stopPropagation();

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
			// Create FormData for file upload
			const submitData = new FormData();
			submitData.append("fullName", formData.fullName.trim());
			submitData.append("email", formData.email.trim());
			submitData.append("class", formData.class.trim());
			submitData.append("section", formData.section.trim());
			submitData.append("school", formData.school.trim());
			submitData.append("city", formData.city.trim());
			submitData.append("schoolAddress", formData.schoolAddress.trim());
			submitData.append("category", formData.category);

			if (formData.studentPhoto) {
				submitData.append("studentPhoto", formData.studentPhoto);
			}

			if (formData.supportingDocuments) {
				submitData.append("supportingDocuments", formData.supportingDocuments);
			}

			// Submit to Google Scripts
			const response = await fetch(GOOGLE_SCRIPT_URL, {
				method: "POST",
				body: submitData
			});

			if (!response.ok) {
				throw new Error("Failed to submit form");
			}

			await response.text();

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
					supportingDocuments: null
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

		<FormInput
			id="city"
			label="City"
			type="text"
			bind:value={formData.city}
			placeholder="Enter city"
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

		<FileUpload
			id="supportingDocuments"
			label="Upload Supporting Documents"
			bind:file={formData.supportingDocuments}
			accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
			required={false}
			disabled={isSubmitting}
			iconType="upload"
			helperText="(Certificates, project details, portfolios, links, or relevant work)"
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
