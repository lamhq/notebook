## Initializing Terraform

Follow these steps to initialize Terraform:

1. Locate the backend configuration file `config/s3.tfbackend`. Ask the user to prepare it if it does not exist.

2. Run init command to initialize Terraform in the working directory.
   ```bash
   terraform init -backend-config=config/s3.tfbackend -reconfigure -upgrade
   ```
