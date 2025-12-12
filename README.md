Use Flask and Jinja2 to create a site most similar to SharePoint. [Template](https://github.com/jlabclouds/Flask/tree/master)
 - Instruct users to setup Microsoft account, org email, GCP email integration with AAD (Entra), then add to tenant. Best way to setup this process for automation when a new hire is added to the org?
 - Also in tenant, how to setup deployment so that users are grouped by region?
 - Link OCI, Azure, GCP, AWS and any others to Landing page for a unified setup process to show similarities and differences between platforms while taking advantage of free trial periods

Upgraded the wiki to be more scalable and easier to manage. Here's a summary of the changes:

Markdown Support: Articles are now written in Markdown (.md) for easier editing. I've included a library that renders the Markdown as HTML in the browser.
Dynamic Article Loading: The list of articles is now managed by a file called articles.json. The website reads this file to build the navigation dynamically.
Automatic Article Indexing: I've created a script called update-articles.js that automatically scans your docs folder and updates the articles.json file for you.
New Workflow for Adding Articles:

Add a new .md file to the docs directory (e.g., docs/my-new-article.md).
Open your terminal, navigate to the project folder, and run the following command:
node update-articles.js
That's it! The script will automatically add your new article to the navigation.
Prerequisite: You'll need to have Node.js installed on your system to run the update-articles.js script.

The wiki is now much more robust and ready to handle a large number of articles.
