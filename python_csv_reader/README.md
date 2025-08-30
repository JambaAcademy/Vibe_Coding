# Python CSV Email Validator

This project provides a Python script to read a CSV file containing user data with email addresses, validate each email using regular expressions, and output a report showing valid and invalid emails. It includes error handling for file operations and is designed to be easy to use and extend.

## Features
- Reads user data from a CSV file
- Detects the email column automatically (supports common headers like `Email`, `Email Address`, etc.)
- Validates email addresses using regex
- Outputs a report listing valid and invalid emails
- Handles file errors gracefully

## Requirements
- Python 3.x

## Usage
1. Place your CSV file in the project directory. The CSV should have a header row, with the email addresses under a column named `Email`, `Email Address`, or similar.
2. Run the script from the command line:
   ```
   python csv_email_validator.py <csv_file_path>
   ```
   Replace `<csv_file_path>` with the path to your CSV file (e.g., `samplefile.csv`).

## Example CSV File
```
Email Address
rajesh.k@example.com
priya.s@example.com
anil.m@example.com
neha.v@example.com
suresh.rexample.com
ananya.g@example
mohit.k@.com
```

## How It Works
- The script uses Python's built-in `csv` module to read the CSV file.
- It automatically detects the column containing email addresses by checking for common header names (case-insensitive).
- Each email is validated using a regular expression that matches standard email formats.
- The script prints two lists: one for valid emails and one for invalid emails.
- If the file is missing or cannot be read, the script prints an error message and exits.

## Error Handling
- If the CSV file does not exist, an error message is shown.
- If the CSV file does not contain a recognizable email column, an error message is shown.
- Other file reading errors are caught and reported.

## Customization
- You can modify the regular expression in the script to change the email validation rules.
- You can add more recognized email column names in the script if needed.

## License
This project is open source and free to use for any purpose.
