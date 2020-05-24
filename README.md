# Welcome to Hub droid!

<p align=center><img src="https://github.com/Team-Code-Paradox/StockHub/blob/master/Assets/preview.gif" alt="Preview" height="600" width="320"/></p>

#### <p align=center><b>Watch our product in action </b><img src="http://icons.iconarchive.com/icons/danleech/simple/256/vimeo-icon.png" height="20" width="20" alt="Vimeo" /> <a href="https://vimeo.com/417173972">here</a> </p>
#### 
A typical **website integration** to demonstrate **Human Plus Bot Hybrid Support** has been presented [here](https://team-code-paradox.github.io/hubdroid-web). Just say **talk to human** or **transfer to agent** and a customer support agent will be assigned in realtime to resolve customer queries. The integration keeps a log of customer queries, responds to requests and direct them to human agent on customer's demand. Customers can even send files as an attachment for better understanding and prompt resolution of queries. 
  
The demonstration of how the prototpe integrates with the **Google Assistant** can be watched [here.](https://vimeo.com/421960384)
  
All the features of the prototype along with the integrations is showcased in the video link as stated [above.](https://youtu.be/6TZG1LsH-EA)

####
Hey there! I am Store Bot. I will assist you in ordering the products.
But first, I need to understand your language. Please follow the following steps to deploy on google assistant:

#### Deploying Dialogflow Agent:

1. Locate the **Hub_Droid.zip** file in code repository.
2. Once you have a zip, head to **[Actions on Google](https://console.actions.google.com/)** and create a new project by entering a name and country for the project.
3. Once the project is created, you will be on the **Onboarding** screen. Select **Conversational** on this screen.
4. Fill in the basic details about your action such as invocation phrase, voice, etc in the **'Quick Setup'** section.
5. In **'Action'** section, select **Build your action** and select **'Custom Intent'** in the consecutive dialog box and click **'Build'**.
6. You will be redirected to DialogFlow's project page. On this screen: **select your timezone - don't change the language.**. Then select **Create** and wait for the process to complete.
7. Once done, select the **Settings** gear icon at the top left and then go to **Export and Import tab**.
8. On this screen, select **Restore from Zip** and browse `Hub_Droid.zip` and click Restore!
9. Go to the **Fulfillment** tab and you will see a field **Webhook**. You have to enter your **own https endpoint**. You can create your webhook by following [Deployment guide of the Firebase Cloud Function](#Deploying-Cloud-Functions-to-Firebase).

10. That's it, you are almost there! Next select the **Integrations** tab and then under Google Assistant section click on **Integration Settings** and click on **_Test!_** You are done! Now, the Google assistant action has been deployed only for your Gmail account. You can fire up your Google Assistant app using the Invocation phrase you defined earlier and test it! **Voila!** Let's start now.

#### Deploying Cloud Functions to Firebase:

We will use **Firebase CLI** to deploy our cloud function. Make sure you have **node v6 installed** on your machine since cloud functions work with node v6. Now you need to **install firebase tools**.

For this you will need a node.js installation and npm.

```sh
npm install -g firebase-tools
```

Next, we will need to initialize firebase cloud functions library.If you haven't used firebase-tools on your computer, you'll need to login.

```sh
firebase login
```

Once you're logged in to firebase, run the next command.

```sh
firebase init functions
```

This command is a command-line wizard which will guide you through a process which will associate your firebase function with your Google Cloud project that gets created when you created 'Actions on Google' project in Part 1 of the deployment.

The wizard will ask:

> Select a default Firebase project for this directory: <your directory>

Make sure you select the project ID correctly using the arrow keys. The project must be same as the one the agent is deployed to. When asked what language to use, select **JavaScript** using the arrow keys.

The wizard will ask:

> File functions/package.json already exists. Overwrite?
> File functions/index.js already exists. Overwrite?
> **MAKE SURE YOU ENTER \***NO**\* FOR BOTH**

- If you select yes, the code will be overwritten with a default firebase function. If this happens, clone the repository again.

It will then ask:

> Do you want to install dependencies with npm now?
> Select **Yes** and wait for the wizard to finish.

Once the association is done, next deploy the cloud function. Execute the following command by going to the `root` directory.

```sh
cd functions && firebase deploy
```

Once deployed you will get a URL, this is your **webhook endpoint** that Dialogflow will use to make requests to. Paste the URL in the **Fullfillment** section of your Dialogflow agent. Now go ahead in **actions console** and **_test_** your application.
You can now continue with **STEP 10**.

## Contributors
 - [Rishindra Mani](https://www.linkedin.com/in/rishindramani)
 - [Rajdeep Roy Chowdhury](https://www.linkedin.com/in/razdeeproychowdhury)
 - [Harshit Agrawal](https://www.linkedin.com/in/agharshit08)
