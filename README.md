# Interactive Form Validation

## Real-Time Error Messages

The form implements real-time validation for the following fields:

- **Name Field**: Validates as you type to ensure:
  - Field is not empty
  - Contains at least 2 characters
  - No numbers or special characters allowed

- **Email Field**: Validates in real-time to check:
  - Proper email format (username@domain.tld)
  - Valid characters in username (letters, numbers, dots only)
  - Valid characters in domain (letters, numbers, dots, hyphens only)

- **Credit Card Fields**: All validate as you type:
  - Card Number: Must be 13-16 digits
  - Zip Code: Must be exactly 5 digits
  - CVV: Must be exactly 3 digits

### Implementation Details

The validation is implemented using the `createListener` function which creates event listeners for the input fields:

```javascript
// Event listeners for real-time validation
nameInput.addEventListener("input", createListener(isValidName, "Name"));
emailInput.addEventListener("input", createListener(isValidEmail, "Email"));
cardNumberInput.addEventListener("input", createListener(isValidCardNumber, "Card Number"));
zipCodeInput.addEventListener("input", createListener(isValidZipCode, "Zip Code"));
cvvInput.addEventListener("input", createListener(isValidCVV, "CVV"));
```

Each field uses specific regex patterns for validation and provides immediate visual feedback:
- Valid entries show a green checkmark
- Invalid entries show a red and descriptive error message
- Empty required fields show "field cannot be blank" message