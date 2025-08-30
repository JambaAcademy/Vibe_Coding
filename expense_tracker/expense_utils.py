import csv
import os
from collections import defaultdict

DATA_FILE = "expenses.csv"

# Ensure the CSV file exists
if not os.path.exists(DATA_FILE):
    with open(DATA_FILE, 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(["amount", "category", "date"])


def save_expense(amount, category, date):
    with open(DATA_FILE, 'a', newline='') as f:
        writer = csv.writer(f)
        writer.writerow([amount, category, date])


def monthly_summary(month):
    summary = defaultdict(float)
    with open(DATA_FILE, 'r', newline='') as f:
        reader = csv.DictReader(f)
        for row in reader:
            if row['date'].startswith(month):
                summary[row['category']] += float(row['amount'])
    return dict(summary)
