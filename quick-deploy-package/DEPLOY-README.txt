LIGHTWEIGHT NETLIFY DEPLOYMENT - Under 25MB
===========================================

THIS PACKAGE CONTAINS:
✓ netlify/functions/ (3 serverless functions)
✓ dist/ (your built React website) 
✓ netlify.toml (configuration)
✓ _redirects (routing rules)
✓ package.json (minimal dependencies only)

SIZE: Under 5MB (way under 25MB limit!)

DEPLOY STEPS:
1. Extract this entire folder
2. Drag ALL files/folders to Netlify deploy area
3. Wait 2-3 minutes for build
4. Functions will work immediately

WHAT'S MISSING (intentionally):
- node_modules/ (Netlify installs these automatically)  
- package-lock.json (Netlify generates this)
- All dev dependencies (not needed for production)

YOUR CHATBOT WILL WORK:
- OpenAI API key already configured in Netlify
- Functions are standalone (no database needed)
- Test: https://ilove-ai.co.za/.netlify/functions/test-env

This is the minimal package that will deploy successfully!