import React from "react";
import { FinancialCard, FinancialCardProps } from "./FinancialCard";
import { FaDollarSign } from "react-icons/fa";

export default {
  title: "Components/FinancialCard",
  component: FinancialCard,
  argTypes: {
    darkMode: { control: "boolean" },
  },
};

const Template = (args: FinancialCardProps) => <FinancialCard {...args} />;

export const Light = Template.bind({});
Light.args = {
  title: "Account Balance",
  value: "$12,345.67",
  icon: <FaDollarSign />,
  subtitle: "Main Checking Account",
  status: "Updated 2 min ago",
  darkMode: false,
};

export const Dark = Template.bind({});
Dark.args = {
  ...Light.args,
  darkMode: true,
};

export const HoverDemo = Template.bind({});
HoverDemo.args = {
  ...Light.args,
};
