#!/bin/bash

# Navigate to the scripts directory
cd /var/www/html/apps/HSFlashCards/scripts || {
    echo "Error: Failed to enter the scripts directory." >&2
    exit 1
}

# Find all .sh files and make them executable
find . -name "*.sh" -exec sudo chmod +x {} \;

echo "All scripts in the 'scripts' directory are now executable."