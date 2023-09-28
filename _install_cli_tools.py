#!/usr/bin/env python3

import os
import subprocess

"""
Copyright (c) 2023 Taylor Anne Thalacker

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
"""
"""
_install_cli_tools.py
Summary: This script automates the process of checking for the existence of specific tools and npm packages on the system. If a tool or package is not found, the script attempts to install it. The tools and packages include both existing tools (e.g., Node.js, Git, Create React App) and additional tools (e.g., ESLint, Prettier, Storybook).
Notes: The script assumes it's being run in the directory where the `package.json` file is located, or globally for global npm packages. The installation of "React Developer Tools" for browsers is not handled by this script and needs to be installed manually.
Prerequisites: Python 3.11, Homebrew (M1, macOS), Node.js and npm must be c for npm package management
Usage: Run this script by executing `python@3.11 installer_reactNodeDev.py` in the terminal.
Author: Taylor Thalacker (tathalcker@icloud.com)
Date: 2023-09-22
"""

def run_command(command):
    try:
        subprocess.run(command, shell=True, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        return True
    except subprocess.CalledProcessError:
        return False

def install_if_not_exists(command_check, command_install, name):
    print(f"👀  Checking for {name} Installation:")
    if run_command(command_check):
        print(f"  👍  {name} is already installed!")
    else:
        print(f"  🤷‍♀️  {name} not found - installing now:")
        if run_command(command_install):
            print(f"    ✅  {name} Installed successfully!")
        else:
            print(f"     ❌  Failed to install {name}")

if __name__ == "__main__":
    # NPM tools
    # sudo npm install firebase-tools firebase login
    install_if_not_exists("redux --version", "npm install -g redux-cli", "Redux CLI")
    install_if_not_exists("firebase --version", "npm install firebase-tools", "Firebase CLI")
    install_if_not_exists("npm list chai", "sudo npm install -g chai", "Chai")
    install_if_not_exists("npm list chai", "sudo npm install -g sqlite3", "SQLite3")
    install_if_not_exists("npm list mocha", "npm install -g mocha", "Mocha")
    install_if_not_exists("npm list c8", "npm install -g c8", "C8 Coverage")
    install_if_not_exists("npm list nodemon", "npm install -g nodemon", "Nodemon")
    install_if_not_exists("npm list pythagora", "npm install -g pythagora", "Pythagora")
    install_if_not_exists("prettier --version", "npm install -g prettier", "Prettier")
    install_if_not_exists("prettier --version", "npm install -g husky", "Husky")
    install_if_not_exists("npm list storybook", "npm install -g storybook", "Storybook")
    install_if_not_exists("npm list jest", "npm install -g jest", "Jest")
    install_if_not_exists("npm list swagger-ui-express", "npm install -g swagger-ui-express", "Swagger UI Express")

    install_if_not_exists("eslint -v", "npm install -g eslint", "ESLint")
    install_if_not_exists("tsc --version", "npm install -g typescript --save-dev", "TypeScript")

    # Add-On Functionalities Tools
    npm_packages = [
        ("redux react-redux @reduxjs/toolkit", "Redux Toolkit"),
        ("react-router-dom", "React Router DOM"),
        ("joi", "Joi"),
        ("--save-dev jest @testing-library/react @testing-library/jest-dom", "Jest and Testing Library"),
        ("swagger-ui-express swagger-jsdoc --save", "Swagger UI and JSDoc"),
        ("--save-dev mocha chai supertest", "Mocha, Chai, and Supertest"),
        ("--save-dev firebase-tools", "Firebase Tools"),
        ("sqlite3 mocha chai chai-http", "SQLite3, Mocha, Chai, and Chai-HTTP"),
        ("loglevel", "Loglevel"),
        ("react-ga", "React-GA"),
        ("winston express-winston", "Winston and Express-Winston"),
        ("prom-client", "Prom Client"),
        ("--save-dev standard-version", "Standard Version"),
        ("--save-dev eslint-plugin-prettier eslint-config-prettier", "ESLint Plugin and Config Prettier"),
        ("--save-dev husky", "Husky"),
        ("--save-dev prettier", "Prettier"),
        ("--save-dev c8", "C8"),
        ("--save-dev eslint", "ESLint")
    ]

    for package, name in npm_packages:
        install_if_not_exists(f"npm list {package.split()[0]}", f"npm install {package}", name)

    print(" ")
    print("Verification and installation process is complete!")
