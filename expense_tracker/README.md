# Expense Tracker (Python + Tkinter)

A beginner-friendly expense tracker app with a graphical user interface (GUI) built using Python and Tkinter. This app helps you record your spending, categorize expenses, and view monthly summaries.

---

## Features
- **Add Expenses:** Enter amount, select category, and date for each expense.
- **Categorize Spending:** Choose from preset categories (Food, Transport, Entertainment, Bills, Other).
- **Monthly Summary:** View total spending per category for any month.
- **Data Storage:** Expenses are saved in a local CSV file (`expenses.csv`).

---

## How It Works

### 1. Main App (`expense_tracker.py`)
- **Tkinter GUI:** Provides a simple window with two sections:
  - **Add Expense:** Input fields for amount, category, and date. Click "Add Expense" to save.
  - **Monthly Summary:** Enter a month (YYYY-MM) and click "Show Summary" to see totals per category.
- **Validation:** Checks for valid input (numbers, dates).
- **Feedback:** Shows success/error messages.

### 2. Helper Module (`expense_utils.py`)
- **save_expense(amount, category, date):** Adds a new expense to the CSV file.
- **monthly_summary(month):** Reads the CSV and calculates total spent per category for the given month.
- **CSV Management:** Ensures the data file exists and is properly formatted.

### 3. Data File (`expenses.csv`)
- Stores each expense as a row: `amount,category,date`
- Used for both saving and summarizing expenses.

---

## How to Run

1. **Install Python** (if not already installed):
   - Download from [python.org](https://www.python.org/downloads/)
2. **Open a terminal** in your project folder (`expense_tracker`).
3. **Run the app:**
   ```
   python expense_tracker.py
   ```
4. **Use the GUI:**
   - Add expenses and view monthly summaries.

---

## Project Structure
```
expense_tracker/
├── expense_tracker.py      # Main GUI application
├── expense_utils.py        # Helper functions for data management
├── expenses.csv            # Data file storing expenses
└── README.md               # Project documentation
```

---

## Code Walkthrough

### expense_tracker.py
- **Imports:** Tkinter for GUI, datetime for date handling, and helper functions.
- **ExpenseTracker class:**
  - Sets up the window and widgets.
  - Handles adding expenses and showing summaries.
  - Validates user input and interacts with the helper module.

### expense_utils.py
- **save_expense:** Appends a new expense to the CSV file.
- **monthly_summary:** Reads the CSV and sums expenses by category for a given month.
- **CSV Initialization:** Creates the file with headers if it doesn't exist.

---

## Customization
- **Categories:** You can add or change categories in `expense_tracker.py`.
- **Data File:** All expenses are stored in `expenses.csv`. You can open/edit this file with Excel or any text editor.

---

## Troubleshooting
- **App won’t start?** Make sure Python is installed and you’re in the correct folder.
- **Error messages?** Check that you enter valid numbers and dates (YYYY-MM-DD for expenses, YYYY-MM for summaries).
- **Data not saving?** Ensure you have write permissions in the project folder.

---

## Learning Resources
- [Python Official Docs](https://docs.python.org/3/)
- [Tkinter Tutorial](https://realpython.com/python-gui-tkinter/)
- [CSV in Python](https://docs.python.org/3/library/csv.html)

---

## License
This project is open-source and free to use for learning and personal use.

---

## Author
Created with guidance from GitHub Copilot.
