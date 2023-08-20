[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/DhYPBlwE)
# DO IT NOW

DO IT NOW  is a webapp in which users can list every task they have to do during their day. A user can make an account, log in and edit their personal informations. They also can add tasks to their to-do-list, edit it and mark it as completed.

## Table of content
- [DO IT NOW](#do-it-now)
  - [Table of content](#table-of-content)
  - [Installation](#installation)
    - [Requirements](#requirements)
      - [Step 1: Install Docker](#step-1-install-docker)
      - [Step 2: Verify Installation](#step-2-verify-installation)
    - [Configuration](#configuration)
      - [.env file](#env-file)
      - [Docker](#docker)
  - [Contributing](#contributing)
  - [License](#license)


## Installation

### Requirements
To run this project locally, you'll need to have Docker installed on your machine. Docker allows you to package and distribute applications along with their dependencies, ensuring consistent and reliable deployments.

If you haven't installed Docker yet, follow these steps to get started:

#### Step 1: Install Docker

1. **Windows**: Download the Docker Desktop installer from the official [Docker website](https://www.docker.com/products/docker-desktop) and follow the installation instructions.

2. **macOS**: Download the Docker Desktop for Mac installer from the official [Docker website](https://www.docker.com/products/docker-desktop) and follow the installation instructions.

3. **Linux**: Docker provides installation instructions for various Linux distributions. Visit the [Docker installation guide](https://docs.docker.com/engine/install/) for Linux to find instructions specific to your distribution.

#### Step 2: Verify Installation

After installing Docker, you can verify that it's working correctly by opening a terminal or command prompt and running the following command:

```sh
docker --version
docker-compose --version
```

### Configuration

#### .env file

Create a new .env file in the root directory of your project. This file will store sensitive information like database credentials.

Copy this in the .env file you have just created.

* `MYSQL_USERNAME ="username"`
* `MYSQL_ROOT_PASSWORD="password"`
* `MYSQL_DATABASE="database name"`

Replace username, your password, and your database name with your actual database details.

#### Docker

Run the following command to build and start the Docker containers defined in the docker-compose.yml file:

```bash
docker-compose up --build
```


## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)

