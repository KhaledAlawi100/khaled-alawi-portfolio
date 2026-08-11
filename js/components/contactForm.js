/**
 * Initializes contact form validation and real backend submission.
 *
 * Responsibilities:
 *
 * - Validate name
 * - Validate email
 * - Validate subject
 * - Validate message
 * - Display field-level validation errors
 * - Display loading state during submission
 * - Send the contact message to the backend API
 * - Handle successful backend responses
 * - Handle backend validation errors
 * - Handle backend/API errors
 * - Handle network errors
 * - Display success/error status
 * - Reset the form after successful submission
 */
export function initContactForm() {
  const contactForm = document.querySelector(".contact-form");

  if (!contactForm) {
    console.warn("Contact form was not found.");
    return;
  }

  const submitButton = document.querySelector("#contact-submit");
  const submitText = submitButton?.querySelector(".submit-text");
  const submitLoading = submitButton?.querySelector(".submit-loading");
  const formStatus = document.querySelector("#contact-form-status");

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    clearFormErrors();
    clearFormStatus();

    const formData = new FormData(contactForm);

    const name = formData.get("name")?.trim() ?? "";
    const email = formData.get("email")?.trim() ?? "";
    const subject = formData.get("subject")?.trim() ?? "";
    const message = formData.get("message")?.trim() ?? "";

    const isValid = validateForm({
      name,
      email,
      subject,
      message,
    });

    if (!isValid) {
      return;
    }

    setLoadingState({
      isLoading: true,
      submitButton,
      submitText,
      submitLoading,
    });

    try {
      const response = await fetch(
        "https://portfolio-email-service-lxne.onrender.com/api/contact",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },

          body: JSON.stringify({
            name,
            email,
            subject,
            message,
          }),
        },
      );

      /*
       * Try to parse the backend response.
       *
       * Both successful and error responses from your backend
       * are expected to return JSON.
       */
      let responseData = null;

      try {
        responseData = await response.json();
      } catch {
        /*
         * The server may return an empty response or
         * a non-JSON response.
         */
        responseData = null;
      }

      /*
       * HTTP error.
       *
       * Examples:
       * - 400 Bad Request
       * - 500 Internal Server Error
       * - 503 Service Unavailable
       */
      if (!response.ok) {
        /*
         * Backend validation response:
         *
         * {
         *   "success": false,
         *   "message": "...",
         *   "errors": {
         *     "name": "...",
         *     "email": "...",
         *     "subject": "...",
         *     "message": "..."
         *   }
         * }
         */
        if (responseData?.errors) {
          showBackendValidationErrors(responseData.errors);
        }

        const errorMessage =
          responseData?.message ??
          "Something went wrong. Please check your information and try again.";

        throw new Error(errorMessage);
      }

      /*
       * HTTP success.
       *
       * Expected backend response:
       *
       * {
       *   "success": true,
       *   "message": "..."
       * }
       */
      if (responseData?.success === false) {
        throw new Error(
          responseData.message ??
            "Your message could not be sent. Please try again later.",
        );
      }

      showFormStatus(
        "success",
        responseData?.message ??
          "Your message has been sent successfully. I'll get back to you soon.",
        formStatus,
      );

      /*
       * Reset only after successful submission.
       */
      contactForm.reset();

      /*
       * Make sure the form fields return to their normal
       * validation state after reset.
       */
      clearFormErrors();
    } catch (error) {
      console.error("Contact form submission failed:", error);

      /*
       * If the backend validation errors were already displayed,
       * don't replace them with a generic message.
       *
       * The global status still shows the backend message.
       */
      showFormStatus(
        "error",
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again later.",
        formStatus,
      );
    } finally {
      setLoadingState({
        isLoading: false,
        submitButton,
        submitText,
        submitLoading,
      });
    }
  });
}

/**
 * Validates the contact form fields.
 *
 * These limits match the backend ContactRequest DTO:
 *
 * name    -> max 100 characters
 * email   -> max 254 characters
 * subject -> max 200 characters
 * message -> max 5000 characters
 *
 * @param {Object} fields
 * @param {string} fields.name
 * @param {string} fields.email
 * @param {string} fields.subject
 * @param {string} fields.message
 *
 * @returns {boolean}
 */
