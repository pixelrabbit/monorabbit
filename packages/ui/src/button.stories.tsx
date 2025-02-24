import React from "react";
import { Button, ButtonProps } from "./button";
import { Meta, Story } from "@storybook/react";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {},
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: "Primary Button",
  intent: "primary",
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: "Secondary Button",
  intent: "secondary",
};
