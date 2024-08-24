#!/bin/bash

# Get project name from user input, default to "app" if not provided
read -r -p "Enter project name (default: app): " project_name
project_name=${project_name:-app}

# Create project directory, handle potential 'cd' failure
mkdir "$project_name" && cd "$project_name" || {
    echo "Error: Failed to create or enter directory '$project_name'" >&2
    exit 1
}

# Create basic file structure
mkdir public src
touch readme.md .gitignore
touch public/index.html
mkdir public/assets src/components src/context src/models src/router src/services src/utils
touch src/index.js src/App.js

# Create subdirectories and files within components
mkdir src/components/auth src/components/layouts src/components/root
touch src/components/auth/Login.js src/components/auth/Register.js src/components/auth/SignOut.js
touch src/components/layouts/Footer.jsx src/components/layouts/Header.jsx src/components/layouts/Main.jsx src/components/layouts/SideBar.jsx
touch src/components/root/Home.jsx src/components/root/Profile.jsx src/components/root/Settings.jsx

# Create files in other directories
touch src/context/AuthContext.js
mkdir src/models/User
touch src/models/User/index.js
mkdir src/router/actions src/router/loaders
mkdir src/router/actions/auth src/router/loaders/dashboard
touch src/router/actions/auth/login.js src/router/actions/auth/register.js src/router/actions/auth/signout.js
touch src/router/loaders/dashboard/index.js
mkdir src/services/firebase
touch src/services/firebase/firebase.config.js src/services/firebase/index.js

tree -a

echo "Project template created successfully!"