function validateForm({ name, email, subject, message }) {
  let isValid = true;

  /*
   * Name
   */
  if (!name) {
    showFieldError("name", "Please enter your name.");

    isValid = false;
  } else if (name.length > 100) {
    showFieldError("name", "Name must not exceed 100 characters.");

    isValid = false;
  }

  /*
   * Email
   */
  if (!email) {
    showFieldError("email", "Please enter your email address.");

    isValid = false;
  } else if (!isValidEmail(email)) {
    showFieldError("email", "Please enter a valid email address.");

    isValid = false;
  } else if (email.length > 254) {
    showFieldError("email", "Email must not exceed 254 characters.");

    isValid = false;
  }

  /*
   * Subject
   */
  if (!subject) {
    showFieldError("subject", "Please enter a subject.");

    isValid = false;
  } else if (subject.length > 200) {
    showFieldError("subject", "Subject must not exceed 200 characters.");

    isValid = false;
  }

  /*
   * Message
   */
  if (!message) {
    showFieldError("message", "Please enter your message.");

    isValid = false;
  } else if (message.length > 5000) {
    showFieldError("message", "Message must not exceed 5000 characters.");

    isValid = false;
  }

  return isValid;
}

/**
 * Validates an email address.
 *
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Displays an error for a specific form field.
 *
 * @param {string} fieldName
 * @param {string} message
 */
function showFieldError(fieldName, message) {
  const input = document.getElementById(`contact-${fieldName}`);

  const errorElement = document.getElementById(`contact-${fieldName}-error`);

  if (!input || !errorElement) {
    return;
  }

  input.classList.add("input-error");

  input.setAttribute("aria-invalid", "true");

  errorElement.textContent = message;
}

/**
 * Displays validation errors returned by the backend.
 *
 * Backend format:
 *
 * {
 *   "name": "Name is required",
 *   "email": "Please provide a valid email address",
 *   "subject": "Subject is required",
 *   "message": "Message must not exceed 5000 characters"
 * }
 *
 * @param {Object} errors
 */
function showBackendValidationErrors(errors) {
  if (!errors || typeof errors !== "object") {
    return;
  }

  Object.entries(errors).forEach(([fieldName, message]) => {
    if (!message) {
      return;
    }

    showFieldError(fieldName, message);
  });
}

/**
 * Clears all field-level validation errors.
 */
function clearFormErrors() {
  const fields = document.querySelectorAll(
    ".contact-form input, .contact-form textarea",
  );

  const errors = document.querySelectorAll(".contact-form .form-error");

  fields.forEach((field) => {
    field.classList.remove("input-error");

    field.removeAttribute("aria-invalid");
  });

  errors.forEach((error) => {
    error.textContent = "";
  });
}

/**
 * Displays the global form status message.
 *
 * @param {"success"|"error"} type
 * @param {string} message
 * @param {HTMLElement|null} statusElement
 */
function showFormStatus(type, message, statusElement) {
  if (!statusElement) {
    return;
  }

  statusElement.className = `form-status form-status-${type}`;

  statusElement.textContent = message;
}

/**
 * Clears the global form status message.
 */
function clearFormStatus() {
  const formStatus = document.querySelector("#contact-form-status");

  if (!formStatus) {
    return;
  }

  formStatus.className = "form-status";

  formStatus.textContent = "";
}

/**
 * Updates the form submission loading state.
 *
 * @param {Object} options
 * @param {boolean} options.isLoading
 * @param {HTMLButtonElement|null} options.submitButton
 * @param {HTMLElement|null} options.submitText
 * @param {HTMLElement|null} options.submitLoading
 */
function setLoadingState({
  isLoading,
  submitButton,
  submitText,
  submitLoading,
}) {
  if (!submitButton) {
    return;
  }

  submitButton.disabled = isLoading;

  if (submitText) {
    submitText.hidden = isLoading;
  }

  if (submitLoading) {
    submitLoading.hidden = !isLoading;

    submitLoading.setAttribute("aria-hidden", String(!isLoading));
  }
}
