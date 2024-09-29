import subprocess
import sys

# Function to run a script and check for errors
def run_script(command):
    result = subprocess.run(command, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"Error occurred while running {' '.join(command)}:")
        print(result.stderr)  # Print the error message
        sys.exit(result.returncode)
    else:
        print(f"Output from {' '.join(command)}:")
        print(result.stdout)  # Print the standard output

try:
    # Run the first file
    run_script([sys.executable, 'model_trainning_and_saving.py'])

    # Run the second file using Streamlit
    run_script(['streamlit', 'run', 'app.py'])

except KeyboardInterrupt:
    print("\nExecution stopped by user.")
    sys.exit(0)
