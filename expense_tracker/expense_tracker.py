import tkinter as tk
from tkinter import ttk, messagebox
from datetime import datetime
import expense_utils

class ExpenseTracker:
    def __init__(self, root):
        self.root = root
        self.root.title("Expense Tracker")
        self.categories = ["Food", "Transport", "Entertainment", "Bills", "Other"]
        self.setup_ui()

    def setup_ui(self):
        # Expense Entry Frame
        entry_frame = ttk.LabelFrame(self.root, text="Add Expense")
        entry_frame.pack(fill="x", padx=10, pady=5)

        ttk.Label(entry_frame, text="Amount:").grid(row=0, column=0, padx=5, pady=5)
        self.amount_var = tk.StringVar()
        ttk.Entry(entry_frame, textvariable=self.amount_var).grid(row=0, column=1, padx=5, pady=5)

        ttk.Label(entry_frame, text="Category:").grid(row=0, column=2, padx=5, pady=5)
        self.category_var = tk.StringVar(value=self.categories[0])
        ttk.Combobox(entry_frame, textvariable=self.category_var, values=self.categories, state="readonly").grid(row=0, column=3, padx=5, pady=5)

        ttk.Label(entry_frame, text="Date (YYYY-MM-DD):").grid(row=0, column=4, padx=5, pady=5)
        self.date_var = tk.StringVar(value=datetime.today().strftime('%Y-%m-%d'))
        ttk.Entry(entry_frame, textvariable=self.date_var).grid(row=0, column=5, padx=5, pady=5)

        ttk.Button(entry_frame, text="Add Expense", command=self.add_expense).grid(row=0, column=6, padx=5, pady=5)

        # Summary Frame
        summary_frame = ttk.LabelFrame(self.root, text="Monthly Summary")
        summary_frame.pack(fill="both", expand=True, padx=10, pady=5)

        ttk.Label(summary_frame, text="Month (YYYY-MM):").grid(row=0, column=0, padx=5, pady=5)
        self.month_var = tk.StringVar(value=datetime.today().strftime('%Y-%m'))
        ttk.Entry(summary_frame, textvariable=self.month_var).grid(row=0, column=1, padx=5, pady=5)
        ttk.Button(summary_frame, text="Show Summary", command=self.show_summary).grid(row=0, column=2, padx=5, pady=5)

        self.summary_tree = ttk.Treeview(summary_frame, columns=("Category", "Total"), show="headings")
        self.summary_tree.heading("Category", text="Category")
        self.summary_tree.heading("Total", text="Total Spent")
        self.summary_tree.grid(row=1, column=0, columnspan=3, sticky="nsew", padx=5, pady=5)
        summary_frame.rowconfigure(1, weight=1)
        summary_frame.columnconfigure(2, weight=1)

    def add_expense(self):
        try:
            amount = float(self.amount_var.get())
            category = self.category_var.get()
            date_str = self.date_var.get()
            datetime.strptime(date_str, '%Y-%m-%d')  # Validate date
            expense_utils.save_expense(amount, category, date_str)
            messagebox.showinfo("Success", "Expense added!")
            self.amount_var.set("")
        except ValueError:
            messagebox.showerror("Error", "Please enter valid data.")

    def show_summary(self):
        month = self.month_var.get()
        try:
            datetime.strptime(month, '%Y-%m')  # Validate month
            summary = expense_utils.monthly_summary(month)
            for i in self.summary_tree.get_children():
                self.summary_tree.delete(i)
            for cat, total in summary.items():
                self.summary_tree.insert('', 'end', values=(cat, f"${total:.2f}"))
        except ValueError:
            messagebox.showerror("Error", "Please enter month as YYYY-MM.")

if __name__ == "__main__":
    root = tk.Tk()
    app = ExpenseTracker(root)
    root.mainloop()
