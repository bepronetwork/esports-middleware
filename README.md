# Esports Middleware API
This micro service is responsible for taking the information that comes from pandascore via rabbit, and passing it on to Listener-Esports. It is possible to have more than 1 Listener-Esports, to do this just add to the environment variable of middleware-esports.

# Getting started

### Project Configuration
The first step is to fork the project onto your machine. After fork, enter the project and in its root folder create an `.env` file. In this file, you put all your sensitive and environment info.

The `.env` variables are in this link, section 3: https://www.notion.so/betprotocol/Middleware-Esports-3e0601fc84d84bc8aee2a85da3cb615a

Note: In the link above is also the step by step of what is needed to create an online machine of the entire project in Heroku.

### Project Installation

After creating the `.env` file, we now open a terminal in the project's root folder and install all project dependencies with the command:

    npm install

Finally, we started the project with:

    npm start

### Docs

- Endpoint documentation: https://betprotocol.readme.io/reference
- General documentation BEPRO.NETWORK operation: https://www.notion.so/betprotocol/BEPRO-NETWORK-c3d96d49ccc04f49b07ea9ea8fd5c149
