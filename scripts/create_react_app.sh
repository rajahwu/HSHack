#!/bin/bash

# Color codes
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Get directory name from argument, default to "app" if not provided
project_dir=${1:-app}

# Script execution function
execute_script() {
     local script_name=$1

    # Construct the full path to the script
    local script_path="scripts/$script_name"

    if ! [ -x "$script_path" ]; then
        echo -e "${RED}Error: Script '$script_name' not found or not executable.${NC}" >&2
        exit 1
    fi

    echo -e "${YELLOW}Executing script: $script_name${NC}"
    ./"$script_path" "$project_dir"  # Pass project_dir as an argument

    if [ $? -ne 0 ]; then
        echo -e "${RED}Error: Script '$script_name' failed.${NC}" >&2
        exit 1
    fi
}

# Execute scripts in order
execute_script "make_app_directories.sh"
execute_script "write_webpack_config.sh"
execute_script "write_babelrc.sh"
execute_script "install_dependencies.sh" "$project_dir"

echo -e "${GREEN}All scripts executed successfully!${NC}"