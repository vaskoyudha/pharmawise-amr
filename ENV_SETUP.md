# PharmaWise-AMR - Environment Setup

## Required Environment Variables

This project requires certain environment variables to function properly. Create a `.env.local` file in the root directory with the following variables:

### Google Gemini AI (Required for Counseling Script Generator)

```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

**How to get your Gemini API key:**
1. Visit [Google AI Studio](https://aistudio.google.com/apikey)
2. Sign in with your Google account
3. Click "Get API Key" or "Create API Key"
4. Copy the generated API key
5. Paste it in your `.env.local` file

### Firebase Configuration (if applicable)

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Important Notes

- The `.env.local` file is gitignored and should NEVER be committed to version control
- After creating or modifying `.env.local`, restart your development server
- Environment variables prefixed with `NEXT_PUBLIC_` are exposed to the browser
- Variables without the prefix (like `GEMINI_API_KEY`) are only available on the server-side

## Next Steps

After setting up your `.env.local` file:

1. Restart the development server:
   ```bash
   npm run dev
   ```

2. Test the Counseling Generator feature in the workspace

3. If you get a 403 error, verify:
   - The API key is correctly set in `.env.local`
   - You've restarted the dev server
   - The API key is valid and has not expired
