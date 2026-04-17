## Deployment

Follow these steps to deploy the infrastructure to an environment:

1. Initialize Terraform (do this once per project or after adding new providers/modules).

2. Ask user the environment to deploy to (e.g., `dev`, `prod`) unless provided.

3. Switch to the workspace of that environment:

   ```bash
   terraform workspace select dev
   ```

4. Locate the variable definition file for the environment (e.g., `config/${env}.tfvars`), ask user to prepare it if it does not exist.

5. Run command to review the plan:

   ```bash
   terraform plan -var-file=config/${env}.tfvars
   ```

6. Summarize the changes to be applied and display it to user.

7. Ask for user confirmation to continue.

8. Apply the changes:

   ```bash
   terraform apply -var-file=config/${env}.tfvars
   ```

9. In GCP, update Google Auth Platform / Clients:
   - Set **Authorized JavaScript origins** to `https://<cognito-domain>`
   - Set **Authorized redirect URIs** to `https://<cognito-domain>/oauth2/idpresponse`

10. In GCP, update Google Auth Platform / Branding, add Cognito domain to **Authorized domains**
