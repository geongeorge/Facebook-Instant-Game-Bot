# Instant game messenger bot

## Setup

    You my host multiple or maybe all of your chatbots in the same server using this guide.

In order to setup a bot for an instant game using serverpilot follow this:

### Create a Subdomain(app)

In serverpilot using your prefered domain create a subdomain app
![Serverpilot](https://i.imgur.com/gUbSmL2.png)

*So here our website for the bot will be potato-bot.mywebsite.com*

**A folder called `potato-bot` will be created in the serverpilot apps folder**

### Uploading the files

Using a good ftp/sftp program upload the files in this repo directly to the new app folder

#### Edit and configure

Now our important files are 

    index.js
    database.js
    sender.js

#### ↪️ In index.js
![index.js](https://i.imgur.com/cWUBF1q.png)

**VERIIFY_TOKEN:**
You may change this verify token although it is **optional** in line 4 but when ever I mention the "i eat potato" you should substitute your code.

**myport:**
Port should be different for all the apps you host in the same server.
 **Very important:** Right after you change the port also change the port in `.htaccess` file.



#### ↪️ In database.js

Edit the appName for each app

database name change is only optional if you are in the same server

![database.js](https://i.imgur.com/wuhwmJ8.png)

#### ↪️ In sender.js

In sender.js edit token and api url
![sender.js](https://i.imgur.com/JjqOByX.png)

**TOKEN**:
You get this from facebook.
<details>
  <summary>See How to get token</summary>

  ![token](https://i.imgur.com/jDsP5cB.png)
</details>

**apiUrl**:
<details>
  <summary>See How to get api url</summary>

If your admin panel installation is at

`https://website.com/game`

then your apiUrl is:

`https://website.com/game/api/apps`
</details>

**Configuration is complete!!**


### Running! :rocket:

Now connect to the server with ssh. (in putty or terminal)

Navigate to the installation folder with `cd` command

##### Install all dependencies

```
npm install
```

####  Run app

```
pm2 start index
```


Check if when you open the new bot url in thee browser you get this message:
```
webhook running in /webook
```

#### Register webhook

go to facebook developers

if you're adding chatbot for the first time use messenger product

if its not the first time add and use webhook product

Add a `/webhook` to your bot url 

use the verify token we used above

![webhook](https://i.imgur.com/CLLiuyn.png)