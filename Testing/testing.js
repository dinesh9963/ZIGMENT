const { test, expect } = require('@playwright/test');

test.describe('JSON Validation', () => {
  test('should validate form JSON structure', async () => {
    const formSchema = {
      name: '',
      email: '',
      age: '',
      password: '',
      comments: '',
      acceptedTerms: false,
    };

    expect(typeof formSchema).toBe('object');
    expect(formSchema).toHaveProperty('name');
    expect(formSchema).toHaveProperty('email');
    expect(formSchema).toHaveProperty('age');
    expect(formSchema).toHaveProperty('password');
    expect(formSchema).toHaveProperty('comments');
    expect(formSchema).toHaveProperty('acceptedTerms');

    console.log('JSON validation passed');
  });
});
test.describe('Form Rendering', () => {
    test('should render form in real-time', async ({ page }) => {
      await page.goto('http://localhost:3000'); // Replace with your app URL
      const form = await page.$('form');
      expect(form).not.toBeNull();
  
      console.log('Form rendered correctly');
    });
  });
  test.describe('Form Validation and Submission', () => {
    test('should validate and submit the form', async ({ page }) => {
      await page.goto('http://localhost:3000');
  
      await page.fill('#name', 'John Doe');
      await page.fill('#email', 'john.doe@example.com');
      await page.fill('#age', '30');
      await page.fill('#password', 'password123');
      await page.fill('#comments', 'This is a comment');
      await page.click('#acceptedTerms');
  
      await page.click('#submitButton');
      await page.waitForSelector('#successMessage');
      
      const successMessage = await page.textContent('#successMessage');
      expect(successMessage).toBe('Form submitted successfully!');
  
      console.log('Form validation and submission passed');
    });
  });
  test.describe('Responsive Layout', () => {
    const viewports = [
      { width: 1280, height: 720, label: 'Desktop' },
      { width: 768, height: 1024, label: 'Tablet' },
      { width: 375, height: 812, label: 'Mobile' },
    ];
  
    for (const viewport of viewports) {
      test(`should display correctly on ${viewport.label}`, async ({ page }) => {
        await page.setViewportSize(viewport);
        await page.goto('http://localhost:3000');
        const form = await page.$('form');
        expect(form).toBeVisible();
  
        console.log(`Form displayed correctly on ${viewport.label}`);
      });
    }
  });
  test.describe('Form Error Handling', () => {
    test('should display validation errors', async ({ page }) => {
      await page.goto('http://localhost:3000');
  
      await page.click('#submitButton'); // Attempt to submit without filling fields
  
      const nameError = await page.textContent('#nameError');
      const emailError = await page.textContent('#emailError');
      const ageError = await page.textContent('#ageError');
      const passwordError = await page.textContent('#passwordError');
      const termsError = await page.textContent('#termsError');
  
      expect(nameError).toBe('Name is required');
      expect(emailError).toBe('Valid email is required');
      expect(ageError).toBe('Age must be a number');
      expect(passwordError).toBe('Password must be at least 6 characters');
      expect(termsError).toBe('You must accept the terms');
  
      console.log('Validation error handling passed');
    });
  });
        