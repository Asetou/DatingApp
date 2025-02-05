# Healthcare Web App Setup Guide

This guide provides detailed instructions to set up and run the Healthcare Web App locally, covering both the backend (ASP.NET Core API) and frontend (Angular application).

## Prerequisites

Before starting, ensure your system has the following tools installed:

- **Git**: For cloning the repository.
- **Visual Studio** (for Windows) or **Visual Studio Code** (with the C# extension): For developing the backend.
- **Node.js** (version 18.x or higher): For running the Angular frontend.
- **SQL Server** or **SQLite**: Depending on your database preference.
- **Cloudinary Account**: If the project utilizes Cloudinary for image uploads.
- **.NET SDK** (version 8.x or higher): For running the .NET backend.

## 1. Clone the Repository

Begin by cloning the Healthcare Web App repository to your local machine:

```bash
git clone https://github.com/Asetou/Healthcare-Web-App.git
cd Healthcare-Web-App
```

## 2. Set Up the Backend (ASP.NET Core API)

The backend is built using ASP.NET Core. Follow these steps to set it up:

### a. Open the Backend in Your IDE

- Launch Visual Studio or Visual Studio Code.
- Open the solution file (`HealthCareApp.sln`) located in the root folder of the project.

### b. Configure the Database

The application supports both SQL Server and SQLite. Choose one based on your preference:

**For SQL Server (Recommended for Production):**

1. Ensure your SQL Server instance is running locally and accessible.
2. In the `appsettings.json` file, configure the `ConnectionStrings` as follows:

   ```json
   "ConnectionStrings": {
       "DefaultConnection": "Server=localhost;Database=HealthCareAppDB;Trusted_Connection=True;"
   }
   ```

**For SQLite (Suitable for Local Development):**

1. In the `appsettings.json` file, adjust the `ConnectionStrings` to use SQLite:

   ```json
   "ConnectionStrings": {
       "DefaultConnection": "Data Source=HealthCareApp.db"
   }
   ```

2. If SQLite isn't installed, install it or use Entity Framework Core migrations to handle it.

### c. Restore NuGet Packages

To restore the necessary NuGet packages:

- In Visual Studio: Right-click the solution and select **Restore NuGet Packages**.
- Alternatively, in the terminal, run:

  ```bash
  dotnet restore
  ```

### d. Apply Migrations and Update the Database

Execute the following commands in the Package Manager Console or terminal to apply database migrations:

```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

- For SQLite, the `HealthCareApp.db` file will be created in the project directory.

### e. Run the Backend API

To run the project:

- In Visual Studio: Press `F5` or click the **Start Debugging** button.
- In Visual Studio Code: Open the terminal and run:

  ```bash
  dotnet watch run
  ```

The backend API should now be running, typically accessible at `https://localhost:5001` by default.

## 3. Set Up the Frontend (Angular Application)

Next, set up the Angular frontend:

### a. Install Node.js and npm

Ensure Node.js (version 18.x or higher) is installed:

```bash
node -v
npm -v
```

If not installed, download and install it from [nodejs.org](https://nodejs.org/).

### b. Navigate to the Frontend Directory

In the terminal, navigate to the client directory:

```bash
cd client
```

### c. Install Angular Dependencies

Install the necessary npm packages:

```bash
npm install
```

### d. Configure Environment Variables

Open the `src/environments/environment.ts` file and set the API URL:

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:5001/api' // URL for the backend API
};
```

Ensure this URL matches where your ASP.NET Core API is running.

### e. Run the Angular Application

Start the Angular frontend application:

```bash
ng serve
```

The application should now be running at `http://localhost:4200` by default.

## 4. Configuring Cloudinary (Optional for Image Uploads)

If the project uses Cloudinary for image uploads:

1. Create a Cloudinary account at [cloudinary.com](https://cloudinary.com/).
2. In your Cloudinary dashboard, obtain your Cloud Name, API Key, and API Secret.
3. Update the `appsettings.json` in the backend with your Cloudinary credentials:

   ```json
   "CloudinarySettings": {
     "CloudName": "your-cloud-name",
     "ApiKey": "your-api-key",
     "ApiSecret": "your-api-secret"
   }
   ```

This configuration ensures media files are uploaded to Cloudinary when users interact with the app.

## 5. Testing the Application

After completing the setup:

- The backend API should be running at `https://localhost:5001`.
- The Angular frontend should be running at `http://localhost:4200`.

Open a browser and navigate to `http://localhost:4200` to access the application. You should be able to interact with the API, register, log in, view user profiles, and more.

## 6. Additional Configuration (Optional)

**Running in Production Mode:**

If deploying the application in a production environment:

1. Build the Angular app for production:

   ```bash
   ng build --prod
   ```

2. Configure the ASP.NET Core app for production by setting appropriate environment variables and connection strings in `appsettings.Production.json`.

## Conclusion

You should now have the Healthcare Web App set up locally with both the backend (ASP.NET Core API) and frontend (Angular application). If you encounter any issues or have questions, please refer to the project's repository: [Healthcare-Web-App](https://github.com/Asetou/Healthcare-Web-App). 
