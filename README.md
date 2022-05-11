# Introducing KanBoard 🚀✨

Your Personal Project Management Tool

![Cover](https://github.com/madzadev/kanboard/blob/main/public/cover.png)

## Installation 📄

In order to set up your own instance of KanBoard, you must first install Docker, set up Appwrite, create necessary data collections, clone the KanBoard repo, and configure environmental variables.

We will go through everything in more detail below:

1️⃣ To install [Docker](https://docker.com), check the official installation guidelines [here](https://docs.docker.com/get-docker/).

2️⃣ Next, you have to install the [Appwrite](https://appwrite.io) using the commands below, depending on the operating system you use:

- Mac / Linux or Unix compatible:

```bash
docker run -it --rm \
    --volume /var/run/docker.sock:/var/run/docker.sock \
    --volume "$(pwd)"/appwrite:/usr/src/code/appwrite:rw \
    --entrypoint="install" \
    appwrite/appwrite:latest
```

- Windows (command prompt)

```bash
docker run -it --rm ^
    --volume //var/run/docker.sock:/var/run/docker.sock ^
    --volume "%cd%"/appwrite:/usr/src/code/appwrite:rw ^
    --entrypoint="install" ^
    appwrite/appwrite:latest
```

- Windows (powershell)

```bash
docker run -it --rm ,
    --volume /var/run/docker.sock:/var/run/docker.sock ,
    --volume ${pwd}/appwrite:/usr/src/code/appwrite:rw ,
    --entrypoint="install" ,
    appwrite/appwrite:latest
```

3️⃣ Next, open Docker and run the Appwrite app. At this point, you should be able to access the Appwrite console through [localhost](http://localhost). Create an account, log in and create a new project.

![Project](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/25tfvxw0dowvkfeen2xg.png)

4️⃣ To init your SDK and interact with Appwrite services, you need to add a Web platform to your project. To do that choose the project you created and click the 'Add Platform' button.

5️⃣ Create four database collections: Posts, Columns, Boards, and Activities.

![Colections](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ctwjhu525coft3pvtai6.png)

Now set the attributes and indexes for each collection as below:

🔻 **Posts attributes and indexes**

![Posts attr](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/z3dhg30kix9olgayho3a.png)

![Posts index](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/owu3u7fmfr9m2be4s9pl.png)

🔻 **Columns attributes and indexes**

![Col atr](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/87zuih5khbbm25eg29bp.png)

![Col index](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/nvyp8pz14x2a2ejn2jl2.png)

🔻 **Boards attributes**

![Boards attr](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/2ystfd16c3cu59ctps80.png)

🔻 **Activities attributes**

![Act attr](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/dktepm3p800qlb3s1i83.png)

6️⃣ Go into the settings for each collection and set the permission to `role:member` for both read and write access.

![Permissions](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/6r3x5jluamup8merje4f.png)

7️⃣ Navigate to the Users panel and add a new user you will use to log in to your app and access KanBoard.

8️⃣ Clone the repo to your machine by running `git clone https://github.com/madzadev/kanboard.git` then change the working directory into it by `cd kanboard` and install the project packages by `npm install`.

9️⃣ Clone the env files with the command `cp .env.example .env.local`. In the newly created `.env.local` file fill out the keys from your Appwrite console. The first two are available in the Settings of the KanBan project. The other four can be found in the Settings of each Collection.

1️⃣0️⃣ Run the command `npm run dev` to start the app.
