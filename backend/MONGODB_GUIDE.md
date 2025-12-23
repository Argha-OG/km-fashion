# MongoDB Setup Guide

Currently, your project is connected to a **Local MongoDB** instance (`mongodb://localhost:27017/km-fashion`). This works great for development if you have MongoDB installed on your computer.

If you want to deploy your site or access the database from anywhere, you should use **MongoDB Atlas** (Cloud Database).

## How to Setup MongoDB Atlas (Free)

1.  **Create an Account**: Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and sign up.
2.  **Create a Cluster**:
    *   Choose the **Shared** (Free) option.
    *   Select a provider (AWS) and region (closest to you).
    *   Click **Create Cluster**.
3.  **Create a Database User**:
    *   Go to **Database Access**.
    *   Click **Add New Database User**.
    *   Enter a **Username** and **Password** (Remember these!).
    *   Click **Add User**.
4.  **Network Access**:
    *   Go to **Network Access**.
    *   Click **Add IP Address**.
    *   Select **Allow Access from Anywhere** (0.0.0.0/0) for simplicity, or add your specific IP.
    *   Click **Confirm**.
5.  **Get Connection String**:
    *   Go to **Database** (Clusters).
    *   Click **Connect**.
    *   Select **Drivers** (Node.js).
    *   **Copy the connection string**. It will look like:
        `mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority`
6.  **Update Your Project**:
    *   Open `backend/.env`.
    *   Replace the `MONGODB_URI` value with your new string.
    *   **Important**: Replace `<password>` with your actual password (remove the `<>`).
    *   Replace `/?` with `/km-fashion?` to name your database.

Example in `.env`:
```env
MONGODB_URI=mongodb+srv://admin:mypassword123@cluster0.abcde.mongodb.net/km-fashion?retryWrites=true&w=majority
```

7.  **Restart Backend**:
    *   Stop the server (Ctrl+C).
    *   Run `npm run dev` or `node server.js` again.
