import csv
import re
import sys

EMAIL_REGEX = re.compile(r"^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$")

def validate_email(email):
    return EMAIL_REGEX.match(email) is not None

def read_csv(file_path):
    users = []
    try:
        with open(file_path, newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                users.append(row)
    except FileNotFoundError:
        print(f"Error: File '{file_path}' not found.")
        sys.exit(1)
    except Exception as e:
        print(f"Error reading file: {e}")
        sys.exit(1)
    return users

def report_emails(users):
    valid = []
    invalid = []
    # Find the email column name (case-insensitive)
    email_col = None
    if users:
        for key in users[0].keys():
            if key.lower() in ['email', 'email address', 'e-mail', 'e-mail address']:
                email_col = key
                break
    if not email_col:
        print("Error: No email column found in CSV.")
        return
    for user in users:
        email = user.get(email_col, '').strip()
        if validate_email(email):
            valid.append(email)
        else:
            invalid.append(email)
    print("Valid Emails:")
    for email in valid:
        print(f"  {email}")
    print("\nInvalid Emails:")
    for email in invalid:
        print(f"  {email}")

def main():
    if len(sys.argv) < 2:
        print("Usage: python csv_email_validator.py <csv_file_path>")
        sys.exit(1)
    file_path = sys.argv[1]
    users = read_csv(file_path)
    report_emails(users)

if __name__ == "__main__":
    main()
