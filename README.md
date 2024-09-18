# ACM@UIC Jukebox

## Running the Jukebox locally

1. run `npm install` in frontend and backend directory
2. The backend env needs a youtube apikey and a port to host on
2. The client env file needs the url of the backend with the port provided to the server: `http://localhost:(server-port)`
2. run `npm run dev` on a terminal in the frontend and backend directory
3. The backend directory run a node server that keeps a socket connection to clients
4. The frontend is the Jukebox website made in react