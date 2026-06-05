# Deploying To GitHub Pages

This project is configured for GitHub Pages with GitHub Actions.

## Steps

1. Create a GitHub repository.
2. Push this local repo to GitHub:

   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

3. In GitHub, open the repository settings.
4. Go to **Pages**.
5. Under **Build and deployment**, set **Source** to **GitHub Actions**.
6. The workflow in `.github/workflows/deploy.yml` will build `dist/` and publish it.

The Vite config uses `base: "./"` so built assets work on GitHub Pages whether the site is hosted at a user page or under a repository path.

## Original Generated Assets

Untouched generated images are saved in `original-assets/` so you can retry background removal without using the processed versions in `src/assets/`.
